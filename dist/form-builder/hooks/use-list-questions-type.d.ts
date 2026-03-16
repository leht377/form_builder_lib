declare const useListQuestionType: () => {
    data: import("../types/form-builder.types").FormQuestionType[];
    error: Error;
    isLoading: boolean;
    refetch: () => Promise<import("../../lib/async-hooks").RefetchResult<import("../types/form-builder.types").FormQuestionType[], Error>>;
};
export default useListQuestionType;
//# sourceMappingURL=use-list-questions-type.d.ts.map