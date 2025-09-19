import type { PaginationParams } from "../types";

export const ROOT_ROUTE = "/";

export const API_V1_BASE_ROUTE = "/api/v1";

export const DEFAULT_PAGINATION_PARAMS: PaginationParams = {
    limit: 10,
    offset: 0,
    page: 1,
};
