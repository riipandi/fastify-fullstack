import path from "node:path";
import fastifyStatic, { FastifyStaticOptions } from "@fastify/static";
import fp from "fastify-plugin";

export default fp<FastifyStaticOptions>(async (fastify) => {
  fastify.register(fastifyStatic, {
    root: path.join(__dirname, "../public"),
    prefix: "/",
  });
});
