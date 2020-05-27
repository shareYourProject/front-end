export interface PagedResponse<T> {
    next: () => Promise<T[]>;
}