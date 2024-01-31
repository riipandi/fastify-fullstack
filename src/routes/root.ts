import { FastifyPluginAsync, RouteShorthandOptions } from "fastify";

const opts: RouteShorthandOptions = {
  schema: {
    response: {
      200: {
        type: "object",
        properties: {
          pong: {
            type: "string",
          },
        },
      },
    },
  },
};

const root: FastifyPluginAsync = async (fastify, _opts): Promise<void> => {
  fastify.get("/", opts, async (_request, reply) => {
    return reply.send({ pong: "it worked!" }).code(200);
  });
  fastify.get("/home", opts, async (_request, reply) => {
    return reply.view("home", { pageTitle: "Homepage", name: "Aris Ripandi" });
  });
  fastify.get("/about", opts, async (_request, reply) => {
    return reply.view("about", { pageTitle: "About" });
  });
};

export default root;
