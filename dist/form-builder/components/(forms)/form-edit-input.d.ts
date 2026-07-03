import React from 'react';
import { type EditInputForm } from '../../types/form-builder.types';
interface Props {
    values?: EditInputForm;
    onsubmit?: (data: EditInputForm) => Promise<void> | void;
    closeDialog: () => void;
}
export default function FormEditInput({ closeDialog, onsubmit, values }: Props): React.JSX.Element;
export {};
//# sourceMappingURL=form-edit-input.d.ts.map