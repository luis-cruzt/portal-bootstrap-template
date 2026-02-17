import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { loginSchema, type LoginFormValues } from '@/lib/schemas'
import { loginFn } from '@/server/auth'
import { createFileRoute, useRouter } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/login')({
  component: LoginPage,
})

function LoginPage() {
  const [loginMode, setLoginMode] = useState<'email' | 'phone'>('email')
  const [formData, setFormData] = useState<LoginFormValues>({
    email: '',
    phone: '',
    password: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const payload = {
      ...formData,
      email: loginMode === 'email' ? formData.email : undefined,
      phone: loginMode === 'phone' ? formData.phone : undefined,
    }

    const result = loginSchema.safeParse(payload)
    if (!result.success) {
      setError(result.error.issues[0]?.message ?? 'Validation error')
      return
    }

    setLoading(true)
    
    try {
      const cleanPayload: Record<string, string> = {
        password: formData.password,
      }
      if (loginMode === 'email' && formData.email) {
        cleanPayload.email = formData.email
      } else if (loginMode === 'phone' && formData.phone) {
        cleanPayload.phone = formData.phone
      }

      // Use server function for login
      // Note: On success, this throws a redirect (doesn't return)
      // On error, it returns an object with error property
      const response = await loginFn({
        data: cleanPayload as { email?: string; phone?: string; password: string },
      })
      
      // If we reach here, there was an error (successful login redirects)
      if (response?.error) {
        setError(response.error)
        setLoading(false)
      }

      if (response?.success) {
        await router.navigate({ to: '/dashboard' })
      }
    } catch (err) {
      // The redirect throws, but we shouldn't catch it
      // Just let it propagate - TanStack Router will handle it
      throw err
    }
  }

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
         <a href="#" className="flex items-center gap-2 self-center font-medium">
          Portal Bootstrap Template
        </a>
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader className="text-center">
              <CardTitle>Welcome back</CardTitle>
              <CardDescription>
                Sign in to access the support portal
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <FieldGroup>
                  <div className="flex gap-2 mb-2">
                    <Button
                      type="button"
                      variant={loginMode === 'email' ? 'default' : 'outline'}
                      size="sm"
                      className="flex-1"
                      onClick={() => setLoginMode('email')}
                    >
                      Email
                    </Button>
                    <Button
                      type="button"
                      variant={loginMode === 'phone' ? 'default' : 'outline'}
                      size="sm"
                      className="flex-1"
                      onClick={() => setLoginMode('phone')}
                    >
                      Phone
                    </Button>
                  </div>

                  {loginMode === 'email' ? (
                    <Field>
                      <FieldLabel htmlFor="email">Email</FieldLabel>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email ?? ''}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        required
                      />
                    </Field>
                  ) : (
                    <Field>
                      <FieldLabel htmlFor="phone">Phone</FieldLabel>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+5999XXXXXXX"
                        value={formData.phone ?? ''}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        required
                      />
                    </Field>
                  )}

                  <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      required
                    />
                  </Field>

                  {error && <p className="text-sm text-destructive">{error}</p>}

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? 'Signing in...' : 'Sign In'}
                  </Button>
                </FieldGroup>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
