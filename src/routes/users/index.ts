import { FastifyPluginAsync } from "fastify";
import { User, users } from "../../database/schema/users";

const userRoute: FastifyPluginAsync = async (fastify, _opts): Promise<void> => {
  fastify.get("/", async function (this, _request, reply) {
    try {
      const allUsers: User[] = await this.db.select().from(users);
      reply.send(allUsers);
    } catch (error) {
      reply.send({ message: "No users found" });
    }
  });
};

export default userRoute;
