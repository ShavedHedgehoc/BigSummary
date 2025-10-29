import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/db/schema.ts',
  out: './src/db',

  dbCredentials: {
    host: '192.168.251.173',
    port: 5432,
    user: 'admin',
    password: 'password',
    database: 'tubesdb',
    ssl: false,
  },
});
