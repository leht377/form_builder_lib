import type { OptionType } from "../../components/ui/form-field-input";
import type { FormQuestionTypeInput } from "./form-builder.types";
export interface InputFieldDefinitionConfig {
    accept?: string;
    size?: null | number;
    multiple?: boolean;
}
export interface SpecialFormConfig {
    equalFields: {
        a: string;
        b: string;
    }[];
}
export interface InputFieldDefinition {
    name: string;
    label: string;
    type: FormQuestionTypeInput;
    options?: OptionType[];
    placeholder: string;
    min?: number | string;
    max?: number | string;
    required?: boolean;
    description?: string;
    config?: InputFieldDefinitionConfig;
}
export interface FormDynamicSection {
    id: string;
    title: string;
    columns: number | null;
    description: string | null;
    questions: InputFieldDefinition[];
}
export interface FormDynamicSchema {
    id: string;
    name: string;
    description: string | null;
    sections: FormDynamicSection[];
}
//# sourceMappingURL=dynamic-form.types.d.ts.map