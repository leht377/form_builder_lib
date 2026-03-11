
import { getFormBuilderConfig } from '@/form-builder/config/form-builder-config'


export const API_URL = (service: string, version: string) => {
  const config = getFormBuilderConfig()
  const baseApiUrl = config.apiBaseUrl || import.meta.env.VITE_API_URL || ''
  const normalizedBaseUrl = baseApiUrl.replace(/\/$/, '')

  return `${normalizedBaseUrl}/${service}/api/${version}`
}
