import type { FastifyPluginCallback } from "fastify";
import { ROOT_ROUTE } from "../../constants";
import { todoController } from "../../controllers";

export const TodoRoutes = {
    base: "/todo",
} as const;

export const todoRoute: FastifyPluginCallback = (fastify, _opts, done) => {
    fastify.get(ROOT_ROUTE, async (_request, reply) => {
        const todosRes = await todoController.getAll();
        return reply.send(todosRes);
    });

    done();
};
