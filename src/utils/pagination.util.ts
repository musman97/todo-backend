import type { GeneralReply, PaginationParams, PaginationQuery } from "../types";

export const createPaginationParams = (
    query: PaginationQuery,
): PaginationParams => ({ ...query, offset: (query.page - 1) * query.limit });

export const createPaginatedResponse = <T>(
    data: T[],
    paginationParams: PaginationParams,
    totalItems: number,
): GeneralReply => ({
    success: true,
    data,
    meta: {
        pagination: {
            total: totalItems,
            page: paginationParams.page,
            pageCount: Math.ceil(totalItems / paginationParams.limit),
            pageSize: paginationParams.limit,
        },
    },
});
