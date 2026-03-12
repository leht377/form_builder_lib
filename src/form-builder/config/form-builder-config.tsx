import { createContext, useContext, useMemo, type PropsWithChildren } from 'react'

export interface FormBuilderConfig {
  apiBaseUrl: string
}

const DEFAULT_CONFIG: FormBuilderConfig = {
  apiBaseUrl: ''
}

let runtimeConfig: FormBuilderConfig = DEFAULT_CONFIG

const FormBuilderConfigContext = createContext<FormBuilderConfig>(DEFAULT_CONFIG)

export const configureFormBuilder = (config: Partial<FormBuilderConfig>) => {
  runtimeConfig = {
    ...runtimeConfig,
    ...config
  }
}

export const getFormBuilderConfig = () => runtimeConfig

interface FormBuilderConfigProviderProps extends PropsWithChildren {
  config: Partial<FormBuilderConfig>
}

export const FormBuilderConfigProvider = ({
  config,
  children
}: FormBuilderConfigProviderProps) => {
  const mergedConfig = useMemo(
    () => ({
      ...runtimeConfig,
      ...config
    }),
    [config]
  )

  runtimeConfig = mergedConfig

  return (
    <FormBuilderConfigContext.Provider value={mergedConfig}>
      {children}
    </FormBuilderConfigContext.Provider>
  )
}

export const useFormBuilderConfig = () => {
  return useContext(FormBuilderConfigContext)
}