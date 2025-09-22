import fastify from "fastify";
import { TodoRoutes, todoRoute } from "./routes";
import type { GeneralReply } from "./types";
import { createApiResourcePath, createFailureResponse } from "./utils";

const app = fastify({
    logger: true,
});

app.setErrorHandler((error, _, reply) => {
    app.log.error(error);

    const statusCode = error.statusCode ?? 500;

    reply.status(statusCode).send(createFailureResponse(error.message));
});

app.register(todoRoute, { prefix: createApiResourcePath()(TodoRoutes.base) });

app.all("*", (request, reply) => {
    const { url, method } = request;

    reply.status(404).send({
        success: false,
        message: `No ${url}:${method} found`,
    } satisfies GeneralReply);
});

export { app };
