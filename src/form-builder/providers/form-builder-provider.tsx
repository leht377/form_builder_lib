import { QueryClient, QueryClientProvider, type QueryClientConfig } from '@tanstack/react-query'
import { type PropsWithChildren, useState } from 'react'
import { FormBuilderConfigProvider, type FormBuilderConfig } from '../config/form-builder-config'
import { Toaster } from 'sonner'

interface FormBuilderProviderProps extends PropsWithChildren {
  config: Partial<FormBuilderConfig>
  queryClient?: QueryClient
  queryClientConfig?: QueryClientConfig
}

export const FormBuilderProvider = ({
  config,
  queryClient,
  queryClientConfig,
  children
}: FormBuilderProviderProps) => {
  const [internalQueryClient] = useState(() => new QueryClient(queryClientConfig))
  const resolvedQueryClient = queryClient || internalQueryClient

  return (
    <FormBuilderConfigProvider config={config}>
      <QueryClientProvider client={resolvedQueryClient}>{children}</QueryClientProvider>
      <Toaster />
    </FormBuilderConfigProvider>
  )
}
