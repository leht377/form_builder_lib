import { toast } from '../../components/react-sonner'
import useErrorHandler from '../../hooks/use-handle-error'
import type {
  EditSectionForm,
  ReorderSectionRequest,
  Section
} from '../types/form-builder.types'
import useApiDeleteSection from './api/use-api-delete-section'
import useCreateApiSection from './api/use-create-api-section'
import useEditApiSection from './api/use-edit-api-section'
import useReorderApiSection from './api/use-reorder-api-section'

interface Props {
  formId: string
  hasAnswers: boolean
  onRefetch?: () => void | Promise<unknown>
}

const useManageFormSections = ({ formId, hasAnswers, onRefetch }: Props) => {
  const { mutate, isPending: isLoadingCreate } = useCreateApiSection()
  const { mutate: mutateReorderSection, isPending: isLoadingReorder } = useReorderApiSection()
  const { mutateAsync: mutateDeleteSection, isPending: isLoadingDelete } = useApiDeleteSection()
  const { mutateAsync: mutateEditSection, isPending: isLoadingEdit } = useEditApiSection()

  const { errorhandler } = useErrorHandler()

  const createSection = (onConfirm?: () => void) => {
    if (hasAnswers) {
      // Cuando hay respuestas, llamamos al callback que abrirá el diálogo
      onConfirm?.()
    } else {
      // Cuando no hay respuestas, ejecutamos directamente
      mutate(formId, {
        onSuccess: () => {
          toast.success('La sección se creó correctamente.')
          void onRefetch?.()
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
        void onRefetch?.()
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
            void onRefetch?.()
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
        sectionId: Number(section.id.split('-')[0]),
        columns: section.columns
      },
      {
        onSuccess: () => {
          toast.success('La sección se actualizó correctamente.')
          void onRefetch?.()
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
    isLoadingSection: isLoadingCreate || isLoadingReorder || isLoadingDelete || isLoadingEdit
  }
}

export default useManageFormSections
