import { createServerFn } from '@tanstack/react-start'
import axios from 'axios'
import { useAppSession } from '@/utils/session'

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000/api/v1'

export const apiProxyFn = createServerFn({ method: 'POST' })
  .inputValidator(
    (data: {
      method: 'GET' | 'POST' | 'PATCH' | 'DELETE'
      path: string
      data?: unknown
      params?: Record<string, string | number | boolean | undefined>
    }) => data,
  )
  .handler(async ({ data: requestData }) => {
    const session = await useAppSession()
    const accessToken = session.data.accessToken

    if (!accessToken) {
      throw new Error('Unauthorized')
    }

    const response = await axios({
      method: requestData.method,
      url: `${API_BASE_URL}${requestData.path}`,
      headers: { Authorization: `Bearer ${accessToken}` },
      data: requestData.data,
      params: requestData.params,
    })

    return response.data.data
  })
