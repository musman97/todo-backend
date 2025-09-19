import fastify from "fastify";
import type { GeneralReply } from "./types";

const app = fastify({
    logger: true,
});

app.all("*", (request, reply) => {
    const { url, method } = request;

    reply.status(404).send({
        success: false,
        message: `No ${url}:${method} found`,
    } satisfies GeneralReply);
});

export { app };
