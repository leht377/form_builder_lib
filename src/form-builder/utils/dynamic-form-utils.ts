import { ZodString, type ZodTypeAny, z } from 'zod/v3'

import type { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form'
import type {
  FormDynamicSchema,
  FormDynamicSection,
  InputFieldDefinition,
  SpecialFormConfig
} from '../types/dynamic-form.types'
import type {
  Answers,
  AnswersQuestion,
  Form,
  FormQuestion,
  FormQuestionTypeInput,
  FormResponse,
  FormSection
} from '../types/form-builder.types'
import { tryParseJSON } from '@/lib/utils'

const normalizeDate = (date: string) => {
  if (date.includes('-')) return date

  const [d, m, y] = date.split('/')
  return `${y}-${m}-${d}`
}

export const mapResponseToAnswers = (
  response: Record<string, any>,
  getId: (key: number) => number | null
): Answers[] =>
  Object.entries(response).map(([key, value]) => ({
    id: getId(Number(key)),
    form_question_id: Number(key),
    value: {
      key: mapperAnwserValueSaveProgress(value)
    }
  }))

export function getFieldError(
  error: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined
): FieldError | undefined {
  if (!error) return undefined
  if (Array.isArray(error)) {
    const firstError = error.find((e) => typeof e === 'object')
    return firstError
  }

  if ('type' in error) {
    return error as FieldError
  }

  return undefined
}

export const buildInitialValues = (
  inputDefinitions: InputFieldDefinition[],
  initialVal?: Record<string, any>
) => {
  const values: Record<string, any> = {}

  inputDefinitions.forEach((field) => {
    let defaultValue: any

    switch (field.type) {
      case 'select':
        defaultValue = ''
        break
      case 'file':
        defaultValue = []
        break
      case 'number':
        defaultValue = 0
        break
      default:
        defaultValue = ''
        break
    }

    values[field.name] = initialVal?.[field.name] ?? defaultValue
  })

  return values
}

export const buildZodSchema = (
  inputDefinitions: InputFieldDefinition[],
  SpecialFormConfig?: SpecialFormConfig
) => {
  const schemaObject: Record<string, ZodTypeAny> = {}

  inputDefinitions.forEach((field) => {
    let zodField: ZodTypeAny
    const maxBytes = (field.config?.size ?? 999_999) * 1024 * 1024
    switch (field.type) {
      case 'file':
        zodField = z.array(
          z.object({
            id: z.string().optional(),
            url: z
              .string({
                required_error: `${field.label} es obligatorio`,
                invalid_type_error: `${field.label} debe ser una cadena de texto`
              })
              .optional(),
            name: z
              .string({
                required_error: `${field.label} es obligatorio`,
                invalid_type_error: `${field.label} debe ser una cadena de texto`
              })
              .min(1),
            type: z
              .string({
                required_error: `${field.label} es obligatorio`,
                invalid_type_error: `${field.label} debe ser una cadena de texto`
              })
              .min(1),
            file: z.instanceof(File).optional(),
            size: z
              .number()
              .max(maxBytes, {
                message: `El tamaño del archivo debe ser menor o igual a ${
                  field.config?.size ?? 999_999
                } MB`
              })
              .optional()
          })
        )

        if (field.required) {
          zodField = (zodField as z.ZodArray<any>).min(1, {
            message: `${field.label} debe contener al menos un elemento`
          })
        } else {
          zodField = zodField.optional()
        }
        break
      case 'select':
        if (field.config?.multiple) {
          let arraySchema = z.array(z.string())

          if (field.required) {
            arraySchema = arraySchema.min(1, {
              message: `${field.label} debe contener al menos un elemento`
            })
          }

          zodField = z.preprocess(
            (value) => (Array.isArray(value) ? value.map((v) => String(v)) : []),
            arraySchema
          )
        } else {
          const stringSchema = z.string()

          zodField = z.preprocess(
            (value) => (value !== undefined && value !== null ? String(value) : value),
            field.required
              ? stringSchema.min(1, {
                  message: `${field.label} debe contener al menos un elemento`
                })
              : stringSchema.optional()
          )
        }

        break
      case 'number':
        let numberSchema: ZodTypeAny = z.number({
          required_error: `${field.label} es obligatorio`,
          invalid_type_error: `${field.label} debe ser un numero valido`
        })

        if (field.min !== undefined)
          numberSchema = (numberSchema as z.ZodNumber).min(Number(field.min), {
            message: `${field.label} debe ser como minimo ${field.min}`
          })

        if (field.max !== undefined)
          numberSchema = (numberSchema as z.ZodNumber).max(Number(field.max), {
            message: `${field.label} debe ser como máximo ${field.max}`
          })

        if (!field.required) numberSchema = numberSchema.optional()

        zodField = z.preprocess((value) => {
          if (value === '' || value === null || value === undefined) return undefined

          if (typeof value === 'number') {
            return Number.isFinite(value) ? value : Number.NaN
          }

          if (typeof value === 'string') {
            const normalized = value.replace(/,/g, '').trim()
            if (!normalized) return undefined
            const isValidNumeric = /^\d+(\.\d+)?$/.test(normalized)
            if (!isValidNumeric) return Number.NaN
            return Number(normalized)
          }

          return Number.NaN
        }, numberSchema)

        break
      case 'text':
        zodField = z.string({
          required_error: `${field.label} es obligatorio`,
          invalid_type_error: `${field.label} debe ser una cadena de texto`
        })

        if (field.min !== undefined)
          zodField = (zodField as ZodString).min(Number(field.min), {
            message: `${field.label} debe tener al menos ${field.min} caracteres`
          })

        if (field.max !== undefined)
          zodField = (zodField as ZodString).max(Number(field.max), {
            message: `${field.label} debe tener como máximo ${field.max} caracteres`
          })

        if (!field.required) zodField = zodField.optional()
        else
          zodField = (zodField as ZodString).min(1, {
            message: `${field.label} es obligatorio`
          })
        break
      case 'date': {
        const minDate = field.min ? normalizeDate(String(field.min)) : undefined
        const maxDate = field.max ? normalizeDate(String(field.max)) : undefined

        zodField = z.string().transform((v) => (v === '' ? '' : v))

        if (field.required) {
          zodField = zodField.refine((val) => !!val, `${field.label} es obligatorio`)
        }

        if (minDate) {
          zodField = zodField.refine(
            (val) => !val || normalizeDate(val) >= minDate,
            `${field.label} debe ser mayor o igual a ${field.min}`
          )
        }

        if (maxDate) {
          zodField = zodField.refine(
            (val) => !val || normalizeDate(val) <= maxDate,
            `${field.label} debe ser menor o igual a ${field.max}`
          )
        }

        if (!field.required) {
          zodField = zodField.optional()
        }

        break
      }
      default:
        zodField = z.string({
          required_error: `${field.label} es obligatorio`
        })

        if (field.min !== undefined)
          zodField = (zodField as ZodString).min(Number(field.min), {
            message: `${field.label} debe tener al menos ${field.min} caracteres`
          })

        if (field.max !== undefined)
          zodField = (zodField as ZodString).max(Number(field.max), {
            message: `${field.label} debe tener como máximo ${field.max} caracteres`
          })

        if (!field.required) zodField = zodField.optional()
        break
    }

    schemaObject[field.name] = zodField
  })

  return z.object(schemaObject).superRefine((data, ctx) => {
    if (!SpecialFormConfig) return

    SpecialFormConfig.equalFields.forEach(({ a, b }) => {
      if (data[a] !== data[b]) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Los campos deben de ser iguales',
          path: [a]
        })
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Los campos deben de ser iguales',
          path: [b]
        })
      }
    })
  })
}

