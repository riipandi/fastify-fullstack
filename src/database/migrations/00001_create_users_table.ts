import { Kysely, sql } from "kysely";
import { Database } from "../client";

export const tableName = "users";

export async function up(db: Kysely<Database>): Promise<void> {
  await db.schema
    .createTable(tableName)
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("email", "varchar", (col) => col.notNull().unique())
    .addColumn("first_name", "varchar", (col) => col.notNull())
    .addColumn("last_name", "varchar", (col) => col.notNull())
    .addColumn("gender", "varchar", (col) => col.notNull())
    .addColumn("created_at", "timestamp", (col) => col.defaultTo(sql`now()`).notNull())
    .addColumn("updated_at", "timestamp", (col) => col.defaultTo(sql`now()`).notNull())
    .execute();

  await db.schema.createIndex("users_email_index").on(tableName).column("email").execute();
}

export async function down(db: Kysely<Database>): Promise<void> {
  await db.schema.dropTable(tableName).execute();
}
