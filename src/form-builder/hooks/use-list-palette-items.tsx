import { useMemo } from 'react'
import type { IconName } from '../../components/base-icon'
import type { FormItem, FormQuestionTypeInput } from '../types/form-builder.types'
import useListQuestionType from './use-list-questions-type'

const getIconByType = (type: FormQuestionTypeInput): IconName => {
  const iconMap: Record<FormQuestionTypeInput, IconName> = {
    text: 'NotepadText',
    number: 'Hash',
    date: 'Calendar',
    select: 'ListChecks',
    file: 'Folder'
  }
  return iconMap[type] || 'FileQuestion'
}

const useListPaletteItems = () => {
  const { data, isLoading } = useListQuestionType()

  const paletteItems: FormItem[] = useMemo(() => {
    if (!data) return []
    return data.map(
      (d): FormItem => ({
        id: `palette-${d.id}`,
        label: `Input ${d.attributes.display_name}`,
        type: d.attributes.name as FormQuestionTypeInput,
        question_type_id: d.id?.toString(),
        config: null,
        icon: getIconByType(d.attributes.name as FormQuestionTypeInput)
      })
    )
  }, [data])

  return { paletteItems, isLoading }
}

export default useListPaletteItems
