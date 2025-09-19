import type { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";
import { DEFAULT_PAGINATION_PARAMS, ROOT_ROUTE } from "../../constants";
import { todoController } from "../../controllers";
import { paginationPlugin } from "../../plugins";
import { createPaginatedResponse } from "../../utils";

export const TodoRoutes = {
    base: "/todo",
} as const;

export const todoRoute: FastifyPluginAsync = async (fastify) => {
    await fastify.register(fp(paginationPlugin));

    fastify.get(
        ROOT_ROUTE,
        { config: { paginate: true } },
        async (request, reply) => {
            const pagination = request.pagination ?? DEFAULT_PAGINATION_PARAMS;

            const todosRes = await todoController.getAll(
                request.pagination ?? { limit: 10, offset: 0, page: 1 },
            );

            return reply.send(
                createPaginatedResponse(
                    todosRes.todos,
                    pagination,
                    todosRes.totalTodos,
                ),
            );
        },
    );
};
