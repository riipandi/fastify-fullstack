import "dotenv/config";
import { Kysely } from "kysely";
import { PostgresJSDialect } from "kysely-postgres-js";
import postgres from "postgres";

import { env } from "../env";
import { UserTable } from "./schemas/users.schema";

/**
 * For Kysely's type-safety and autocompletion to work, it needs to know
 * your database structure. This requires a TypeScript Database interface,
 * that contains table names as keys and table schema interfaces as values.
 */
export interface Database {
  users: UserTable;
}

// You'd create one of these when you start your app.
export const db = new Kysely<Database>({
  dialect: new PostgresJSDialect({
    postgres: postgres(env.DATABASE_URL, {
      max: 1,
    }),
  }),
});
