import type { PaginationParams } from "./global";

declare module "fastify" {
    interface FastifyContextConfig {
        paginate?: boolean;
    }

    interface FastifyRequest {
        pagination: PaginationParams;
    }
}
