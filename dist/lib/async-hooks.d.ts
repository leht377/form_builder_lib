export interface RefetchResult<TData, TError> {
    data?: TData;
    error?: TError;
}
interface UseSimpleQueryOptions<TData, TError> {
    queryFn: () => Promise<TData>;
    enabled?: boolean;
    deps?: unknown[];
    onSuccess?: (data: TData) => void;
    onError?: (error: TError) => void;
}
interface UseSimpleMutationOptions<TData, TVariables> {
    mutationFn: (variables: TVariables) => Promise<TData>;
}
export interface MutationCallbacks<TData, TError> {
    onSuccess?: (data: TData) => void;
    onError?: (error: TError) => void;
}
export declare const useSimpleQuery: <TData, TError = Error>({ queryFn, enabled, deps, onSuccess, onError }: UseSimpleQueryOptions<TData, TError>) => {
    data: TData;
    error: TError;
    isLoading: boolean;
    refetch: () => Promise<RefetchResult<TData, TError>>;
};
export declare const useSimpleMutation: <TData, TVariables, TError = Error>({ mutationFn }: UseSimpleMutationOptions<TData, TVariables>) => {
    mutate: (variables: TVariables, callbacks?: MutationCallbacks<TData, TError>) => void;
    mutateAsync: (variables: TVariables, callbacks?: MutationCallbacks<TData, TError>) => Promise<TData>;
    isPending: boolean;
    error: TError;
};
export {};
//# sourceMappingURL=async-hooks.d.ts.map