import { createFileRoute, useRouter } from '@tanstack/react-router'
import { useState } from 'react'
import type {LoginFormValues} from '@/lib/schemas';
import { Button } from '@/components/ui/button'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import {  loginSchema } from '@/lib/schemas'
import { loginFn } from '@/server/auth'

export const Route = createFileRoute('/login')({
  component: LoginPage,
})

function PortalMark({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <rect width="24" height="24" rx="6" fill="currentColor" opacity="0.15" />
      <path
        d="M7 12.5L10.5 16L17 8"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function EyeIcon({ open }: { open: boolean }) {
  if (!open) {
    return (
      <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
        <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
        <line x1="1" y1="1" x2="23" y2="23" />
      </svg>
    )
  }
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

function AlertIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mt-px shrink-0"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  )
}

function SpinnerIcon() {
  return (
    <svg
      className="animate-spin"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    >
      <circle cx="12" cy="12" r="9" opacity="0.2" />
      <path d="M21 12a9 9 0 00-9-9" />
    </svg>
  )
}

const FEATURES = [
  {
    label: 'Ticket Management',
    desc: 'Track and resolve issues from end to end',
  },
  {
    label: 'Team Collaboration',
    desc: 'Shared queues and seamless handoffs',
  },
  {
    label: 'Real-time Analytics',
    desc: 'SLA monitoring and performance insights',
  },
]

function BrandPanel() {
  return (
    <div
      className="hidden lg:flex lg:w-[46%] xl:w-[42%] relative overflow-hidden flex-col"
      style={{ background: 'oklch(0.155 0.048 254)' }}
    >
      {/* Grid texture */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: [
            'linear-gradient(oklch(0.55 0.12 254 / 0.18) 1px, transparent 1px)',
            'linear-gradient(90deg, oklch(0.55 0.12 254 / 0.18) 1px, transparent 1px)',
          ].join(', '),
          backgroundSize: '52px 52px',
        }}
      />
      {/* Radial glow */}
      <div
        className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 rounded-full"
        style={{
          background:
            'radial-gradient(circle, oklch(0.62 0.19 254 / 0.18) 0%, transparent 70%)',
        }}
      />
      <div
        className="pointer-events-none absolute -bottom-16 -right-16 w-72 h-72 rounded-full"
        style={{
          background:
            'radial-gradient(circle, oklch(0.5 0.16 280 / 0.14) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 flex flex-col h-full p-12 xl:p-16">
        {/* Wordmark */}
        <div className="flex items-center gap-2.5">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center text-white"
            style={{ background: 'oklch(0.62 0.19 254)' }}
          >
            <PortalMark size={20} />
          </div>
          <span
            className="font-semibold text-base tracking-tight"
            style={{ color: 'oklch(0.92 0.02 254)' }}
          >
            Portal
          </span>
        </div>

        {/* Headline */}
        <div className="mt-auto mb-auto pt-24">
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ color: 'oklch(0.62 0.19 254)' }}
          >
            Support Infrastructure
          </p>
          <h1
            className="text-4xl xl:text-[2.6rem] font-bold leading-[1.1] mb-5"
            style={{ color: 'oklch(0.96 0.01 254)' }}
          >
            One platform.
            <br />
            Every customer
            <br />
            conversation.
          </h1>
          <p
            className="text-sm leading-relaxed max-w-xs"
            style={{ color: 'oklch(0.62 0.1 254)' }}
          >
            Unify your support operations—ticket triage, escalations, and
            resolution—inside a single, fast portal.
          </p>
        </div>

        {/* Feature list */}
        <ul className="space-y-3.5 mt-auto">
          {FEATURES.map((f) => (
            <li key={f.label} className="flex items-start gap-3">
              <div
                className="mt-0.5 w-4 h-4 rounded flex items-center justify-center shrink-0"
                style={{ background: 'oklch(0.62 0.19 254 / 0.2)' }}
              >
                <svg
                  width="8"
                  height="8"
                  viewBox="0 0 10 10"
                  fill="none"
                  stroke="oklch(0.72 0.18 254)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2 5.5L4 7.5L8 3" />
                </svg>
              </div>
              <div>
                <span
                  className="text-sm font-medium"
                  style={{ color: 'oklch(0.88 0.02 254)' }}
                >
                  {f.label}
                </span>
                <span
                  className="text-sm"
                  style={{ color: 'oklch(0.6 0.07 254)' }}
                >
                  {' '}
                  — {f.desc}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function LoginPage() {
  const [loginMode, setLoginMode] = useState<'email' | 'phone'>('email')
  const [formData, setFormData] = useState<LoginFormValues>({
    email: '',
    phone: '',
    password: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
      const cleanPayload: {
        email?: string
        phone?: string
        password: string
      } = {
        password: formData.password,
      }
      if (loginMode === 'email' && formData.email) {
        cleanPayload.email = formData.email
      } else if (loginMode === 'phone' && formData.phone) {
        cleanPayload.phone = formData.phone
      }

      await loginFn({ data: cleanPayload })
      await router.navigate({ to: '/dashboard' })
    } catch {
      setError('Invalid credentials. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-svh flex bg-background">
      <BrandPanel />

      {/* Form panel */}
      <div className="flex flex-1 flex-col items-center justify-center p-6 md:p-10">
        {/* Mobile wordmark */}
        <div className="flex items-center gap-2 mb-10 lg:hidden self-start">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-primary text-primary-foreground">
            <PortalMark size={18} />
          </div>
          <span className="font-semibold text-sm">Portal</span>
        </div>

        <div className="w-full max-w-85">
          {/* Heading */}
          <div className="mb-7">
            <h2 className="text-2xl font-bold tracking-tight mb-1">
              Welcome back
            </h2>
            <p className="text-muted-foreground text-sm">
              Sign in to access the support portal
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <FieldGroup>
              {/* Segmented toggle */}
              <div className="relative flex bg-muted rounded-lg p-0.75 mb-1">
                {/* Sliding indicator */}
                <span
                  className="absolute top-0.75 bottom-0.75 rounded-md bg-background shadow-sm transition-transform duration-200 ease-in-out"
                  style={{
                    width: 'calc(50% - 3px)',
                    transform:
                      loginMode === 'phone'
                        ? 'translateX(calc(100% + 2px))'
                        : 'translateX(0)',
                  }}
                  aria-hidden="true"
                />
                {(['email', 'phone'] as const).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setLoginMode(mode)}
                    className={cn(
                      'relative z-10 flex-1 py-1.5 text-sm font-medium rounded-md transition-colors duration-150 capitalize',
                      loginMode === mode
                        ? 'text-foreground'
                        : 'text-muted-foreground hover:text-foreground/70',
                    )}
                  >
                    {mode}
                  </button>
                ))}
              </div>

              {loginMode === 'email' ? (
                <Field>
                  <FieldLabel htmlFor="email">Email address</FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@company.com"
                    value={formData.email ?? ''}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </Field>
              ) : (
                <Field>
                  <FieldLabel htmlFor="phone">Phone number</FieldLabel>
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
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className="pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={
                      showPassword ? 'Hide password' : 'Show password'
                    }
                    tabIndex={-1}
                  >
                    <EyeIcon open={showPassword} />
                  </button>
                </div>
              </Field>

              {error && (
                <div className="flex items-start gap-2 text-sm text-destructive bg-destructive/5 border border-destructive/20 rounded-lg px-3 py-2.5">
                  <AlertIcon />
                  <span>{error}</span>
                </div>
              )}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <span className="flex items-center gap-2">
                    <SpinnerIcon />
                    Signing in…
                  </span>
                ) : (
                  'Sign In'
                )}
              </Button>
            </FieldGroup>
          </form>
        </div>
      </div>
    </div>
  )
}
