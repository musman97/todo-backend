import fastify from "fastify";
import { API_V1_BASE_ROUTE } from "./constants";
import { TodoRoutes, todoRoute } from "./routes";
import type { GeneralReply } from "./types";

const app = fastify({
    logger: true,
});

app.register(
    (fastify) => {
        fastify.register(todoRoute, { prefix: TodoRoutes.base });
    },
    { prefix: API_V1_BASE_ROUTE },
);

app.all("*", (request, reply) => {
    const { url, method } = request;

    reply.status(404).send({
        success: false,
        message: `No ${url}:${method} found`,
    } satisfies GeneralReply);
});

export { app };
