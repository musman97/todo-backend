import type { GeneralReply, PaginationParams, PaginationQuery } from "../types";

export const createPaginationParams = (
    query: PaginationQuery,
): PaginationParams => ({ ...query, offset: (query.page - 1) * query.limit });
