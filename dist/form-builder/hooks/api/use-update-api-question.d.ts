import { AxiosError } from 'axios';
import type { ResponseError } from '../../../types/response.types';
import type { UpdateQuestionRequest } from '../../types/form-builder.types';
declare const useUpdateApiQuestion: () => {
    mutate: (variables: UpdateQuestionRequest, callbacks?: import("../../../lib/async-hooks").MutationCallbacks<void, AxiosError<ResponseError, any>>) => void;
    mutateAsync: (variables: UpdateQuestionRequest, callbacks?: import("../../../lib/async-hooks").MutationCallbacks<void, AxiosError<ResponseError, any>>) => Promise<void>;
    isPending: boolean;
    error: AxiosError<ResponseError, any>;
};
export default useUpdateApiQuestion;
//# sourceMappingURL=use-update-api-question.d.ts.map