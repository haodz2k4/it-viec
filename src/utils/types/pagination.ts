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

