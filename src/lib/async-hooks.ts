import { useCallback, useEffect, useRef, useState } from 'react'

export interface RefetchResult<TData, TError> {
  data?: TData
  error?: TError
}

interface UseSimpleQueryOptions<TData, TError> {
  queryFn: () => Promise<TData>
  enabled?: boolean
  deps?: unknown[]
  onSuccess?: (data: TData) => void
  onError?: (error: TError) => void
}

interface UseSimpleMutationOptions<TData, TVariables> {
  mutationFn: (variables: TVariables) => Promise<TData>
}

export interface MutationCallbacks<TData, TError> {
  onSuccess?: (data: TData) => void
  onError?: (error: TError) => void
}

export const useSimpleQuery = <TData, TError = Error>({
  queryFn,
  enabled = true,
  deps = [],
  onSuccess,
  onError
}: UseSimpleQueryOptions<TData, TError>) => {
  const [data, setData] = useState<TData | undefined>(undefined)
  const [error, setError] = useState<TError | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(enabled)
  const queryFnRef = useRef(queryFn)
  const onSuccessRef = useRef(onSuccess)
  const onErrorRef = useRef(onError)

  useEffect(() => {
    queryFnRef.current = queryFn
    onSuccessRef.current = onSuccess
    onErrorRef.current = onError
  }, [queryFn, onSuccess, onError])

  const refetch = useCallback(async (): Promise<RefetchResult<TData, TError>> => {
    setIsLoading(true)
    setError(null)

    try {
      const nextData = await queryFnRef.current()
      setData(nextData)
      onSuccessRef.current?.(nextData)
      return { data: nextData }
    } catch (err) {
      const normalizedError = err as TError
      setError(normalizedError)
      onErrorRef.current?.(normalizedError)
      return { error: normalizedError }
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!enabled) {
      setIsLoading(false)
      return
    }

    void refetch()
  }, [enabled, ...deps])

  return {
    data,
    error,
    isLoading,
    refetch
  }
}

export const useSimpleMutation = <TData, TVariables, TError = Error>({
  mutationFn
}: UseSimpleMutationOptions<TData, TVariables>) => {
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState<TError | null>(null)

  const mutateAsync = useCallback(
    async (
      variables: TVariables,
      callbacks?: MutationCallbacks<TData, TError>
    ): Promise<TData> => {
      setIsPending(true)
      setError(null)

      try {
        const response = await mutationFn(variables)
        callbacks?.onSuccess?.(response)
        return response
      } catch (err) {
        const normalizedError = err as TError
        setError(normalizedError)
        callbacks?.onError?.(normalizedError)
        throw normalizedError
      } finally {
        setIsPending(false)
      }
    },
    [mutationFn]
  )

  const mutate = useCallback(
    (variables: TVariables, callbacks?: MutationCallbacks<TData, TError>) => {
      void mutateAsync(variables, callbacks).catch(() => {
        // Error is exposed via state and callback.
      })
    },
    [mutateAsync]
  )

  return {
    mutate,
    mutateAsync,
    isPending,
    error
  }
}
