import { resolve } from "node:path";
import fastifyView, { FastifyViewOptions } from "@fastify/view";
import fp from "fastify-plugin";
import { Liquid } from "liquidjs";
import { env } from "../env";

export default fp<FastifyViewOptions>(async (fastify) => {
  fastify.register(fastifyView, {
    engine: {
      liquid: new Liquid({
        root: resolve("src/views"),
        layouts: resolve("src/views/layout"),
        cache: process.env.NODE_ENV === "production",
        extname: ".liquid",
      }),
    },
    viewExt: "liquid", // Sets the default extension to `.liquid`
    includeViewExtension: true,
    defaultContext: {
      // Inject some context to your templates.
      baseUrl: env.APP_BASE_URL,
    },
    templates: resolve("src/views/pages"),
    options: {},
    logLevel: "debug",
    charset: "utf-8",
  });
});
