import type { ResponseError } from '../../../types/response.types'
import { reorderQuestionService } from '../../services/form-builder.services'
import { AxiosError } from 'axios'
import type { ReorderQuestionRequest } from '../../types/form-builder.types'
import { useSimpleMutation } from '@/lib/async-hooks'

const useReorderApiQuestion = () => {
  return useSimpleMutation<void, ReorderQuestionRequest, AxiosError<ResponseError>>({
    mutationFn: async (data: ReorderQuestionRequest) => {
      await reorderQuestionService(data)
    }
  })
}

export default useReorderApiQuestion
