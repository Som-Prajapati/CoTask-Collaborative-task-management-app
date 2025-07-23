import { defineConfig } from 'drizzle-kit';

export default defineConfig({
	dialect: 'sqlite',
	schema: './src/database/schema.ts',
	out: './src/database/drizzle',
	dbCredentials: {
    url: ".wrangler/state/v3/d1/miniflare-D1DatabaseObject/81a6904cff9e10786c7dfa037418a3b41c07b88d1fe281da693dfa3409b6f0e4.sqlite",
  }
});