export interface Transcodification {
  identifier: string;
  valuetype: string;
  appcode: string;
  value: string;
  label: string | null;
  enabled: boolean;
}

export interface TranscoKey {
  identifier: string;
  valuetype: string;
  appcode: string;
  value: string;
}

export interface TranscoResult {
  value: string | null;
}
