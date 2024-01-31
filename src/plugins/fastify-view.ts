import path, { resolve } from "node:path";
import fastifyView, { FastifyViewOptions } from "@fastify/view";
import fp from "fastify-plugin";
import { Liquid } from "liquidjs";

export default fp<FastifyViewOptions>(async (fastify) => {
  const liquidEngine = new Liquid({
    root: path.join(__dirname, "../views"),
    cache: process.env.NODE_ENV === "production",
    extname: ".liquid",
  });

  fastify.register(fastifyView, {
    engine: { liquid: liquidEngine },
    viewExt: "liquid", // Sets the default extension to `.liquid`
    includeViewExtension: true,
    defaultContext: {
      // Inside your templates, `dev` will be `true` if the expression evaluates to true
      dev: process.env.NODE_ENV === "development",
    },
    templates: resolve("src/views/pages"),
    options: {},
    logLevel: "debug",
    charset: "utf-8",
  });
});
