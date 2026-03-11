import { QueryClientProvider } from '@tanstack/react-query'
import { type PropsWithChildren } from 'react'
import { FormBuilderConfigProvider, type FormBuilderConfig } from '../config/form-builder-config'
import { queryClient } from '@/lib/react-query'

interface FormBuilderProviderProps extends PropsWithChildren {
  config: Partial<FormBuilderConfig>
}

export const FormBuilderProvider = ({ config, children }: FormBuilderProviderProps) => {
  return (
    <FormBuilderConfigProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </FormBuilderConfigProvider>
  )
}
