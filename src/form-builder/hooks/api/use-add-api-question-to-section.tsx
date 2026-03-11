import type { ResponseError } from '../../../types/response.types'
import { addQuestionToFormService } from '../../services/form-builder.services'
import { AxiosError } from 'axios'
import type { AddQuestiontoFormRequets } from '../../types/form-builder.types'
import { useMutation } from '@tanstack/react-query'

const useAddApiQuestionToSection = () => {
  return useMutation<void, AxiosError<ResponseError>, AddQuestiontoFormRequets>({
    mutationFn: async (data: AddQuestiontoFormRequets) => {
      await addQuestionToFormService(data)
    }
  })
}

export default useAddApiQuestionToSection
