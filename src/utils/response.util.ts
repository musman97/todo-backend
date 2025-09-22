import type { GeneralReply, PaginationParams } from "../types";

export const createSuccessResponse = <T>(data: T): GeneralReply<T> => ({
    success: true,
    data,
});

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

export const createFailureResponse = (message: string): GeneralReply => ({
    success: false,
    message,
});
