import type { ResponseError } from '../../../types/response.types';
import { AxiosError } from 'axios';
import type { ReorderQuestionRequest } from '../../types/form-builder.types';
declare const useReorderApiQuestion: () => {
    mutate: (variables: ReorderQuestionRequest, callbacks?: import("../../../lib/async-hooks").MutationCallbacks<void, AxiosError<ResponseError, any>>) => void;
    mutateAsync: (variables: ReorderQuestionRequest, callbacks?: import("../../../lib/async-hooks").MutationCallbacks<void, AxiosError<ResponseError, any>>) => Promise<void>;
    isPending: boolean;
    error: AxiosError<ResponseError, any>;
};
export default useReorderApiQuestion;
//# sourceMappingURL=use-reorder-api-question.d.ts.map