import { AxiosError } from 'axios';
import type { ResponseError } from '../../../types/response.types';
import type { FormQuestionType } from '../../types/form-builder.types';
export declare function useShowApiQuestionType(id: string): {
    data: FormQuestionType;
    loading: boolean;
    error: AxiosError<ResponseError, any>;
    refetch: () => Promise<void>;
};
//# sourceMappingURL=use-show-api-form-question-type.d.ts.map