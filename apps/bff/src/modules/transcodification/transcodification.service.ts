import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Pool } from 'pg';
import { PG_POOL } from '../../database/database.module';
import { ConfigService } from '@nestjs/config';
import { Transcodification, TranscoResult } from './transcodification.entity';

@Injectable()
export class TranscodificationService {
  private readonly schema: string;

  constructor(
    @Inject(PG_POOL) private pool: Pool,
    private config: ConfigService,
  ) {
    this.schema = this.config.get<string>('database.schemas.execute', 'hub_execute');
  }

  async findAll(valuetype?: string, appcode?: string): Promise<Transcodification[]> {
    let query = `SELECT * FROM ${this.schema}.transcodification WHERE 1=1`;
    const params: string[] = [];
    if (valuetype) { params.push(valuetype); query += ` AND valuetype = $${params.length}`; }
    if (appcode)   { params.push(appcode);   query += ` AND appcode = $${params.length}`; }
    query += ' ORDER BY valuetype, identifier, appcode';
    const result = await this.pool.query(query, params);
    return result.rows;
  }

  async findOne(identifier: string, valuetype: string, appcode: string, value: string): Promise<Transcodification> {
    const result = await this.pool.query(
      `SELECT * FROM ${this.schema}.transcodification
       WHERE identifier = $1 AND valuetype = $2 AND appcode = $3 AND value = $4`,
      [identifier, valuetype, appcode, value]
    );
    if (!result.rows.length) throw new NotFoundException('Transcodification non trouvée');
    return result.rows[0];
  }

  async create(dto: Transcodification): Promise<Transcodification> {
    const result = await this.pool.query(
      `INSERT INTO ${this.schema}.transcodification (identifier, valuetype, appcode, value, label, enabled)
       VALUES ($1, $2, $3, $4, $5, $6)
       ON CONFLICT (identifier, valuetype, appcode, value) DO UPDATE
       SET label = $5, enabled = $6
       RETURNING *`,
      [dto.identifier, dto.valuetype, dto.appcode, dto.value, dto.label ?? null, dto.enabled ?? true]
    );
    return result.rows[0];
  }

  async toggleEnabled(identifier: string, valuetype: string, appcode: string, value: string, enabled: boolean): Promise<Transcodification> {
    const result = await this.pool.query(
      `UPDATE ${this.schema}.transcodification
       SET enabled = $5
       WHERE identifier = $1 AND valuetype = $2 AND appcode = $3 AND value = $4
       RETURNING *`,
      [identifier, valuetype, appcode, value, enabled]
    );
    if (!result.rows.length) throw new NotFoundException('Transcodification non trouvée');
    return result.rows[0];
  }

  async getTransco(valuetype: string, fromApp: string, fromValue: string, toApp: string): Promise<TranscoResult> {
    const result = await this.pool.query(
      `SELECT ${this.schema}.get_transco($1, $2, $3, $4) AS value`,
      [valuetype, fromApp, fromValue, toApp]
    );
    return { value: result.rows[0]?.value ?? null };
  }

  async getValueTypes(): Promise<string[]> {
    const result = await this.pool.query(
      `SELECT DISTINCT valuetype FROM ${this.schema}.transcodification ORDER BY valuetype`
    );
    return result.rows.map(r => r.valuetype);
  }

  async getAppCodes(): Promise<string[]> {
    const result = await this.pool.query(
      `SELECT DISTINCT appcode FROM ${this.schema}.transcodification ORDER BY appcode`
    );
    return result.rows.map(r => r.appcode);
  }
}
