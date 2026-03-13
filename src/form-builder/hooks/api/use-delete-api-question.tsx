import { AxiosError } from 'axios'
import { deleteQuestionService } from '../../services/form-builder.services'
import type { DeleteQuestionRequest } from '../../types/form-builder.types'
import type { ResponseError } from '../../../types/response.types'
import { useSimpleMutation } from '@/lib/async-hooks'

const useDeleteApiQuestion = () => {
  return useSimpleMutation<void, DeleteQuestionRequest, AxiosError<ResponseError>>({
    mutationFn: async (data: DeleteQuestionRequest) => {
      await deleteQuestionService(data)
    }
  })
}

export default useDeleteApiQuestion
