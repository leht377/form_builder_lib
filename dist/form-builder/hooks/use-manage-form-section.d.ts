import type { EditSectionForm, Section } from '../types/form-builder.types';
interface Props {
    formId: string;
    hasAnswers: boolean;
}
declare const useManageFormSections: ({ formId, hasAnswers }: Props) => {
    createSection: (onConfirm?: () => void) => void;
    reorderSection: (sections: Section[]) => void;
    deleteSection: (id: string) => Promise<void>;
    updateSection: (section: EditSectionForm) => Promise<void>;
    isLoadingSection: boolean;
};
export default useManageFormSections;
//# sourceMappingURL=use-manage-form-section.d.ts.map