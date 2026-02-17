import { defineEventHandler } from 'h3'

/**
 * Catch-all API route handler for Nitro.
 *
 * This file handles all requests to /api/* that are not handled by
 * TanStack Start server functions. You can use this for custom Nitro
 * API routes if needed, or as a fallback handler.
 *
 * For most API calls, use the apiProxyFn server function in
 * src/server/api-proxy.ts instead.
 */
export default defineEventHandler((_event) => {
  return {
    message: 'API route not found',
    status: 404,
  }
})
