import { AxiosError } from 'axios'
import { deleteSectionsService } from '../../services/form-builder.services'
import { useMutation } from '@tanstack/react-query'
import type { DeleteSectionRequest } from '../../types/form-builder.types'
import type { ResponseError } from '../../../types/response.types'

const useApiDeleteSection = () => {
  return useMutation<void, AxiosError<ResponseError>, DeleteSectionRequest>({
    mutationFn: async (data: DeleteSectionRequest) => {
      await deleteSectionsService(data)
    }
  })
}

export default useApiDeleteSection
