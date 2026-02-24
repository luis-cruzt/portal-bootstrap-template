import { createServerFn } from '@tanstack/react-start'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import type { LoginRequest, TokenPayload } from '@/types/auth'
import { useAppSession } from '@/utils/session'

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000/api/v1'

export const loginFn = createServerFn({ method: 'POST' })
  .inputValidator((data: LoginRequest) => data)
  .handler(async ({ data }) => {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, data)
    const { access_token } = response.data.data

    const payload = jwtDecode<TokenPayload>(access_token)
    const session = await useAppSession()

    await session.update({
      userId: payload.phone,
      accessToken: access_token,
      role: payload.role,
      phone: payload.phone,
    })

    return { success: true }
  })

export const logoutFn = createServerFn({ method: 'POST' }).handler(async () => {
  const session = await useAppSession()
  await session.clear()
  return { success: true }
})

export const getCurrentUserFn = createServerFn({ method: 'GET' }).handler(
  async () => {
    const session = await useAppSession()

    if (!session.data.userId || !session.data.accessToken) return null

    const payload = jwtDecode<TokenPayload>(session.data.accessToken)

    if (payload.exp * 1000 <= Date.now()) {
      await session.clear()
      return null
    }

    return {
      userId: session.data.userId,
      phone: session.data.phone,
      role: session.data.role,
    }
  },
)

export const hasRequiredRoleFn = createServerFn({ method: 'GET' }).handler(
  async () => {
    const session = await useAppSession()
    const role = session.data.role
    // ADMIN (2) or SUPPORT (4)
    return role === '2' || role === '4'
  },
)
