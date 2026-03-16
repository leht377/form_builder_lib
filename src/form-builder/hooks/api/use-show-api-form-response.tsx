import { useSimpleQuery } from '@/lib/async-hooks'
import { showFormResponseService } from '../../services/form-builder.services'
interface Params {
  formId: string
  formResponseId: string
}
const useShowApiFormResponse = (params: Params) => {
  return useSimpleQuery({
    queryFn: async () => {
      const response = await showFormResponseService(params.formId, params.formResponseId)
      return response.data.data
    },
    enabled: Boolean(params.formId && params.formResponseId),
    deps: [params.formId, params.formResponseId]
  })
}

export default useShowApiFormResponse
