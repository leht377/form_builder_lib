import type { FormQuestionTypeInput } from '../../types/form-builder.types';
import type { IconName } from '../../../components/base-icon';
interface DraggableInputProps {
    id: string;
    type: FormQuestionTypeInput;
    label: string;
    icon?: IconName;
}
export default function DraggableInput({ id, label, icon }: DraggableInputProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=draggable-Input.d.ts.map