import type { JSX } from 'react';
import type { EditInputForm, EditSectionForm } from '../../types/form-builder.types';
interface Props {
    onEditSection: (s: EditSectionForm) => void;
    onEditInput: (input: EditInputForm) => void;
    onDeleteSection: (id: string) => void;
    onDeleteInput: (sectionId: string, id: string) => void;
}
declare const RenderDialog: ({ onEditSection, onEditInput, onDeleteSection, onDeleteInput }: Props) => JSX.Element;
export default RenderDialog;
//# sourceMappingURL=render-dialog.d.ts.map