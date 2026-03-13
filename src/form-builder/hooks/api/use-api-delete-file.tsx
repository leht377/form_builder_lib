import { AxiosError } from 'axios'

import { deleteFileService } from '../../services/form-builder.services'
import type { ResponseError } from '../../../types/response.types'
import { useSimpleMutation } from '@/lib/async-hooks'

const useApiDeleteFile = () => {
  return useSimpleMutation<void, string, AxiosError<ResponseError>>({
    mutationFn: async (id: string) => {
      await deleteFileService(id)
    }
  })
}

export default useApiDeleteFile
