import { type PropsWithChildren } from 'react'
import { FormBuilderConfigProvider, type FormBuilderConfig } from '../config/form-builder-config'
import { Toaster } from 'sonner'
import '../../index.css'

interface FormBuilderProviderProps extends PropsWithChildren {
  config: Partial<FormBuilderConfig>
  queryClient?: unknown
  queryClientConfig?: unknown
}

export const FormBuilderProvider = ({
  config,
  children
}: FormBuilderProviderProps) => {
  return (
    <FormBuilderConfigProvider config={config}>
      {children}
      <Toaster />
    </FormBuilderConfigProvider>
  )
}
