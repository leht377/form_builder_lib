import { AxiosError } from 'axios'
import { deleteSectionsService } from '../../services/form-builder.services'
import type { DeleteSectionRequest } from '../../types/form-builder.types'
import type { ResponseError } from '../../../types/response.types'
import { useSimpleMutation } from '@/lib/async-hooks'

const useApiDeleteSection = () => {
  return useSimpleMutation<void, DeleteSectionRequest, AxiosError<ResponseError>>({
    mutationFn: async (data: DeleteSectionRequest) => {
      await deleteSectionsService(data)
    }
  })
}

export default useApiDeleteSection
