import { z } from 'zod'

export const loginSchema = z
  .object({
    email: z.string().email('Please enter a valid email').optional(),
    phone: z
      .string()
      .regex(/^\+?[1-9]\d{1,14}$/, 'Please enter a valid phone number')
      .optional(),
    password: z
      .string()
      .min(6, 'Password must be at least 6 characters')
      .max(100, 'Password must be less than 100 characters'),
  })
  .refine((data) => data.email || data.phone, {
    message: 'Either email or phone is required',
  })

export type LoginFormData = z.infer<typeof loginSchema>
export type LoginFormValues = {
  email?: string
  phone?: string
  password: string
}
