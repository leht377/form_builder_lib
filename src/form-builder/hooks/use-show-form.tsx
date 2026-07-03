import{ useEffect, useMemo } from 'react'
import useErrorHandler from '../../hooks/use-handle-error'
import type { FormItem, FormQuestionTypeInput, Section } from '../types/form-builder.types'
import { useShowApiForm } from './api/use-show-api-form'

const useShowForm = (id: string) => {
  const { data, error, isLoading: loading, refetch } = useShowApiForm(id)
  const { errorhandler } = useErrorHandler()

  useEffect(() => {
    if (error) errorhandler(error)
  }, [error])

  const sections = useMemo((): Section[] => {
    if (data && data?.relationships?.sections?.length > 0)
      return data?.relationships?.sections.map((s: any) => ({
        columns: s.attributes.columns ?? 1,
        id: s.id.toString() + '-' + 'section',
        title: s.attributes.title,
        description: s.attributes.description ?? undefined,
        items: s.relationships.questions.map(
          (q: any): FormItem => ({
            id: q.id.toString() + '-' + 'input',
            label: q.attributes.label,
            required: q.attributes.is_required,
            type: q.relationships.form_question_type.attributes.name as FormQuestionTypeInput,
            description: q.attributes.description ?? '',
            placeholder: q.attributes?.config?.placeholder ?? '',
            question_type_id: q.attributes.form_question_type_id?.toString(),
            config: Array.isArray(q.attributes.config) ? {} : q.attributes.config,
            isLock: q.attributes.is_locked
          })
        ),
        isLock: false
      }))
    else return []
  }, [data])

  return { form: data, isLoading: loading, sections, refetch }
}

export default useShowForm
