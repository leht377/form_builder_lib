import { type EditSectionForm } from '../../../form-builder/types/form-builder.types';
interface Props {
    values?: EditSectionForm;
    onsubmit?: (d: EditSectionForm) => Promise<void> | void;
    closeDialog: () => void;
}
declare const FormEditSection: ({ onsubmit, closeDialog, values }: Props) => import("react/jsx-runtime").JSX.Element;
export default FormEditSection;
//# sourceMappingURL=form-edit-section.d.ts.map