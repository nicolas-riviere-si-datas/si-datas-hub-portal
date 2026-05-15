export interface GrReferential {
  object_type: string;
  target_table: string;
  identifier_path: string;
  schema_name: string;
  current_schema_version: string;
  kafka_topic_raw: string | null;
  kafka_topic_golden: string | null;
  retention_days: number;
  is_active: boolean;
  updated_at: Date;
}
