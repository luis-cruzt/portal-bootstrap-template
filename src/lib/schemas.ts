import { z } from 'zod'

export const loginSchema = z.object({
  phone: z
    .string()
    .min(1, 'Phone number is required')
    .regex(/^\+?[1-9]\d{1,14}$/, 'Please enter a valid phone number'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(100, 'Password must be less than 100 characters'),
})

export type LoginFormData = z.infer<typeof loginSchema>
