import { insertUserSchema, userTable } from "@/database/schema/users";
import { FastifyPluginAsync } from "fastify";

// Zod schema type is also inferred from the table schema, so you have full type safety
const requestSchema = insertUserSchema.pick({
  id: true,
  firstName: true,
  lastName: true,
});

const userRoute: FastifyPluginAsync = async (fastify, _opts): Promise<void> => {
  fastify.get("/", async function (this, _request, reply) {
    try {
      const allUsers = await this.db.select().from(userTable);
      reply.send(allUsers);
    } catch (error) {
      reply.send({ message: "No users found" });
    }
  });
};

export default userRoute;
