import type { ResponseError } from '../../../types/response.types'
import { reorderSectionsService } from '../../services/form-builder.services'
import { AxiosError } from 'axios'
import type { ReorderSectionRequest } from '../../types/form-builder.types'
import { useMutation } from '@tanstack/react-query'

const useReorderApiSection = () => {
  return useMutation<void, AxiosError<ResponseError>, ReorderSectionRequest>({
    mutationFn: async (data: ReorderSectionRequest) => {
      await reorderSectionsService(data)
    }
  })
}

export default useReorderApiSection
