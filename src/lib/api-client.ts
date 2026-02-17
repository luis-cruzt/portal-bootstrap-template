import { apiProxyFn } from '@/server/api-proxy'
import type { RequestOptions } from '@/types/api'

const apiClient = {
  async get<T>(path: string, options?: RequestOptions): Promise<T> {
    return apiProxyFn({
      data: { method: 'GET', path, params: options?.params },
    }) as Promise<T>
  },

  async post<T>(
    path: string,
    data?: unknown,
    options?: RequestOptions,
  ): Promise<T> {
    return apiProxyFn({
      data: { method: 'POST', path, data, params: options?.params },
    }) as Promise<T>
  },

  async patch<T>(
    path: string,
    data?: unknown,
    options?: RequestOptions,
  ): Promise<T> {
    return apiProxyFn({
      data: { method: 'PATCH', path, data, params: options?.params },
    }) as Promise<T>
  },

  async delete<T>(path: string, options?: RequestOptions): Promise<T> {
    return apiProxyFn({
      data: { method: 'DELETE', path, params: options?.params },
    }) as Promise<T>
  },
}

export default apiClient
