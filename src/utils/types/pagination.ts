export interface IPagination {
    page: number;
    limit: number;
}

export interface IPaginationResponse {
    totalItems: number,
    itemCount: number,
    itemsPerPage: number,
    totalPages: number,
    currentPage: number
}

export interface DataWithPagination<T> {
    meta: IPaginationResponse,
    items: T
}