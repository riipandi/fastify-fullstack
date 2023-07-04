import { type PostgresJsDatabase, drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { env } from '@/env'

export const pgClient = postgres(env.DATABASE_URL)

export const db: PostgresJsDatabase = drizzle(pgClient, {
  logger: env.NODE_ENV !== 'production',
})
