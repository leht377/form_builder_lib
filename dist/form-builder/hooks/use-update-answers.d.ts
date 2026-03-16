import { AxiosError } from 'axios';
import type { UpdateAnswerRequest } from '../types/form-builder.types';
import type { ResponseError } from '../../types/response.types';
declare const useUpdateAnswers: () => {
    mutate: (variables: UpdateAnswerRequest, callbacks?: import("../../lib/async-hooks").MutationCallbacks<any, AxiosError<ResponseError, any>>) => void;
    mutateAsync: (variables: UpdateAnswerRequest, callbacks?: import("../../lib/async-hooks").MutationCallbacks<any, AxiosError<ResponseError, any>>) => Promise<any>;
    isPending: boolean;
    error: AxiosError<ResponseError, any>;
};
export default useUpdateAnswers;
//# sourceMappingURL=use-update-answers.d.ts.map