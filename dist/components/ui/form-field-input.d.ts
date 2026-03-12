import React from 'react';
import { type Control, type FieldPath, type FieldValues } from 'react-hook-form';
import { type StylesConfig } from 'react-select';
export type InputType = 'text' | 'text-area' | 'switch' | 'checkbox' | 'select' | 'datetime-local' | 'date' | 'number' | 'file';
export type OptionType = {
    value: string | number;
    label: string;
};
export declare const ReactSelectCustomStyles: StylesConfig;
interface Props<T extends FieldValues> {
    name: FieldPath<T>;
    control: Control<T>;
    label?: string;
    isRequired?: boolean;
    placeholder?: string;
    description?: string;
    type: InputType;
    className?: string;
    isMultiSelect?: boolean;
    isSelectClearable?: boolean;
    options?: OptionType[];
    step?: string | number;
    disabled?: boolean;
    readOnly?: boolean;
    min?: number | string;
    max?: number | string;
    isLoading?: boolean;
    multiple?: boolean;
    accept?: string;
    ref?: React.Ref<any>;
    editorClassName?: string;
    height?: number;
    width?: number;
    valid?: boolean;
}
declare const FormFieldInput: <T extends FieldValues>({ control, name, label, placeholder, description, type, className, isRequired, isMultiSelect, isSelectClearable, options, step, disabled, readOnly, isLoading, multiple, accept, max, min, ref, editorClassName, height, width }: Props<T>) => import("react/jsx-runtime").JSX.Element;
export default FormFieldInput;
//# sourceMappingURL=form-field-input.d.ts.map