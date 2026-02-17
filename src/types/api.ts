export interface ApiResponse<T = unknown> {
  data: T
  message?: string
  status?: number
}

export interface PaginatedResponse<T = unknown> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface ApiError {
  message: string
  status?: number
  code?: string
}

export interface RequestOptions {
  params?: Record<string, string | number | boolean | undefined>
  headers?: Record<string, string>
}
