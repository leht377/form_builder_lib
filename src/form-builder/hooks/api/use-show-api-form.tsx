'use client'


import { AxiosError } from 'axios'
import type { ResponseError } from '../../../types/response.types'
import type { Form } from '../../types/form-builder.types'
import { showFormService } from '../../services/form-builder.services'
import { useSimpleQuery } from '@/lib/async-hooks'

export function useShowApiForm(id: string) {
  return useSimpleQuery<Form, AxiosError<ResponseError>>({
    queryFn: async () => {
      const response = await showFormService(id)
      return response.data.data
    },
    enabled: Boolean(id),
    deps: [id]
  })
}
