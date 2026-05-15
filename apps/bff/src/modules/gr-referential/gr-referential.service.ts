import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Pool } from 'pg';
import { PG_POOL } from '../../database/database.module';
import { ConfigService } from '@nestjs/config';
import { GrReferential } from './gr-referential.entity';

@Injectable()
export class GrReferentialService {
  private readonly schema: string;

  constructor(
    @Inject(PG_POOL) private pool: Pool,
    private config: ConfigService,
  ) {
    this.schema = this.config.get<string>('database.schemas.execute', 'hub_execute');
  }

  async findAll(): Promise<GrReferential[]> {
    const result = await this.pool.query(
      `SELECT * FROM ${this.schema}.gr_referential ORDER BY object_type`
    );
    return result.rows;
  }

  async findOne(objectType: string): Promise<GrReferential> {
    const result = await this.pool.query(
      `SELECT * FROM ${this.schema}.gr_referential WHERE object_type = $1`,
      [objectType]
    );
    if (!result.rows.length) throw new NotFoundException(`GR Referential ${objectType} non trouvé`);
    return result.rows[0];
  }

  async update(objectType: string, dto: Partial<GrReferential>): Promise<GrReferential> {
    const fields = Object.keys(dto)
      .filter(k => k !== 'object_type' && k !== 'updated_at')
      .map((k, i) => `${k} = $${i + 2}`)
      .join(', ');
    const values = Object.keys(dto)
      .filter(k => k !== 'object_type' && k !== 'updated_at')
      .map(k => (dto as any)[k]);

    if (!fields.length) return this.findOne(objectType);

    const result = await this.pool.query(
      `UPDATE ${this.schema}.gr_referential
       SET ${fields}, updated_at = NOW()
       WHERE object_type = $1
       RETURNING *`,
      [objectType, ...values]
    );
    if (!result.rows.length) throw new NotFoundException(`GR Referential ${objectType} non trouvé`);
    return result.rows[0];
  }

  async toggleActive(objectType: string, isActive: boolean): Promise<GrReferential> {
    const result = await this.pool.query(
      `UPDATE ${this.schema}.gr_referential
       SET is_active = $2, updated_at = NOW()
       WHERE object_type = $1
       RETURNING *`,
      [objectType, isActive]
    );
    if (!result.rows.length) throw new NotFoundException(`GR Referential ${objectType} non trouvé`);
    return result.rows[0];
  }
}
