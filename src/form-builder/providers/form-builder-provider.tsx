import { type PropsWithChildren } from 'react'
import { FormBuilderConfigProvider, type FormBuilderConfig } from '../config/form-builder-config'
import { Toaster } from 'sonner'

interface FormBuilderProviderProps extends PropsWithChildren {
  config: Partial<FormBuilderConfig>
  queryClient?: unknown
  queryClientConfig?: unknown
}

export const FormBuilderProvider = ({
  config,
  queryClient: _queryClient,
  queryClientConfig: _queryClientConfig,
  children
}: FormBuilderProviderProps) => {
  return (
    <FormBuilderConfigProvider config={config}>
      {children}
      <Toaster />
    </FormBuilderConfigProvider>
  )
}
