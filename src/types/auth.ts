export interface LoginRequest {
  email?: string
  phone?: string
  password: string
}

export interface LoginResponse {
  data: {
    access_token: string
  }
  message?: string
}

export interface TokenPayload {
  sub: string
  phone: string
  role: string
  iat: number
  exp: number
}

export interface User {
  userId: string
  phone: string
  role: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}
