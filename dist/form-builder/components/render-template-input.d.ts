import React from 'react';
import type { FormQuestionTypeInput } from '../types/form-builder.types';
interface Props {
    type: FormQuestionTypeInput;
    onClick?: React.MouseEventHandler<HTMLInputElement>;
    placeholder?: string;
    label: string;
    description?: string;
    required?: boolean;
}
declare const RenderTemplateInput: ({ type, onClick, placeholder, label, description, required }: Props) => import("react/jsx-runtime").JSX.Element;
export default RenderTemplateInput;
//# sourceMappingURL=render-template-input.d.ts.map