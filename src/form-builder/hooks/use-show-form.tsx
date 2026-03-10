import React, { useEffect, useMemo } from 'react'
import { useShowApiForm } from './api/use-show-api-form'
import { FormItem, Section, TemplateInputType } from '../types/template-builder-types'
import useErrorHandler from '@/src/hooks/use-handle-error'

const useShowForm = (id: string) => {
  const { data, error, isLoading: loading, refetch } = useShowApiForm(id)
  const { errorhandler } = useErrorHandler()

  useEffect(() => {
    if (error) errorhandler(error)
  }, [error])

  const sections = useMemo((): Section[] => {
    if (data && data?.relationships?.sections?.length > 0)
      return data?.relationships?.sections.map((s) => ({
        columns: s.attributes.columns ?? 1,
        id: s.id.toString() + '-' + 'section',
        title: s.attributes.title,
        description: s.attributes.description ?? undefined,
        items: s.relationships.questions.map(
          (q): FormItem => ({
            id: q.id.toString() + '-' + 'input',
            label: q.attributes.label,
            required: q.attributes.is_required,
            type: q.relationships.form_question_type.attributes.name as TemplateInputType,
            description: q.attributes.description ?? '',
            placeholder: q.attributes?.config?.placeholder ?? '',
            question_type_id: q.attributes.form_question_type_id?.toString(),
            config: q.attributes.config,
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
