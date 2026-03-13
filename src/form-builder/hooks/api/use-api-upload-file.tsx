import { AxiosError } from 'axios'

import { uploadFileService } from '../../services/form-builder.services'
import type { NormalizedFile, UploadFile } from '../../types/form-builder.types'
import type { ResponseError } from '../../../types/response.types'
import { useSimpleMutation } from '@/lib/async-hooks'

const useApiUploadFile = () => {
  return useSimpleMutation<UploadFile[], NormalizedFile[], AxiosError<ResponseError>>({
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
