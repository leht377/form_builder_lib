import type { FormItem, UpdateQuestionRequest } from '../types/form-builder.types';
interface Props {
    formId: string;
    hasAnswers: boolean;
}
declare const useManageFormInput: ({ formId, hasAnswers }: Props) => {
    addQuestionToSection: (sectionId: string, formQuestionTypeId: string, label: string, onConfirm?: () => void) => void;
    reorderQuestion: (inputs: FormItem[], moveToSectionId?: number) => void;
    deleteQuestion: (sectionId: string, questionId: string) => Promise<void>;
    updateQuestion: (data: Omit<UpdateQuestionRequest, "formId">) => Promise<void>;
    isLoadingInput: boolean;
};
export default useManageFormInput;
//# sourceMappingURL=use-manage-form-input.d.ts.map