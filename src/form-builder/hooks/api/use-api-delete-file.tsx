import { AxiosError } from 'axios'

import { deleteFileService } from '../../services/form-builder.services'
import { useMutation } from '@tanstack/react-query'
import type { ResponseError } from '../../../types/response.types'

const useApiDeleteFile = () => {
  return useMutation<void, AxiosError<ResponseError>, string>({
    mutationFn: async (id: string) => {
      await deleteFileService(id)
    }
  })
}

export default useApiDeleteFile
