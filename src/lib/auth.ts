/**
 * @deprecated This file is kept for backward compatibility only.
 * All authentication is now handled server-side via src/server/auth.ts.
 * Use server functions (loginFn, logoutFn, getCurrentUserFn) instead.
 */

export { loginFn, logoutFn, getCurrentUserFn } from '@/server/auth'
