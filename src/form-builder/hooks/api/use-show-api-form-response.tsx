import { useQuery } from '@tanstack/react-query'
import { showFormResponseService } from '../../services/form-builder.services'
interface Params {
  formId: string
  formResponseId: string
}
const useShowApiFormResponse = (params: Params) => {
  return useQuery({
    queryKey: ['show-form-response', JSON.stringify(params)],
    queryFn: async () => {
      const response = await showFormResponseService(params.formId, params.formResponseId)
      return response.data.data
    },
    enabled: Boolean(params.formId && params.formResponseId)
  })
}

export default useShowApiFormResponse
