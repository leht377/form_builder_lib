
import { AxiosError } from 'axios'
import { updateAnswerForEspecificFormResponse } from '../services/form-builder.services'
import type { UpdateAnswerRequest } from '../types/form-builder.types'
import type { ResponseError } from '@/types/response.types'
import { useSimpleMutation } from '@/lib/async-hooks'

const useUpdateAnswers = () => {
  return useSimpleMutation<any, UpdateAnswerRequest, AxiosError<ResponseError>>({
    mutationFn: async (data: UpdateAnswerRequest) => {
      await updateAnswerForEspecificFormResponse(data)
    }
  })
}
export default useUpdateAnswers
