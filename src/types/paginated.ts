export interface PaginatedResponse<T> {
  items: T[];
  meta: {
    totalItems: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}
