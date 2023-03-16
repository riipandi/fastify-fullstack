import type { NodePgDatabase } from 'drizzle-orm/node-postgres'
import { drizzle } from 'drizzle-orm/node-postgres'
export { sql } from 'drizzle-orm/sql';
import { Pool } from 'pg'

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
})

export const db: NodePgDatabase = drizzle(pool, {
  logger: process.env.NODE_ENV !== 'production',
})
