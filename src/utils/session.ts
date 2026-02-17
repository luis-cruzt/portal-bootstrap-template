import { useSession } from '@tanstack/react-start/server'

export type SessionData = {
  userId?: string
  accessToken?: string
  role?: string
  phone?: string
}

export function useAppSession() {
  return useSession<SessionData>({
    name: 'app-session',
    password: process.env.SESSION_SECRET || '',
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      httpOnly: true,
      maxAge: 20 * 60, // 20 minutes
    },
  })
}
