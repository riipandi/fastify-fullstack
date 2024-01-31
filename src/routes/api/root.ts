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

const routes: FastifyPluginAsync = async (fastify, _opts): Promise<void> => {
  fastify.get("/api", opts, async (_request, reply) => {
    return reply.send({ pong: "it worked!" }).code(200);
  });
};

export default routes;
