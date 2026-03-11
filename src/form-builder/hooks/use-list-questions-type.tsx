import { useQuery } from '@tanstack/react-query'
import { listQuestionTypesService } from '../services/form-builder.services'

const useListQuestionType = () => {
  // const { data, fetchData, isLoading, errors, meta } = useListGeneric<
  //   FormQuestionType,
  //   FilterTemplate
  // >({
  //   fetcher: (config) => listQuestionTypesService()
  // })

  // const getData = async (params: FilterTemplate) => {
  //   fetchData(params)
  // }

  return useQuery({
    queryKey: ['list-question-type'],
    queryFn: async () => {
      const response = await listQuestionTypesService()
      return response.data.data
    }
  })
}

export default useListQuestionType
