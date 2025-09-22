import type { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";
import { DEFAULT_PAGINATION_PARAMS, ROOT_ROUTE } from "../../constants";
import { todoController } from "../../controllers";
import type { CreateTodoDao } from "../../dao";
import { paginationPlugin } from "../../plugins";
import {
    createFailureResponse,
    createPaginatedResponse,
    createSuccessResponse,
} from "../../utils";

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

    fastify.post<{ Body: CreateTodoDao }>(
        ROOT_ROUTE,
        {
            preHandler: (request, reply, done) => {
                const body = request.body ?? {};
                const trimmedTitle = body?.title?.trim() ?? "";
                const trimmedDesc = body?.description?.trim() ?? "";

                let valid = true;
                let message = "";

                if (trimmedTitle === "") {
                    valid = false;
                    message = "Title cannot be empty";
                } else if (trimmedDesc === "") {
                    valid = false;
                    message = "Description cannot be empty";
                }
                if (valid === false) {
                    reply.status(400).send(createFailureResponse(message));
                }

                done();
            },
        },
        async (request, reply) => {
            const createdTodo = await todoController.create(request.body);
            reply.status(201).send(createSuccessResponse(createdTodo));
        },
    );
};
