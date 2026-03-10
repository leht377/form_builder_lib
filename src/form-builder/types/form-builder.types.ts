import z from 'zod'
import type { IconName } from '../../components/base-icon'

export type FormQuestionTypeInput = 'text' | 'file' | 'select' | 'number' | 'date'

export interface Form {
  id: number
  type: 'form'
  attributes: {
    name: string
    description: string
    is_active: boolean
    context: string
    version: number
    created_at: string
    updated_at: string
  }
  relationships: {
    sections: FormSection[]
  }
}

export interface FormResponseAnswer {
  id: string
  type: 'form_response_answer'
  attributes: {
    form_response_id: string
    form_question_id: string
    value: Record<string, unknown>
    created_at: string
    updated_at: string
  }
  relationships: []
}

export interface FormResponse {
  id: string
  type: 'form_response'
  attributes: {
    form_id: string
    assignable_type: string
    assignable_id: string
    status: 'submitted' | 'draft' | 'approved' | 'rejected'
    submitted_by: string | null
    submitted_at: string
    created_at: string
    updated_at: string
  }
  relationships: {
    answers: FormResponseAnswer[]
  }
}

export interface FormQuestion {
  id: number
  type: 'form_question'
  attributes: {
    label: string
    description: string | null
    form_section_id: number
    form_question_type_id: number
    is_required: boolean
    is_locked: boolean
    config: Record<string, any> | null
    order: number
    created_at: string
    updated_at: string
  }
  relationships: {
    form_question_type: FormQuestionType
  }
}

export interface NormalizedFile {
  id?: string
  url?: string
  name: string
  type: string
  file?: File
  size?: number
}

export interface FormSection {
  id: number
  type: 'form_section'
  attributes: {
    title: string
    form_id: number
    columns: number | null
    description: string | null
    order: number
    created_at: string
    updated_at: string
  }
  relationships: {
    questions: FormQuestion[]
  }
}

export interface FormQuestionType {
  id: number
  type: 'form_question_types' // "form_question_types"
  attributes: {
    name: string
    display_name: string
    description: string | null
    icon: string | null
    created_at: string
    updated_at: string
  }
  relationships: {
    attributes: FormQuestionTypeAttributeRelation[]
  }
}

export interface FormAnswersVerification {
  id: number
  type: 'form_answers_verification'
  attributes: {
    has_answers: boolean
  }
  relationships: []
}

export interface FormQuestionTypeAttributeRelation {
  id: number
  type: 'form_question_type_attributes' // "form_question_type_attributes"
  attributes: {
    form_question_type_id: number
    description: string | null
    key: string // e.g. "accept", "multiple", "required"
    type: 'string' | 'boolean' | 'array'
    section: 'general' | 'validation'
    default_value: string | null
    created_at: string
    updated_at: string
  }
  relationships: any[] // el JSON viene vacío
}

export interface ReorderSectionRequest {
  formId: number
  items: { id: number; order: number }[]
}
export interface ReorderQuestionRequest {
  formId: number
  items: { id: number; order: number; form_section_id?: number }[]
}
export interface DeleteSectionRequest {
  formId: number
  sectionId: number
}
export interface UpdateQuestionRequest {
  formId: number
  sectionId: number
  questionId: number
  label?: string
  config?: Record<string, any>
  description?: string
  is_required?: boolean | 0 | 1
  is_locked?: boolean | 0 | 1
}

export interface DeleteQuestionRequest {
  formId: number
  sectionId: number
  questionId: number
}
export interface UpdateSectionRequets {
  formId: number
  sectionId: number
  columns: number
  title: string
  description: string
}
export interface AddQuestiontoFormRequets {
  formId: number
  sectionId: number
  form_question_type_id: number
  label: string
}

export const EditSectionFormSchema = z.object({
  id: z.string(),
  title: z.string(),
  columns: z.number(),
  description: z.string().optional()
})
export interface Answers {
  id: number | null
  form_question_id: number
  value: {
    key: string
  }
}
export interface UpdateAnswerRequest {
  formId: number
  responseId: number
  submitted_by: number
  answers: Answers[]
}
export type EditSectionForm = z.infer<typeof EditSectionFormSchema>

export interface FormItem {
  id: string
  type: FormQuestionTypeInput
  label: string
  config: Record<string, any> | null
  question_type_id: string
  placeholder?: string
  required?: boolean
  description?: string
  isLock?: boolean
  icon?: IconName
}

export interface Section {
  id: string
  title: string
  columns: number
  description?: string
  isLock?: boolean
  items: FormItem[]
}

export const EditInputFormSchema = z.object({
  id: z.string(),
  sectionId: z.string(),
  label: z.string(),
  description: z.string().optional(),
  placeholder: z.string().optional(),
  required: z.boolean(),
  question_type_id: z.string(),
  config: z.record(z.any(), z.any().nullable()).optional()
})
export const CreateTemplateFormSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  departments: z.array(z.number()),
  template_category_id: z.string().optional(),
  asistance_group_id: z.string().optional(),
  description: z.string().optional(),
  formId: z.string().optional(),
  allow_file_uploads: z.boolean().optional(),
  accept_resolution_attachments: z.boolean().or(z.literal(0)).or(z.literal(1)).optional(),
  accept_signatures: z.boolean().or(z.literal(0)).or(z.literal(1)).optional(),
  sla_first_response_time: z.number().optional(),
  resolution_time_limit_minutes: z
    .string()
    .regex(/^\d+$/, 'Debe contener solo números enteros')
    .optional()
})

export type EditInputForm = z.infer<typeof EditInputFormSchema>
export type CreateTemplateForm = z.infer<typeof CreateTemplateFormSchema>
