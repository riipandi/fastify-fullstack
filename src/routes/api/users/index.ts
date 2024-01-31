import { FastifyPluginAsync } from "fastify";

const routes: FastifyPluginAsync = async (fastify, _opts): Promise<void> => {
  fastify.get("/", async function (this, _request, reply) {
    try {
      const allUsers = await this.db
        .selectFrom("users")
        .select(["id", "email", "first_name", "last_name"])
        .execute();

      if (allUsers.length < 1) {
        reply.send({ message: "No users found" }).code(204);
      }
      reply.send(allUsers);
    } catch (error) {
      reply.send({ error }).code(500);
    }
  });
};

export default routes;
