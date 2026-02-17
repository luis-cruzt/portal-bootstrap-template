import { describe, it, expect } from 'vitest'
import { loginSchema } from '@/lib/schemas'

describe('loginSchema', () => {
  it('accepts valid phone and password', () => {
    const result = loginSchema.safeParse({
      phone: '+12345678901',
      password: 'secretpassword',
    })
    expect(result.success).toBe(true)
  })

  it('rejects empty phone', () => {
    const result = loginSchema.safeParse({
      phone: '',
      password: 'secretpassword',
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].path[0]).toBe('phone')
    }
  })

  it('rejects short password', () => {
    const result = loginSchema.safeParse({
      phone: '+12345678901',
      password: '123',
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].path[0]).toBe('password')
    }
  })

  it('rejects missing fields', () => {
    const result = loginSchema.safeParse({})
    expect(result.success).toBe(false)
  })
})
