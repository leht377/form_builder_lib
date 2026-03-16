import { duplicateFormService } from '@/form-builder/services/form-builder.services'
import type { Form } from '@/form-builder/types/form-builder.types'
import type { DuplicateFormPayload, ResponseError } from '@/types/response.types'
import { useSimpleMutation } from '@/lib/async-hooks'
import type { AxiosError } from 'axios'

const useApiDuplicateForm = () => {
  return useSimpleMutation<Form, DuplicateFormPayload, AxiosError<ResponseError>>({
    mutationFn: async (data: DuplicateFormPayload) => {
      const r = await duplicateFormService(data.id, data)
      return r.data.data
    }
  })
}

export default useApiDuplicateForm
