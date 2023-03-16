import fp from "fastify-plugin";
import { FastifyPluginAsync } from 'fastify'
import { NodePgDatabase } from 'drizzle-orm/node-postgres'
import { db, pool } from "../database";

// Use TypeScript module augmentation to declare the
// type of server.db to be Drizzle
declare module 'fastify' {
  interface FastifyInstance {
    db: NodePgDatabase
  }
}

export interface DrizzlePluginOptions {
  // Specify plugin options here
}

const drizzlePlugin: FastifyPluginAsync<DrizzlePluginOptions> = fp(async (fastify) => {
  // Make Drizzle available through the fastify server instance: server.db
  fastify.decorate('db', db)
  fastify.addHook('onClose', async (server) => {
    console.info(`Disconnected from database: ${process.env.DATABASE_URL!}`)
    pool.end()
  })
})

export default drizzlePlugin
