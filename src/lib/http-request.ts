import { type AxiosRequestConfig, type AxiosResponse, type Method } from 'axios'
import axiosInstance from './axios-instance'
import type { ResponseAPI } from '../types/response.types'

const convertBooleanParamsToNumber = <T extends Record<string, unknown>>(
  params: T
): Record<string, unknown> => {
  return Object.entries(params).reduce((acc, [key, value]) => {
    acc[key] = typeof value === 'boolean' ? Number(value) : value
    return acc
  }, {} as Record<string, unknown>)
}
interface HttpRequestProps extends Omit<AxiosRequestConfig, 'data' | 'params' | 'url' | 'method'> {
  data?: any
  url: string
  params?: Record<string, any>
  method: Method
  headers?: Record<string, string>
}

export const httpRequest = async <TResponse extends Record<string, any>>({
  data,
  url,
  params,
  method,
  headers,
  ...rest
}: HttpRequestProps): Promise<AxiosResponse<ResponseAPI<TResponse>>> => {
  const token =  "token" // storage.get(ACCESS_TOKEN) as string

  const config: AxiosRequestConfig = {
    ...rest,
    url,
    method,
    data,
    params: params ? convertBooleanParamsToNumber(params) : undefined,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers // Permite override de encabezados si es necesario
    }
  }

  return axiosInstance<ResponseAPI<TResponse>>(config)
}
