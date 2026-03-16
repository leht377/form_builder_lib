import type { ResponseError } from '../../../types/response.types'
import { reorderSectionsService } from '../../services/form-builder.services'
import { AxiosError } from 'axios'
import type { ReorderSectionRequest } from '../../types/form-builder.types'
import { useSimpleMutation } from '@/lib/async-hooks'

const useReorderApiSection = () => {
  return useSimpleMutation<void, ReorderSectionRequest, AxiosError<ResponseError>>({
    mutationFn: async (data: ReorderSectionRequest) => {
      await reorderSectionsService(data)
    }
  })
}

export default useReorderApiSection