export const mapDynamicFormAnswerToFormAnswer = (data: Record<string, string>): AnswersQuestion[] =>
  Object.keys(data).map((key) => ({
    form_question_id: key,
    value: { key: Array.isArray(data[key]) ? JSON.stringify(data[key]) : data[key] }
  }))

function toBoolean(str: any) {
  return String(str).toLowerCase() === 'true'
}

type modeSchema = 'strict' | 'optional'

export const formBuilderSchema = (
  form: Form,
  isAllOptional: modeSchema = 'strict'
): FormDynamicSchema => {
  const mapQuestion = (q: FormQuestion): InputFieldDefinition => {
    const typeName = q.relationships.form_question_type.attributes.name as FormQuestionTypeInput

    const rawMin = q.attributes.config?.min
    const rawMax = q.attributes.config?.max

    let minValue: number | string | undefined //string para el caso de fechas
    let maxValue: number | string | undefined //string para el caso de fechas

    if (typeName === 'date') {
      const isMaxToday = q.attributes.config?.max_date === true
      minValue = rawMin ? rawMin : undefined
      maxValue = isMaxToday ? new Date().toISOString().split('T')[0] : rawMax ? rawMax : undefined
    } else {
      minValue =
        isAllOptional === 'strict' && q.attributes.is_required && !rawMin
          ? 0
          : rawMin !== undefined
            ? Number(rawMin)
            : undefined

      maxValue = rawMax !== undefined ? Number(rawMax) : undefined
    }

    const options = tryParseJSON(q.attributes.config?.options)
    return {
      name: q.id?.toString(),
      label: q.attributes.label,
      type: typeName ?? 'text',
      placeholder: q.attributes.label,
      required: isAllOptional === 'strict' ? q.attributes.is_required : false,
      description: q.attributes.description ?? undefined,
      options: Array.isArray(options) ? options : [],
      min: minValue,
      max: maxValue,
      config: {
        accept: q.attributes.config?.accept ?? undefined,
        multiple: q.attributes.config?.multiple
          ? toBoolean(q.attributes.config?.multiple)
          : undefined,
        size: q.attributes.config?.size ? Number(q.attributes.config?.size) : undefined,
        formatThousands: q.attributes.config?.format_curency
          ? toBoolean(q.attributes.config?.format_curency)
          : undefined
      }
    }
  }

  const mapSection = (s: FormSection): FormDynamicSection => ({
    id: s.id?.toString(),
    title: s.attributes.title,
    description: s.attributes.description,
    columns: s.attributes.columns,
    questions: s.relationships.questions.map(mapQuestion)
  })

  return {
    id: form.id?.toString(),
    name: form.attributes.name,
    description: form.attributes.description,
    sections: form.relationships.sections.map(mapSection)
  }
}

export const extractInitialValues = (
  formResponse?: FormResponse
): Record<string, any> | undefined => {
  if (!formResponse) return undefined
  const answers = formResponse.relationships.answers
  if (answers.length === 0) return undefined

  const initialValues = answers.reduce(
    (acc, crr) => {
      const key = crr.attributes.form_question_id
      const value = crr.attributes.value['key']
      const parcevalue = tryParseJSON(value)

      if (typeof parcevalue === 'number') acc[key] = parcevalue.toString()
      else if (Array.isArray(parcevalue) && parcevalue.some((v) => v?.url))
        acc[key] = parcevalue.map((v) => ({ ...v }))
      else acc[key] = parcevalue

      return acc
    },
    {} as Record<string, any>
  )
  return initialValues
}

export function mapperAnwserValueSaveProgress(value: any) {
  const isArray = Array.isArray(value)

  if (!isArray) return value
  if (value.some((v) => v?.url)) return JSON.stringify(value)
  return value.join(',')
}
