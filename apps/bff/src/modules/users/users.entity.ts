export interface User {
  id: string;
  keycloak_id: string;
  email: string;
  nom: string | null;
  prenom: string | null;
  avatar_url: string | null;
  role: 'hub-admin' | 'hub-integrator' | 'hub-viewer' | 'hub-metier';
  locale: string;
  theme: 'light' | 'dark' | 'system';
  preferences: Record<string, any>;
  notifications: Record<string, any>;
  is_active: boolean;
  last_login: Date | null;
  created_at: Date;
  updated_at: Date;
}
