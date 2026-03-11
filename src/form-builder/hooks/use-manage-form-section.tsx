import { toast } from '../../components/react-sonner'
import useErrorHandler from '../../hooks/use-handle-error'
import { queryClient } from '../../lib/react-query'
import type { EditSectionForm, ReorderSectionRequest, Section } from '../types/form-builder.types'
import useApiDeleteSection from './api/use-api-delete-section'
import useCreateApiSection from './api/use-create-api-section'
import useEditApiSection from './api/use-edit-api-section'
import useReorderApiSection from './api/use-reorder-api-section'


interface Props {
  formId: string
  hasAnswers: boolean
}

const useManageFormSections = ({ formId, hasAnswers }: Props) => {
  const { mutate, isPending: isLoadingCreate } = useCreateApiSection()
  const { mutate: mutateReorderSection, isPending: isLoadingReorder } = useReorderApiSection()
  const { mutateAsync: mutateDeleteSection, isPending: isLoadingDelete } = useApiDeleteSection()
  const { mutateAsync: mutateEditSection, isPending: isLoadingEdit } = useEditApiSection()
  const { errorhandler } = useErrorHandler()


  // const executeCreateSection = () => {
  //   createNewTemplateVersion(
  //     { has_answers: true, template_history_id: Number(template_history_id) || 0 },
  //     {
  //       onSuccess: () => {
  //         toast.success('Se creó una nueva versión del formulario')
  //         queryClient.invalidateQueries({ queryKey: ['show-template'] })
  //         queryClient.invalidateQueries({ queryKey: ['list-templates'] })
  //       },
  //       onError(error) {
  //         errorhandler(error)
  //       }
  //     }
  //   )
  // }

  const createSection = (onConfirm?: () => void) => {
    if (hasAnswers) {
      // Cuando hay respuestas, llamamos al callback que abrirá el diálogo
      onConfirm?.()
    } else {
      // Cuando no hay respuestas, ejecutamos directamente
      mutate(formId, {
        onSuccess: () => {
          toast.success('La sección se creó correctamente.')
          queryClient.invalidateQueries({ queryKey: ['show-api-form', formId] })
        },
        onError(error) {
          errorhandler(error)
        }
      })
    }
  }

  const reorderSection = (sections: Section[]) => {
    const data: ReorderSectionRequest = {
      formId: Number(formId),
      items: sections.map((s, i) => ({ id: Number(s.id?.split('-')[0]), order: i }))
    }
    if (data.items.length === 0) return

    mutateReorderSection(data, {
      onSuccess: () => {
        toast.success('El orden de las secciones se actualizó correctamente.')
        queryClient.invalidateQueries({ queryKey: ['show-api-form', formId] })
      },
      onError(error) {
        errorhandler(error)
      }
    })
  }

  const deleteSection = async (id: string) => {
    if (hasAnswers) {
      // Si hay respuestas, crear nueva versión
  
    } else {
      // Si no hay respuestas, eliminar directamente
      await mutateDeleteSection(
        { formId: Number(formId), sectionId: Number(id.split('-')[0]) },
        {
          onSuccess: () => {
            toast.success('La sección se eliminó correctamente.')
            queryClient.invalidateQueries({ queryKey: ['show-api-form', formId] })
          },
          onError(error) {
            errorhandler(error)
          }
        }
      )
    }
  }

  const updateSection = async (section: EditSectionForm) => {
    await mutateEditSection(
      {
        description: section.description ?? '',
        formId: Number(formId),
        title: section.title,
        sectionId:Number(section.id.split('-')[0]) ,
        columns: section.columns
      },
      {
        onSuccess: () => {
          toast.success('La sección se actualizó correctamente.')
          queryClient.invalidateQueries({ queryKey: ['show-api-form', formId] })
        },
        onError(error) {
          errorhandler(error)
        }
      }
    )
  }

  return {
    createSection,
    reorderSection,
    deleteSection,
    updateSection,
    isLoadingSection:
      isLoadingCreate ||
      isLoadingReorder ||
      isLoadingDelete ||
      isLoadingEdit
  }
}

export default useManageFormSections
