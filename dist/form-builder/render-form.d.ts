import React from 'react';
import type { FormDynamicSchema, SpecialFormConfig } from './types/dynamic-form.types';
interface DynamicFormProps {
    formSchema: FormDynamicSchema;
    onSubmit: (values: Record<string, unknown>) => void;
    className?: React.HTMLAttributes<HTMLFormElement>['className'];
    titleSectionContainerClassName?: React.HTMLAttributes<HTMLFormElement>['className'];
    sectionClassName?: React.HTMLAttributes<HTMLElement>['className'];
    questionContainerClassName?: React.HTMLAttributes<HTMLElement>['className'];
    titleContainerClassName?: React.HTMLAttributes<HTMLElement>['className'];
    initialValues?: Record<string, string>;
    buttonText?: string;
    isSending?: boolean;
    disabledSubmit?: boolean;
    disabled?: boolean;
    error?: Record<string, string>;
    specialFormConfig?: SpecialFormConfig;
    isModeUploadFile?: boolean;
    handleDeleteFileUploaded?: (uri: string) => Promise<void>;
    isReadonly?: boolean;
}
declare const RenderForm: ({ formSchema, onSubmit, className, initialValues, buttonText, isSending, sectionClassName, questionContainerClassName, titleContainerClassName, error, disabledSubmit, titleSectionContainerClassName, specialFormConfig, disabled, isReadonly }: DynamicFormProps) => React.JSX.Element;
export default RenderForm;
//# sourceMappingURL=render-form.d.ts.map