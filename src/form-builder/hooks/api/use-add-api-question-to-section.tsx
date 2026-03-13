import type { ResponseError } from '../../../types/response.types'
import { addQuestionToFormService } from '../../services/form-builder.services'
import { AxiosError } from 'axios'
import type { AddQuestiontoFormRequets } from '../../types/form-builder.types'
import { useSimpleMutation } from '@/lib/async-hooks'

const useAddApiQuestionToSection = () => {
  return useSimpleMutation<void, AddQuestiontoFormRequets, AxiosError<ResponseError>>({
    mutationFn: async (data: AddQuestiontoFormRequets) => {
      await addQuestionToFormService(data)
    }
  })
}

export default useAddApiQuestionToSection
