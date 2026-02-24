import type { LoginRequest } from '@/types/auth'
import { getCurrentUserFn, loginFn, logoutFn } from '@/server/auth'

export const authService = {
  /**
   * Authenticate the user with phone and password.
   * Session is managed server-side.
   */
  async login(credentials: LoginRequest) {
    return loginFn({ data: credentials })
  },

  /**
   * Clear the server-side session and log out.
   */
  async logout() {
    return logoutFn()
  },

  /**
   * Get the currently authenticated user from the server session.
   * Returns null if not authenticated or session has expired.
   */
  async getCurrentUser() {
    return getCurrentUserFn()
  },
}
