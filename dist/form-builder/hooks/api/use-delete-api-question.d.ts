import { AxiosError } from 'axios';
import type { DeleteQuestionRequest } from '../../types/form-builder.types';
import type { ResponseError } from '../../../types/response.types';
declare const useDeleteApiQuestion: () => {
    mutate: (variables: DeleteQuestionRequest, callbacks?: import("../../../lib/async-hooks").MutationCallbacks<void, AxiosError<ResponseError, any>>) => void;
    mutateAsync: (variables: DeleteQuestionRequest, callbacks?: import("../../../lib/async-hooks").MutationCallbacks<void, AxiosError<ResponseError, any>>) => Promise<void>;
    isPending: boolean;
    error: AxiosError<ResponseError, any>;
};
export default useDeleteApiQuestion;
//# sourceMappingURL=use-delete-api-question.d.ts.map