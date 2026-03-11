import { AxiosError } from 'axios'

import { uploadFileService } from '../../services/form-builder.services'
import type { NormalizedFile, UploadFile } from '../../types/form-builder.types'
import type { ResponseError } from '../../../types/response.types'
import { useMutation } from '@tanstack/react-query'

const useApiUploadFile = () => {
  return useMutation<UploadFile[], AxiosError<ResponseError>, NormalizedFile[]>({
    mutationFn: async (data: NormalizedFile[]) => {
      const formData = new FormData()

      data.forEach((file) => {
        formData.append('files[]', file.file as any)
      })
      const response = await uploadFileService(formData)
      return response.data.data
    }
  })
}

export default useApiUploadFile
