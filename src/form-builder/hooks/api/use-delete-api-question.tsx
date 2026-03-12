import { AxiosError } from 'axios'
import { deleteQuestionService } from '../../services/form-builder.services'
import { useMutation } from '@tanstack/react-query'
import type { DeleteQuestionRequest } from '../../types/form-builder.types'
import type { ResponseError } from '../../../types/response.types'

const useDeleteApiQuestion = () => {
  return useMutation<void, AxiosError<ResponseError>, DeleteQuestionRequest>({
    mutationFn: async (data: DeleteQuestionRequest) => {
      await deleteQuestionService(data)
    }
  })
}

export default useDeleteApiQuestion
