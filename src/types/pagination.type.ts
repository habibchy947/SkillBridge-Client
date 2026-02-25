export interface PaginationControlProps {
    meta: {
        limit: number;
        page: number;
        total: number;
        totalPages: number;
    }
}