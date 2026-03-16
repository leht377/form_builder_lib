import { toast } from '../../components/react-sonner'
import useErrorHandler from '../../hooks/use-handle-error'
import type {
  FormItem,
  ReorderQuestionRequest,
  UpdateQuestionRequest
} from '../types/form-builder.types'
import useAddApiQuestionToSection from './api/use-add-api-question-to-section'
import useDeleteApiQuestion from './api/use-delete-api-question'
import useReorderApiQuestion from './api/use-reorder-api-question'
import useUpdateApiQuestion from './api/use-update-api-question'

interface Props {
  formId: string
  hasAnswers: boolean
  onRefetch?: () => void | Promise<unknown>
}

const useManageFormInput = ({ formId, hasAnswers, onRefetch }: Props) => {
  const { mutate: mutateAddQuestion, isPending: isLoadingAdd } = useAddApiQuestionToSection()
  const { mutate: mutateReorderQuestion, isPending: isLoadingReorder } = useReorderApiQuestion()
  const { mutateAsync: mutateDeleteQuestion, isPending: isLoadingDelete } = useDeleteApiQuestion()
  const { mutateAsync: mutateUpdateQuestion, isPending: isLoadingUpdate } = useUpdateApiQuestion()
  const { errorhandler } = useErrorHandler()

  const addQuestionToSection = (
    sectionId: string,
    formQuestionTypeId: string,
    label: string,
    onConfirm?: () => void
  ) => {
    if (hasAnswers) {
      // Cuando hay respuestas, llamamos al callback que abrirá el diálogo
      onConfirm?.()
    } else {
      // Cuando no hay respuestas, ejecutamos directamente
      mutateAddQuestion(
        {
          formId: Number(formId),
          sectionId: Number(sectionId?.split('-')[0]) || 0,
          form_question_type_id: Number(formQuestionTypeId) || 0,
          label
        },
        {
          onSuccess: () => {
            toast.success('La pregunta se agregó correctamente a la sección.')
            void onRefetch?.()
          },
          onError(error) {
            errorhandler(error)
          }
        }
      )
    }
  }

  const reorderQuestion = (inputs: FormItem[], moveToSectionId?: number) => {
    const data: ReorderQuestionRequest = {
      formId: Number(formId),
      items: inputs.map((s, i) => ({
        id: Number(s.id?.split('-')[0]),
        order: i,
        form_section_id: moveToSectionId
      }))
    }

    mutateReorderQuestion(data, {
      onSuccess: () => {
        toast.success('El orden de las preguntas se actualizó correctamente.')
        void onRefetch?.()
      },
      onError(error) {
        errorhandler(error)
        // const message =
        //   error?.response?.data?.message ||
        //   'No se pudo actualizar el de las preguntas. Inténtalo de nuevo.'
        // toast.error(message)
      }
    })
  }

  const deleteQuestion = async (sectionId: string, questionId: string) => {
    if (hasAnswers) {
      // Si hay respuestas, crear nueva versión
    } else {
      // Si no hay respuestas, eliminar directamente
      await mutateDeleteQuestion(
        {
          formId: Number(formId) || 0,
          sectionId: Number(sectionId.split('-')[0]) || 0,
          questionId: Number(questionId?.split('-')[0]) || 0
        },
        {
          onSuccess: () => {
            toast.success('La pregunta fue eliminada correctamente.')
            void onRefetch?.()
          },
          onError(error) {
            errorhandler(error)
          }
        }
      )
    }
  }

  const updateQuestion = async (data: Omit<UpdateQuestionRequest, 'formId'>) => {
    await mutateUpdateQuestion(
      {
        ...data,
        questionId: data.questionId,
        sectionId: data.sectionId,
        is_required: data.is_required !== undefined ? (data.is_required ? 1 : 0) : undefined,
        is_locked: data.is_locked !== undefined ? (data.is_locked ? 1 : 0) : undefined,
        formId: Number(formId)
      },
      {
        onSuccess: () => {
          toast.success('Configuración actualizada correctamente.')
          void onRefetch?.()
        },
        onError(error) {
          errorhandler(error)

          // const message =
          //   error?.response?.data?.message ||
          //   'No se pudo actualizar el de la preguntas. Inténtalo de nuevo.'
          // toast.error(message)
        }
      }
    )
  }
  return {
    addQuestionToSection,
    reorderQuestion,
    deleteQuestion,
    updateQuestion,
    isLoadingInput: isLoadingAdd || isLoadingReorder || isLoadingDelete || isLoadingUpdate
  }
}

export default useManageFormInput
