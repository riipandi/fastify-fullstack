import { FastifyPluginAsync } from "fastify";

const routes: FastifyPluginAsync = async (fastify, _opts): Promise<void> => {
  fastify.get("/", async (_request, reply) => {
    return reply.view("home", { pageTitle: "Homepage", name: "Aris Ripandi" });
  });

  fastify.get("/about", async (_request, reply) => {
    return reply.view("about", { pageTitle: "About" });
  });
};

export default routes;
