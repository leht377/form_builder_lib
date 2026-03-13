import { useSimpleQuery } from '@/lib/async-hooks'
import { verifyFormHaveAnswersService } from '../../services/form-builder.services'

const useApiVerifyFormHaveAnswers = (id: string) => {
  return useSimpleQuery({
    queryFn: async () => {
      const response = await verifyFormHaveAnswersService(id)
      return response.data.data
    },
    enabled: Boolean(id),
    deps: [id]
  })
}

export default useApiVerifyFormHaveAnswers
