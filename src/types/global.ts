export interface PaginationParams {
    page: number;
    limit: number;
    offset: number;
}

export interface Pagination {
    total: number;
    page: number;
    pageSize: number;
    pageCount: number;
}

export interface ReplyMeta {
    pagination?: Pagination;
}

export interface GeneralReply<D = any> {
    success: boolean;
    message?: string;
    data?: D;
    meta?: ReplyMeta;
}

export interface PaginationQuery {
    page: number;
    limit: number;
}
