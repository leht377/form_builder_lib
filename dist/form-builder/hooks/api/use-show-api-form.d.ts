import { AxiosError } from 'axios';
import type { ResponseError } from '../../../types/response.types';
import type { Form } from '../../types/form-builder.types';
export declare function useShowApiForm(id: string): {
    data: Form;
    error: AxiosError<ResponseError, any>;
    isLoading: boolean;
    refetch: () => Promise<import("../../../lib/async-hooks").RefetchResult<Form, AxiosError<ResponseError, any>>>;
};
//# sourceMappingURL=use-show-api-form.d.ts.map