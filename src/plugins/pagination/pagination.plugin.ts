import type { FastifyPluginAsync } from "fastify";
import { DEFAULT_PAGINATION_PARAMS } from "../../constants";
import type { PaginationQuery } from "../../types";
import { createPaginationParams } from "../../utils";

export const paginationPlugin: FastifyPluginAsync = async (fastify) => {
    fastify.addHook("onRoute", (routeOptions) => {
        if (routeOptions.config?.paginate) {
            routeOptions.schema = {
                querystring: {
                    type: "object",
                    properties: {
                        page: {
                            type: "number",
                            minimum: 1,
                            default: DEFAULT_PAGINATION_PARAMS.page,
                        },
                        limit: {
                            type: "number",
                            minimum: 1,
                            maximum: 100,
                            default: DEFAULT_PAGINATION_PARAMS.limit,
                        },
                    },
                    additionalProperties: false,
                },
                ...routeOptions.schema,
            };
        }
    });

    fastify.addHook("preHandler", async (request) => {
        if (request.routeOptions.config.paginate) {
            const paginationParams = createPaginationParams(
                request.query as PaginationQuery,
            );

            request.pagination = paginationParams;
        }
    });
};
