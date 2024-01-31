import { join } from "node:path";

import AutoLoad, { AutoloadPluginOptions } from "@fastify/autoload";
import fastifyRequestLogger from "@mgcrea/fastify-request-logger";
import Fastify, { FastifyInstance, FastifyPluginAsync } from "fastify";

import fastifyFastrue from "@fastrue/fastify";

export type AppOptions = {
  // Place your custom options for app below here.
} & Partial<AutoloadPluginOptions>;

// Pass --options via CLI arguments in command to enable these options.
const options: AppOptions = {};

const server: FastifyInstance = Fastify({
  logger: {
    level: "debug",
    transport: {
      target: "@mgcrea/pino-pretty-compact",
      options: {
        translateTime: "HH:MM:ss Z",
        ignore: "pid,hostname",
      },
    },
  },
});

// Register fastify plugins
server.register(fastifyRequestLogger);

// Register fastrue plugins
server.register(fastifyFastrue, {
  routePrefix: "/auth",
});

server.register(AutoLoad, {
  dir: join(__dirname, "plugins"),
});

server.register(AutoLoad, {
  dir: join(__dirname, "routes"),
  dirNameRoutePrefix: true, // lack of prefix will mean no prefix, instead of directory name
});

server.setNotFoundHandler(async (request, reply) => {
  if (request.url.startsWith("/api")) {
    return reply.code(404).send({ message: "Resource not found" });
  }
  return reply
    .code(404)
    .view("404", { message: "The requested URL was not found on this server." });
});

const start = async () => {
  try {
    await server.listen({ port: 3000 });
    const address = server.server.address();
    const port = typeof address === "string" ? address : address?.port;
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
