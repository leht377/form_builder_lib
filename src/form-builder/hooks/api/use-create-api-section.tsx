import { useMutation } from '@tanstack/react-query'
import type { ResponseError } from '../../../types/response.types'
import { createSectionService } from '../../services/form-builder.services'
import { AxiosError } from 'axios'

const useCreateApiSection = () => {
  return useMutation<void, AxiosError<ResponseError>, string>({
    mutationFn: async (formId: string) => {
      await createSectionService(formId)
    }
  })
}
export default useCreateApiSection
