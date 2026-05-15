import { Injectable, ForbiddenException, Inject } from '@nestjs/common';
import { Pool } from 'pg';
import { PG_POOL } from '../database/database.module';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @Inject(PG_POOL) private pool: Pool,
    private config: ConfigService,
  ) {}

  async canAccess(role: string, section: string, action: 'read' | 'write' | 'delete'): Promise<boolean> {
    const schema = this.config.get('database.schemas.portal');
    const col = action === 'read' ? 'can_read' : action === 'write' ? 'can_write' : 'can_delete';
    const result = await this.pool.query(
      `SELECT ${col} FROM ${schema}.section_access WHERE role = $1 AND section = $2`,
      [role, section]
    );
    if (!result.rows.length) return false;
    return result.rows[0][col] === true;
  }

  async upsertUser(keycloakId: string, email: string, nom: string, prenom: string, role: string) {
    const schema = this.config.get('database.schemas.portal');
    await this.pool.query(
      `INSERT INTO ${schema}.users (keycloak_id, email, nom, prenom, role, last_login)
       VALUES ($1, $2, $3, $4, $5, NOW())
       ON CONFLICT (keycloak_id) DO UPDATE
       SET email = $2, nom = $3, prenom = $4, role = $5, last_login = NOW(), updated_at = NOW()`,
      [keycloakId, email, nom, prenom, role]
    );
  }
}
