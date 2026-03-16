import { type AxiosRequestConfig, type AxiosResponse, type Method } from 'axios';
import type { ResponseAPI } from '../types/response.types';
interface HttpRequestProps extends Omit<AxiosRequestConfig, 'data' | 'params' | 'url' | 'method'> {
    data?: any;
    url: string;
    params?: Record<string, any>;
    method: Method;
    headers?: Record<string, string>;
}
export declare const httpRequest: <TResponse extends Record<string, any>>({ data, url, params, method, headers, ...rest }: HttpRequestProps) => Promise<AxiosResponse<ResponseAPI<TResponse>>>;
export {};
//# sourceMappingURL=http-request.d.ts.map