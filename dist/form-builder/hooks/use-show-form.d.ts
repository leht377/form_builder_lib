import type { Section } from '../types/form-builder.types';
declare const useShowForm: (id: string) => {
    form: import("../..").Form;
    isLoading: boolean;
    sections: Section[];
    refetch: () => Promise<import("../../lib/async-hooks").RefetchResult<import("../..").Form, import("axios").AxiosError<import("../../types/response.types").ResponseError, any>>>;
};
export default useShowForm;
//# sourceMappingURL=use-show-form.d.ts.map