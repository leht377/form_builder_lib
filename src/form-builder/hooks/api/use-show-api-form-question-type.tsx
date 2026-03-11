'use client'

import { useState, useEffect, useCallback } from 'react'
import { showQuestionTypeService } from '../../services/form-builder.services'
import { AxiosError } from 'axios'
import type { ResponseError } from '../../../types/response.types'
import type { FormQuestionType } from '../../types/form-builder.types'

export function useShowApiQuestionType(id: string) {
  const [data, setData] = useState<FormQuestionType | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<AxiosError<ResponseError> | null>(null)

  const fetchForm = useCallback(async () => {
    if (!id) return
    try {
      setLoading(true)
      setError(null)

      const response = await showQuestionTypeService(id)
      setData(response.data.data)
    } catch (err: any) {
      setError(err ?? 'Error desconocido')
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    fetchForm()
  }, [fetchForm])

  return {
    data,
    loading,
    error,
    refetch: fetchForm
  }
}
