import { useMutation } from '@tanstack/react-query'
import { updateSectionsService } from '../../services/form-builder.services'

import { AxiosError } from 'axios'
import type { UpdateSectionRequets } from '../../types/form-builder.types'
import type { ResponseError } from '../../../types/response.types'

const useEditApiSection = () => {
  return useMutation<void, AxiosError<ResponseError>, UpdateSectionRequets>({
    mutationFn: async (data: UpdateSectionRequets) => {
      await updateSectionsService(data)
    }
  })
}

export default useEditApiSection
