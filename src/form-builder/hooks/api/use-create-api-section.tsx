import type { ResponseError } from '../../../types/response.types'
import { createSectionService } from '../../services/form-builder.services'
import { AxiosError } from 'axios'
import { useSimpleMutation } from '@/lib/async-hooks'

const useCreateApiSection = () => {
  return useSimpleMutation<void, string, AxiosError<ResponseError>>({
    mutationFn: async (formId: string) => {
      await createSectionService(formId)
    }
  })
}
export default useCreateApiSection
