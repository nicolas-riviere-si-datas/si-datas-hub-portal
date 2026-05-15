import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Pool } from 'pg';
import { PG_POOL } from '../../database/database.module';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  private readonly schema: string;

  constructor(
    @Inject(PG_POOL) private pool: Pool,
    private config: ConfigService,
  ) {
    this.schema = this.config.get<string>('database.schemas.portal', 'hub_portal');
  }

  async findAll() {
    const result = await this.pool.query(
      `SELECT id, keycloak_id, email, nom, prenom, role, locale, theme,
              is_active, last_login, created_at, updated_at
       FROM ${this.schema}.users ORDER BY nom, prenom`
    );
    return result.rows;
  }

  async findOne(id: string) {
    const result = await this.pool.query(
      `SELECT * FROM ${this.schema}.users WHERE id = $1`, [id]
    );
    if (!result.rows.length) throw new NotFoundException(`Utilisateur ${id} non trouvé`);
    return result.rows[0];
  }

  async findByKeycloakId(keycloakId: string) {
    const result = await this.pool.query(
      `SELECT * FROM ${this.schema}.users WHERE keycloak_id = $1`, [keycloakId]
    );
    return result.rows[0] ?? null;
  }

  async update(id: string, dto: Record<string, any>) {
    const allowed = ['nom', 'prenom', 'avatar_url', 'locale', 'theme', 'preferences', 'notifications'];
    const fields = Object.keys(dto).filter(k => allowed.includes(k));
    if (!fields.length) return this.findOne(id);
    const sets = fields.map((k, i) => `${k} = $${i + 2}`).join(', ');
    const values = fields.map(k => dto[k]);
    const result = await this.pool.query(
      `UPDATE ${this.schema}.users SET ${sets}, updated_at = NOW() WHERE id = $1 RETURNING *`,
      [id, ...values]
    );
    if (!result.rows.length) throw new NotFoundException(`Utilisateur ${id} non trouvé`);
    return result.rows[0];
  }

  async updateRole(id: string, role: string) {
    const result = await this.pool.query(
      `UPDATE ${this.schema}.users SET role = $2, updated_at = NOW() WHERE id = $1 RETURNING *`,
      [id, role]
    );
    if (!result.rows.length) throw new NotFoundException(`Utilisateur ${id} non trouvé`);
    return result.rows[0];
  }

  async toggleActive(id: string, isActive: boolean) {
    const result = await this.pool.query(
      `UPDATE ${this.schema}.users SET is_active = $2, updated_at = NOW() WHERE id = $1 RETURNING *`,
      [id, isActive]
    );
    if (!result.rows.length) throw new NotFoundException(`Utilisateur ${id} non trouvé`);
    return result.rows[0];
  }

  async getSectionAccess(role: string) {
    const result = await this.pool.query(
      `SELECT * FROM ${this.schema}.section_access WHERE role = $1 ORDER BY section`,
      [role]
    );
    return result.rows;
  }
}
