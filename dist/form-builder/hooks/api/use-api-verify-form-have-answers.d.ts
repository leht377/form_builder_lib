declare const useApiVerifyFormHaveAnswers: (id: string) => {
    data: import("../../types/form-builder.types").FormAnswersVerification;
    error: Error;
    isLoading: boolean;
    refetch: () => Promise<import("../../../lib/async-hooks").RefetchResult<import("../../types/form-builder.types").FormAnswersVerification, Error>>;
};
export default useApiVerifyFormHaveAnswers;
//# sourceMappingURL=use-api-verify-form-have-answers.d.ts.map