import { AxiosError } from 'axios';
import type { FormResponse } from '../types/form-builder.types';
interface UseFormSubmitParams {
    formId: string;
    formResponse: FormResponse | undefined;
    userId: string;
    answersAssociatedIds: Map<number, number | null> | undefined;
}
interface SubmitOptions {
    onSuccess?: () => void;
    onError?: (error: AxiosError) => void;
}
export declare const useDynamicFormSubmit: ({ formId, formResponse, userId, answersAssociatedIds }: UseFormSubmitParams) => {
    handleSubmit: (response: Record<string, any>, formResponseId: string, options?: SubmitOptions) => Promise<void>;
    isLoading: boolean;
};
export {};
//# sourceMappingURL=use-dynamic-form-submit.d.ts.map