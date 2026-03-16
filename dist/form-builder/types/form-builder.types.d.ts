import z from 'zod';
import type { IconName } from '../../components/base-icon';
export type FormQuestionTypeInput = 'text' | 'file' | 'select' | 'number' | 'date';
export interface Form {
    id: number;
    type: 'form';
    attributes: {
        name: string;
        description: string;
        is_active: boolean;
        context: string;
        version: number;
        created_at: string;
        updated_at: string;
    };
    relationships: {
        sections: FormSection[];
    };
}
export interface FormResponseAnswer {
    id: string;
    type: 'form_response_answer';
    attributes: {
        form_response_id: string;
        form_question_id: string;
        value: Record<string, unknown>;
        created_at: string;
        updated_at: string;
    };
    relationships: [];
}
export interface FormResponse {
    id: string;
    type: 'form_response';
    attributes: {
        form_id: string;
        assignable_type: string;
        assignable_id: string;
        status: 'submitted' | 'draft' | 'approved' | 'rejected';
        submitted_by: string | null;
        submitted_at: string;
        created_at: string;
        updated_at: string;
    };
    relationships: {
        answers: FormResponseAnswer[];
    };
}
export interface FormQuestion {
    id: number;
    type: 'form_question';
    attributes: {
        label: string;
        description: string | null;
        form_section_id: number;
        form_question_type_id: number;
        is_required: boolean;
        is_locked: boolean;
        config: Record<string, any> | null;
        order: number;
        created_at: string;
        updated_at: string;
    };
    relationships: {
        form_question_type: FormQuestionType;
    };
}
export interface NormalizedFile {
    id?: string;
    url?: string;
    name: string;
    type: string;
    file?: File;
    size?: number;
}
export interface FormSection {
    id: number;
    type: 'form_section';
    attributes: {
        title: string;
        form_id: number;
        columns: number | null;
        description: string | null;
        order: number;
        created_at: string;
        updated_at: string;
    };
    relationships: {
        questions: FormQuestion[];
    };
}
export interface FormQuestionType {
    id: number;
    type: 'form_question_types';
    attributes: {
        name: string;
        display_name: string;
        description: string | null;
        icon: string | null;
        created_at: string;
        updated_at: string;
    };
    relationships: {
        attributes: FormQuestionTypeAttributeRelation[];
    };
}
export interface FormAnswersVerification {
    id: number;
    type: 'form_answers_verification';
    attributes: {
        has_answers: boolean;
    };
    relationships: [];
}
export interface FormQuestionTypeAttributeRelation {
    id: number;
    type: 'form_question_type_attributes';
    attributes: {
        form_question_type_id: number;
        description: string | null;
        key: string;
        type: 'string' | 'boolean' | 'array';
        section: 'general' | 'validation';
        default_value: string | null;
        created_at: string;
        updated_at: string;
    };
    relationships: any[];
}
export interface ReorderSectionRequest {
    formId: number;
    items: {
        id: number;
        order: number;
    }[];
}
export interface ReorderQuestionRequest {
    formId: number;
    items: {
        id: number;
        order: number;
        form_section_id?: number;
    }[];
}
export interface DeleteSectionRequest {
    formId: number;
    sectionId: number;
}
export interface UpdateQuestionRequest {
    formId: number;
    sectionId: number;
    questionId: number;
    label?: string;
    config?: Record<string, any>;
    description?: string;
    is_required?: boolean | 0 | 1;
    is_locked?: boolean | 0 | 1;
}
export interface DeleteQuestionRequest {
    formId: number;
    sectionId: number;
    questionId: number;
}
export interface UpdateSectionRequets {
    formId: number;
    sectionId: number;
    columns: number;
    title: string;
    description: string;
}
export interface AddQuestiontoFormRequets {
    formId: number;
    sectionId: number;
    form_question_type_id: number;
    label: string;
}
export declare const EditSectionFormSchema: z.ZodObject<{
    id: z.ZodString;
    title: z.ZodString;
    columns: z.ZodNumber;
    description: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export interface Answers {
    id: number | null;
    form_question_id: number;
    value: {
        key: string;
    };
}
export interface UpdateAnswerRequest {
    formId: number;
    responseId: number;
    submitted_by: number;
    answers: Answers[];
}
export type EditSectionForm = z.infer<typeof EditSectionFormSchema>;
export interface FormItem {
    id: string;
    type: FormQuestionTypeInput;
    label: string;
    config: Record<string, any> | null;
    question_type_id: string;
    placeholder?: string;
    required?: boolean;
    description?: string;
    isLock?: boolean;
    icon?: IconName;
}
export interface Section {
    id: string;
    title: string;
    columns: number;
    description?: string;
    isLock?: boolean;
    items: FormItem[];
}
export declare const EditInputFormSchema: z.ZodObject<{
    id: z.ZodString;
    sectionId: z.ZodString;
    label: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    placeholder: z.ZodOptional<z.ZodString>;
    required: z.ZodBoolean;
    question_type_id: z.ZodString;
    config: z.ZodOptional<z.ZodRecord<z.ZodAny, z.ZodNullable<z.ZodAny>>>;
}, z.core.$strip>;
export declare const CreateTemplateFormSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    name: z.ZodOptional<z.ZodString>;
    departments: z.ZodArray<z.ZodNumber>;
    template_category_id: z.ZodOptional<z.ZodString>;
    asistance_group_id: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    formId: z.ZodOptional<z.ZodString>;
    allow_file_uploads: z.ZodOptional<z.ZodBoolean>;
    accept_resolution_attachments: z.ZodOptional<z.ZodUnion<[z.ZodUnion<[z.ZodBoolean, z.ZodLiteral<0>]>, z.ZodLiteral<1>]>>;
    accept_signatures: z.ZodOptional<z.ZodUnion<[z.ZodUnion<[z.ZodBoolean, z.ZodLiteral<0>]>, z.ZodLiteral<1>]>>;
    sla_first_response_time: z.ZodOptional<z.ZodNumber>;
    resolution_time_limit_minutes: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type EditInputForm = z.infer<typeof EditInputFormSchema>;
export type CreateTemplateForm = z.infer<typeof CreateTemplateFormSchema>;
export interface UploadFile {
    id: 'string';
    type: 'file';
    attributes: {
        name: 'string';
        size: 'string';
        type: 'string';
        url: 'string';
    };
}
export interface AnswersQuestion {
    form_question_id: string;
    value: {
        key: string;
    };
}
//# sourceMappingURL=form-builder.types.d.ts.map