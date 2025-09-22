import type { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";
import { DEFAULT_PAGINATION_PARAMS, ROOT_ROUTE } from "../../constants";
import { todoController } from "../../controllers";
import type { CreateTodoDao, UpdateTodoDao } from "../../dao";
import { paginationPlugin } from "../../plugins";
import { todoSchemas } from "../../schemas";
import {
    createFailureResponse,
    createPaginatedResponse,
    createSuccessResponse,
    createSuccessResponseWithoutData,
    isDefined,
} from "../../utils";
import type { IdParam } from "./types";

export const TodoRoutes = {
    base: "/todo",
    byId: "/:id",
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

    fastify.patch<{ Params: IdParam; Body: UpdateTodoDao }>(
        TodoRoutes.byId,
        {
            schema: {
                params: todoSchemas.idParam,
            },
            preHandler: (request, reply, done) => {
                const body = request.body ?? {};

                let valid = true;
                let message = "";

                if (isDefined(body.title)) {
                    const trimmedTitle = body?.title?.trim() ?? "";
                    if (trimmedTitle === "") {
                        valid = false;
                        message = "Title cannot be empty";
                    }
                } else if (isDefined(body.description)) {
                    const trimmedDesc = body?.description?.trim() ?? "";
                    if (trimmedDesc === "") {
                        valid = false;
                        message = "Description cannot be empty";
                    }
                } else if (isDefined(body.completed)) {
                    if (typeof body.completed !== "boolean") {
                        valid = false;
                        message = "Completed value should be boolean";
                    }
                }

                if (valid === false) {
                    reply.status(400).send(createFailureResponse(message));
                }

                done();
            },
        },
        async (request, reply) => {
            const id = request.params?.id ?? -1;

            const { error, updatedTodo } = await todoController.update(
                id,
                request.body,
            );

            if (error) {
                reply.status(400).send(createFailureResponse(error));
            } else {
                reply.status(200).send(createSuccessResponse(updatedTodo));
            }
        },
    );

    fastify.delete<{ Params: IdParam }>(
        TodoRoutes.byId,
        {
            schema: {
                params: todoSchemas.idParam,
            },
        },
        async (request, reply) => {
            const id = request.params?.id ?? -1;
            const { error } = await todoController.delete(id);

            if (error) {
                reply.status(400).send(createFailureResponse(error));
            } else {
                reply.status(200).send(createSuccessResponseWithoutData());
            }
        },
    );
};
