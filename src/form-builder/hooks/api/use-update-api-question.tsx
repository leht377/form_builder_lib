import { AxiosError } from 'axios'
import { updateQuestionService } from '../../services/form-builder.services'
import type { ResponseError } from '../../../types/response.types'
import type { UpdateQuestionRequest } from '../../types/form-builder.types'
import { useSimpleMutation } from '@/lib/async-hooks'

const useUpdateApiQuestion = () => {
  return useSimpleMutation<void, UpdateQuestionRequest, AxiosError<ResponseError>>({
    mutationFn: async (data: UpdateQuestionRequest) => {
      await updateQuestionService(data)
    }
  })
}

export default useUpdateApiQuestion
