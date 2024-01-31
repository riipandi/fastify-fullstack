import { resolve } from "node:path";
import fastifyStatic, { FastifyStaticOptions } from "@fastify/static";
import fp from "fastify-plugin";

export default fp<FastifyStaticOptions>(async (fastify) => {
  fastify.register(fastifyStatic, {
    root: resolve("public"),
    prefix: "/",
  });
});
