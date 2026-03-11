
const API_URL_ = import.meta.env.VITE_API_URL


export const API_URL = (service: string, version: string) => {
  return `${API_URL_}/${service}/api/${version}`
}
