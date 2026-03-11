'use client'


import { AxiosError } from 'axios'
import type { ResponseError } from '../../../types/response.types'
import type { Form } from '../../types/form-builder.types'
import { useQuery } from '@tanstack/react-query'
import { showFormService } from '../../services/form-builder.services'

export function useShowApiForm(id: string) {
  return useQuery<any, AxiosError<ResponseError>, Form>({
    queryKey: ['show-api-form', id],
    queryFn: async () => {
      const response = await showFormService(id)
      return response.data.data
    },
    enabled: Boolean(id)
  })
}
