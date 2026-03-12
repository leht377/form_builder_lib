export interface MetaPagination {
    current_page: number;
    from: number;
    last_page: number;
    links: {
        url: string | null;
        label: string;
        page: number | null;
        active: boolean;
    }[];
    path: string;
    per_page: number;
    to: number;
    total: number;
}
export interface ApiParams<TFilters extends Record<string, string | number> = Record<string, string | number>, TInclude extends string | Record<string, string> = string> {
    page?: string;
    paginate?: 1 | 0 | 'true' | 'false';
    force_delete?: 1 | 0 | 'true' | 'false';
    only_trashed?: 1 | 0 | 'true' | 'false';
    limit?: string;
    sort?: string;
    filter?: TFilters;
    include?: TInclude[] | TInclude;
}
export interface ResponseAPI<T extends Record<string, any> | null> {
    success: boolean;
    message: string;
    data: T;
    links?: Partial<{
        first: string | null;
        last: string | null;
        prev: string | null;
        next: string | null;
    }>;
    meta?: MetaPagination;
}
export interface ResponseError {
    status: number;
    message: string;
    errors: Record<string, any>;
}
export interface DuplicateFormPayload {
    id: string;
    has_answers: boolean;
}
//# sourceMappingURL=response.types.d.ts.map