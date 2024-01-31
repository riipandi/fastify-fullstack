import path, { join } from "node:path";
import { promises as fs } from "fs-extra";
import { FileMigrationProvider, Migrator } from "kysely";
import { db } from "./client";

const migrator = new Migrator({
  db,
  provider: new FileMigrationProvider({ fs, path, migrationFolder: join(__dirname, "migrations") }),
  migrationTableName: "_migration",
  migrationLockTableName: "_migration_lock",
  allowUnorderedMigrations: false,
});

async function runMigration(action?: "rollback") {
  const { error, results } =
    action === "rollback" ? await migrator.migrateDown() : await migrator.migrateToLatest();

  // biome-ignore lint/complexity/noForEach: <explanation>
  results?.forEach((it) => {
    if (it.status === "Success") {
      console.log(`migration "${it.migrationName}" was executed successfully`);
    } else if (it.status === "Error") {
      console.error(`failed to execute migration "${it.migrationName}"`);
    }
  });

  if (error) {
    console.error("failed to migrate");
    console.error(error);
    process.exit(1);
  }

  await db.destroy();
}

switch (process.argv[2]) {
  case "rollback":
    console.info("Rolling back migration...");
    runMigration("rollback");
    break;
  case "seed":
    console.info("Not yet implemented...");
    break;
  default:
    console.info("Running database migration...");
    runMigration();
    break;
}
