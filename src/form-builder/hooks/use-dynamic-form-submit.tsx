import { useCallback } from 'react'
import { AxiosError } from 'axios'
import type { FormResponse } from '../types/form-builder.types'
import useErrorHandler from '@/hooks/use-handle-error'
import useApiUploadFile from './api/use-api-upload-file'
import useApiDeleteFile from './api/use-api-delete-file'
import useUpdateAnswers from './use-update-answers'
import {
  deleteFilesFromServer,
  detectDeletedFiles,
  processAndUploadFilesPerQuestion
} from '../utils/form-submit.utils'
import { mapResponseToAnswers } from '../utils/dynamic-form-utils'

interface UseFormSubmitParams {
  formId: string
  formResponse: FormResponse | undefined
  userId: string
  answersAssociatedIds: Map<number, number | null> | undefined
}

interface SubmitOptions {
  onSuccess?: () => void
  onError?: (error: AxiosError) => void
}

export const useDynamicFormSubmit = ({
  formId,

  formResponse,
  userId,
  answersAssociatedIds
}: UseFormSubmitParams) => {
  const { errorhandler } = useErrorHandler()
  const { mutateAsync: updateAnswersAsync, isPending: isPendingUpdate } = useUpdateAnswers()
  const { mutateAsync: uploadFiles, isPending: isUploadingFiles } = useApiUploadFile()
  const { mutateAsync: deleteFile, isPending: isDeletingFiles } = useApiDeleteFile()

  const isLoading = isPendingUpdate || isUploadingFiles || isDeletingFiles

  const handleSubmit = useCallback(
    async (response: Record<string, any>, formResponseId: string, options?: SubmitOptions) => {
      if (!userId) return

      const { onSuccess, onError } = options ?? {}

      try {
        // 1. Detectar archivos eliminados
        const filesToDelete = detectDeletedFiles(response, formResponse)

        // 2. Eliminar archivos del servidor
        if (filesToDelete.length > 0) {
          try {
            await deleteFilesFromServer(filesToDelete, deleteFile)
          } catch (error) {
            console.log(error)
          }
        }

        // 3. Procesar y subir archivos nuevos
        const { updatedResponse, uploadedFileIds } = await processAndUploadFilesPerQuestion(
          response,
          uploadFiles
        )

        // 4. Mapear response a answers
        const answers = mapResponseToAnswers(updatedResponse, (key: number) =>
          answersAssociatedIds ? (answersAssociatedIds.get(key) ?? null) : null
        )

        // 5. Guardar en BD
        try {
          await updateAnswersAsync({
            answers,
            formId: Number(formId) || 0,
            responseId: Number(formResponseId) || 0,
            submitted_by: Number(userId) || 0
          })

          onSuccess?.()
        } catch (error) {
          // Si falló el guardado, revertir subidas nuevas
          if (uploadedFileIds && uploadedFileIds.length > 0) {
            try {
              await deleteFilesFromServer(uploadedFileIds, deleteFile)
            } catch (cleanupErr) {
              console.error('Error limpiando archivos subidos tras fallo:', cleanupErr)
            }
          }
          onError?.(error as AxiosError)
        }
      } catch (error) {
        errorhandler(error as AxiosError)
        onError?.(error as AxiosError)

        console.error('Error en handleSubmit:', error)
      }
    },
    [
      formId,
      formResponse,
      userId,
      answersAssociatedIds,
      errorhandler,
      updateAnswersAsync,
      uploadFiles,
      deleteFile
    ]
  )

  return { handleSubmit, isLoading }
}
