import { useQuery } from '@tanstack/react-query'
import { verifyFormHaveAnswersService } from '../../services/form-builder.services'

const useApiVerifyFormHaveAnswers = (id: string) => {
  return useQuery({
    queryKey: ['verify-form-have-answers', id],
    queryFn: async () => {
      const response = await verifyFormHaveAnswersService(id)
      return response.data.data
    },
    enabled: Boolean(id)
  })
}

export default useApiVerifyFormHaveAnswers
