import type { ResponseError } from '../../../types/response.types'
import { reorderQuestionService } from '../../services/form-builder.services'
import { AxiosError } from 'axios'
import type { ReorderQuestionRequest } from '../../types/form-builder.types'
import { useMutation } from '@tanstack/react-query'

const useReorderApiQuestion = () => {
  return useMutation<void, AxiosError<ResponseError>, ReorderQuestionRequest>({
    mutationFn: async (data: ReorderQuestionRequest) => {
      await reorderQuestionService(data)
    }
  })
}

export default useReorderApiQuestion
