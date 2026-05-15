export default () => ({
  port: parseInt(process.env.PORT ?? '3002', 10),
  nodeEnv: process.env.NODE_ENV ?? 'development',
  clientId: process.env.CLIENT_ID ?? 'client-a',

  keycloak: {
    url: process.env.KEYCLOAK_URL ?? 'http://localhost:8080',
    realm: process.env.KEYCLOAK_REALM ?? 'client-a',
    clientId: process.env.KEYCLOAK_CLIENT_ID ?? 'wilow-portal',
    clientSecret: process.env.KEYCLOAK_CLIENT_SECRET ?? '',
  },

  database: {
    host: process.env.DB_HOST ?? 'localhost',
    port: parseInt(process.env.DB_PORT ?? '30543', 10),
    name: process.env.DB_NAME ?? 'hubdb_client_a',
    user: process.env.DB_USER ?? 'hub_app',
    password: process.env.DB_PASSWORD ?? 'HubApp2026!',
    schemas: {
      portal: process.env.DB_SCHEMA_PORTAL ?? 'hub_portal',
      core: process.env.DB_SCHEMA_CORE ?? 'hub_core',
      execute: process.env.DB_SCHEMA_EXECUTE ?? 'hub_execute',
      monitor: process.env.DB_SCHEMA_MONITOR ?? 'hub_monitor',
    },
  },

  cors: {
    origins: (process.env.CORS_ORIGINS ?? 'http://localhost:3001').split(','),
  },
});
