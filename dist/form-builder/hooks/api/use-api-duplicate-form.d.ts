import type { Form } from '../../../form-builder/types/form-builder.types';
import type { DuplicateFormPayload, ResponseError } from '../../../types/response.types';
import type { AxiosError } from 'axios';
declare const useApiDuplicateForm: () => {
    mutate: (variables: DuplicateFormPayload, callbacks?: import("../../../lib/async-hooks").MutationCallbacks<Form, AxiosError<ResponseError, any>>) => void;
    mutateAsync: (variables: DuplicateFormPayload, callbacks?: import("../../../lib/async-hooks").MutationCallbacks<Form, AxiosError<ResponseError, any>>) => Promise<Form>;
    isPending: boolean;
    error: AxiosError<ResponseError, any>;
};
export default useApiDuplicateForm;
//# sourceMappingURL=use-api-duplicate-form.d.ts.map