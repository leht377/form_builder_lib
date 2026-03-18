interface Params {
    formId: string;
    formResponseId: string;
}
declare const useShowApiFormResponse: (params: Params) => {
    data: import("../../types/form-builder.types").FormResponse;
    error: Error;
    isLoading: boolean;
    refetch: () => Promise<import("../../../lib/async-hooks").RefetchResult<import("../../types/form-builder.types").FormResponse, Error>>;
};
export default useShowApiFormResponse;
//# sourceMappingURL=use-show-api-form-response.d.ts.map