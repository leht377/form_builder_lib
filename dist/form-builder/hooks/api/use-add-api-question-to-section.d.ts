import type { ResponseError } from '../../../types/response.types';
import { AxiosError } from 'axios';
import type { AddQuestiontoFormRequets } from '../../types/form-builder.types';
declare const useAddApiQuestionToSection: () => {
    mutate: (variables: AddQuestiontoFormRequets, callbacks?: import("../../../lib/async-hooks").MutationCallbacks<void, AxiosError<ResponseError, any>>) => void;
    mutateAsync: (variables: AddQuestiontoFormRequets, callbacks?: import("../../../lib/async-hooks").MutationCallbacks<void, AxiosError<ResponseError, any>>) => Promise<void>;
    isPending: boolean;
    error: AxiosError<ResponseError, any>;
};
export default useAddApiQuestionToSection;
//# sourceMappingURL=use-add-api-question-to-section.d.ts.map