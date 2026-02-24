import { beforeEach, describe, expect, it, vi } from 'vitest'

import { authService } from '@/services/auth.service'
import { getCurrentUserFn, loginFn, logoutFn } from '@/server/auth'

// Mock the server functions before importing the service
vi.mock('@/server/auth', () => ({
  loginFn: vi.fn(),
  logoutFn: vi.fn(),
  getCurrentUserFn: vi.fn(),
}))

describe('authService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('login', () => {
    it('calls loginFn with credentials', async () => {
      const mockResponse = { success: true } as const
      vi.mocked(loginFn).mockResolvedValue(mockResponse)

      const credentials = { phone: '+12345678901', password: 'password123' }
      const result = await authService.login(credentials)

      expect(loginFn).toHaveBeenCalledWith({ data: credentials })
      expect(result).toEqual(mockResponse)
    })
  })

  describe('logout', () => {
    it('calls logoutFn', async () => {
      const mockResponse = { success: true } as const
      vi.mocked(logoutFn).mockResolvedValue(mockResponse)

      const result = await authService.logout()

      expect(logoutFn).toHaveBeenCalled()
      expect(result).toEqual(mockResponse)
    })
  })

  describe('getCurrentUser', () => {
    it('returns user when authenticated', async () => {
      const mockUser = { userId: '123', phone: '+12345678901', role: '2' }
      vi.mocked(getCurrentUserFn).mockResolvedValue(mockUser)

      const result = await authService.getCurrentUser()

      expect(getCurrentUserFn).toHaveBeenCalled()
      expect(result).toEqual(mockUser)
    })

    it('returns null when not authenticated', async () => {
      vi.mocked(getCurrentUserFn).mockResolvedValue(null)

      const result = await authService.getCurrentUser()

      expect(result).toBeNull()
    })
  })
})
