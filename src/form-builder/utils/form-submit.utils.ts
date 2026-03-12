import type { FormResponse, NormalizedFile, UploadFile } from "../types/form-builder.types"


/**
 * Detecta archivos que fueron eliminados comparando estado anterior vs actual
 */
export const detectDeletedFiles = (
  response: Record<string, any>,
  formResponse: FormResponse | undefined
): string[] => {
  const filesToDelete: string[] = []

  Object.entries(response).forEach(([questionId, value]) => {
    const previousAnswer = formResponse?.relationships.answers.find(
      (a) => a.attributes.form_question_id?.toString() === questionId
    )

    if (previousAnswer && previousAnswer.attributes.value['key']) {
      const previousFiles = getParsedFiles(previousAnswer.attributes.value['key'] as any)

      // Obtener IDs de archivos anteriores
      const previousFileIds = new Set(
        previousFiles
          .filter((f: any) => f?.id)
          .map((f: any) => f.id)
      )

      // Obtener IDs de archivos actuales
      const currentFileIds = new Set(
        Array.isArray(value) && value.length > 0
          ? value
              .filter((f: any) => f?.id)
              .map((f: any) => f.id)
          : []
      )

      // Archivos que fueron eliminados
      previousFileIds.forEach((fileId) => {
        if (!currentFileIds.has(fileId)) {
          filesToDelete.push(fileId)
        }
      })
    }
  })

  return filesToDelete
}

/**
 * Parsea archivos del JSON guardado
 */
export const getParsedFiles = (jsonString: string): any[] => {
  try {
    const parsed = JSON.parse(jsonString)
    return Array.isArray(parsed) ? parsed : [parsed]
  } catch {
    return []
  }
}

/**
 * Procesa y sube archivos nuevos, separando existentes de nuevos
 */
export const processAndUploadFilesPerQuestion = async (
  response: Record<string, any>,
  uploadFiles: (files: NormalizedFile[]) => Promise<UploadFile[]>
): Promise<{ updatedResponse: Record<string, any>; uploadedFileIds: string[] }> => {
  const updatedResponse = { ...response }
  const uploadedFileIds: string[] = []

  for (const [questionId, value] of Object.entries(response)) {
    if (Array.isArray(value) && value.length > 0) {
      // Separar archivos con ID (existentes) de sin ID (nuevos)
      const existingFiles = value.filter((v) => v?.id)
      const newFiles = value.filter((v) => !v?.id && v?.file)

      // Si hay archivos nuevos, subirlos
      if (newFiles.length > 0) {
        const filesToUploadForQuestion = newFiles as NormalizedFile[]
        const uploadedFiles = await uploadFiles(filesToUploadForQuestion)

        // Registrar IDs subidos para posible rollback
        uploadedFiles.forEach((file) => {
          if (file?.id) uploadedFileIds.push(file.id)
        })

        // Mapear archivos subidos
        const uploadedFilesFormatted = uploadedFiles.map((file): NormalizedFile => ({
          id: file.id,
          url: file.attributes.url,
          name: file.attributes.name,
          type: file.attributes.type,
          size: Number(file.attributes.size) || 0
        }))

        // Combinar archivos existentes con los nuevos subidos
        updatedResponse[questionId] = [...existingFiles, ...uploadedFilesFormatted]
      }
    }
  }

  return { updatedResponse, uploadedFileIds }
}

/**
 * Elimina archivos del servidor uno a uno
 */
export const deleteFilesFromServer = async (
  filesToDelete: string[],
  deleteFile: (id: string) => Promise<void>
): Promise<boolean> => {
  for (const fileId of filesToDelete) {
    await deleteFile(fileId)
  }
  return true
}
