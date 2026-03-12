
import { AxiosError } from 'axios'
import { useMutation } from '@tanstack/react-query'
import { updateAnswerForEspecificFormResponse } from '../services/form-builder.services'
import type { UpdateAnswerRequest } from '../types/form-builder.types'
import type { ResponseError } from '@/types/response.types'

const useUpdateAnswers = () => {
  return useMutation<any, AxiosError<ResponseError>, UpdateAnswerRequest>({
    mutationFn: async (data: UpdateAnswerRequest) => {
      await updateAnswerForEspecificFormResponse(data)
    }
  })
}
export default useUpdateAnswers
