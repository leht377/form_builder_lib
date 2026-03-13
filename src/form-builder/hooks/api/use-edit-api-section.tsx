import { updateSectionsService } from '../../services/form-builder.services'

import { AxiosError } from 'axios'
import type { UpdateSectionRequets } from '../../types/form-builder.types'
import type { ResponseError } from '../../../types/response.types'
import { useSimpleMutation } from '@/lib/async-hooks'

const useEditApiSection = () => {
  return useSimpleMutation<void, UpdateSectionRequets, AxiosError<ResponseError>>({
    mutationFn: async (data: UpdateSectionRequets) => {
      await updateSectionsService(data)
    }
  })
}

export default useEditApiSection
