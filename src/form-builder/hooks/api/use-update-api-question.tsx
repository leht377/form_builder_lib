import { AxiosError } from 'axios'
import { updateQuestionService } from '../../services/form-builder.services'
import { useMutation } from '@tanstack/react-query'
import type { ResponseError } from '../../../types/response.types'
import type { UpdateQuestionRequest } from '../../types/form-builder.types'

const useUpdateApiQuestion = () => {
  return useMutation<void, AxiosError<ResponseError>, UpdateQuestionRequest>({
    mutationFn: async (data: UpdateQuestionRequest) => {
      await updateQuestionService(data)
    }
  })
}

export default useUpdateApiQuestion
