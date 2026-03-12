import { type EditInputForm } from '../../types/form-builder.types';
interface Props {
    values?: EditInputForm;
    onsubmit?: (data: EditInputForm) => Promise<void> | void;
    closeDialog: () => void;
}
export default function FormEditInput({ closeDialog, onsubmit, values }: Props): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=form-edit-input.d.ts.map