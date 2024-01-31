import { db, pgClient } from "@/database";
import { env } from "@/env";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";

// Use TypeScript module augmentation to declare the
// type of server.db to be Drizzle
declare module "fastify" {
  interface FastifyInstance {
    db: PostgresJsDatabase;
  }
}

// biome-ignore lint/complexity/noBannedTypes: <explanation>
export type DrizzlePluginOptions = {};

const drizzlePlugin: FastifyPluginAsync<DrizzlePluginOptions> = fp(async (fastify) => {
  // Make Drizzle available through the fastify server instance: server.db
  fastify.decorate("db", db);
  fastify.addHook("onClose", async (_server) => {
    console.info(`Disconnected from database: ${env.DATABASE_URL}`);
    pgClient.end();
  });
});

export default drizzlePlugin;
