import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Pool } from 'pg';
import { PG_POOL } from '../../database/database.module';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TenantService {
  private readonly schema: string;
  private readonly clientId: string;

  constructor(
    @Inject(PG_POOL) private pool: Pool,
    private config: ConfigService,
  ) {
    this.schema = this.config.get<string>('database.schemas.portal', 'hub_portal');
    this.clientId = this.config.get<string>('clientId', 'client-a');
  }

  async getConfig() {
    const result = await this.pool.query(
      `SELECT * FROM ${this.schema}.tenant_config WHERE tenant_code = $1`,
      [this.clientId]
    );
    if (!result.rows.length) throw new NotFoundException(`Config tenant ${this.clientId} non trouvée`);
    return result.rows[0];
  }

  async updateConfig(dto: Record<string, any>) {
    const allowed = ['tenant_name','logo_url','favicon_url','primary_color','secondary_color',
                     'accent_color','background_color','font_family','custom_css',
                     'support_email','support_url','welcome_message','features_enabled'];
    const fields = Object.keys(dto).filter(k => allowed.includes(k));
    if (!fields.length) return this.getConfig();
    const sets = fields.map((k, i) => `${k} = $${i + 2}`).join(', ');
    const values = fields.map(k => dto[k]);
    const result = await this.pool.query(
      `UPDATE ${this.schema}.tenant_config
       SET ${sets}, updated_at = NOW()
       WHERE tenant_code = $1 RETURNING *`,
      [this.clientId, ...values]
    );
    return result.rows[0];
  }
}
