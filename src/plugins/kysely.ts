import { Database, db } from "@/database/client";
import { env } from "@/env";
import { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";
import { Kysely } from "kysely";

declare module "fastify" {
  interface FastifyInstance {
    db: Kysely<Database>;
  }
}

export type KyselyPluginOptions = {};

const kyselyPlugin: FastifyPluginAsync<KyselyPluginOptions> = fp(async (fastify) => {
  // Make Kysely available through the fastify server instance: server.db
  fastify.decorate("db", db);
  fastify.addHook("onClose", async (_server) => {
    console.info(`Disconnected from database: ${env.DATABASE_URL}`);
    db.destroy();
  });
});

export default kyselyPlugin;
