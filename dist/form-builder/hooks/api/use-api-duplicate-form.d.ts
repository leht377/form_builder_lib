import type { Form } from '../../../form-builder/types/form-builder.types';
import type { DuplicateFormPayload, ResponseError } from '../../../types/response.types';
import type { AxiosError } from 'axios';
declare const useApiDuplicateForm: () => import("@tanstack/react-query").UseMutationResult<Form, AxiosError<ResponseError, any>, DuplicateFormPayload, unknown>;
export default useApiDuplicateForm;
//# sourceMappingURL=use-api-duplicate-form.d.ts.map