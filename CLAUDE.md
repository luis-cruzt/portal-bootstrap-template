# CLAUDE.md

Guidelines for working in this codebase.

## Commands

```bash
npm run dev          # dev server on :3001
npm test             # run tests once
npm run test:watch   # watch mode
npm run check        # prettier --write + eslint --fix
npm run build        # production build
```

## Architecture

### Server-side auth — non-negotiable

All authentication is handled in `src/server/auth.ts` via `createServerFn`. **Never** move token handling to the client.

- `loginFn` — calls backend, decodes JWT, writes to HTTP-only session cookie
- `logoutFn` — clears the session cookie
- `getCurrentUserFn` — reads session, validates token expiry, returns user or null
- `hasRequiredRoleFn` — checks role from session (ADMIN=`"2"`, SUPPORT=`"4"`)

Session config lives in `src/utils/session.ts`. Cookie is `httpOnly`, `sameSite: lax`, expires in 20 min.

### API proxy pattern

The browser never calls the backend directly.

```
Component → apiClient.get('/path') → apiProxyFn (server fn) → backend API
```

- `src/server/api-proxy.ts` — server function that reads the session, injects `Authorization: Bearer <token>`, forwards the request
- `src/lib/api-client.ts` — thin wrapper; `get`, `post`, `patch`, `delete` methods that call `apiProxyFn`

When making new API calls, always use `apiClient` from `@/lib/api-client`, never `axios` or `fetch` directly from a component or service.

### File-based routing

Routes live in `src/routes/`. TanStack Router auto-generates `src/routeTree.gen.ts` — don't edit that file by hand.

| Convention | Meaning |
|---|---|
| `__root.tsx` | Root layout (providers, HTML shell) |
| `_authenticated.tsx` | Layout route; `beforeLoad` enforces auth + role |
| `_authenticated/` | All files here are protected automatically |
| `index.tsx` | Handles `/`, redirects based on auth state |
| `login.tsx` | Public login page |

When adding a protected page: create `src/routes/_authenticated/<name>.tsx`. No extra auth wiring needed.

### State management

- **Server state** (API data) → TanStack Query via `apiClient`
- **UI/local state** → React `useState` / `useReducer`
- No global client-side state store

Query key conventions follow the factory pattern — see `src/hooks/use-support-queries.ts` as the reference:

```typescript
const fooKeys = {
  all: ['foo'] as const,
  list: () => [...fooKeys.all, 'list'] as const,
  detail: (id: string) => [...fooKeys.list(), id] as const,
}
```

## Code Conventions

### TypeScript

- Strict mode is on — no `any`, no `@ts-ignore`
- `noUnusedLocals` and `noUnusedParameters` are enforced — remove unused code, don't prefix with `_`
- Path alias: `@/` maps to `src/`
- Types go in `src/types/<feature>.ts`; keep them close to where they're used

### Style

- Prettier: no semicolons, single quotes, trailing commas
- Run `npm run check` before committing

### Components

- Shadcn/UI components live in `src/components/ui/` — add new ones with `npx shadcn@latest add <name>`
- Feature components live in `src/components/`
- Use `cn()` from `@/lib/utils` for conditional class merging — never string concatenation

### Forms

- Validate with Zod; define schemas in `src/lib/schemas.ts`
- Use `schema.safeParse()` and surface errors per-field

### Toasts

Use `sonner` directly:

```typescript
import { toast } from 'sonner'
toast.success('Done')
toast.error('Something went wrong')
```

## Adding Features

### New protected route

```
src/routes/_authenticated/<feature>.tsx
```

```typescript
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/<feature>')({
  component: FeaturePage,
})

function FeaturePage() { ... }
```

### New API service

1. Add types to `src/types/<feature>.ts`
2. Add service in `src/services/<feature>.service.ts` using `apiClient`
3. Add TanStack Query hooks in `src/hooks/use-<feature>-queries.ts`

### New server function

```typescript
// src/server/<feature>.ts
import { createServerFn } from '@tanstack/react-start'

export const myFn = createServerFn({ method: 'POST' })
  .inputValidator((data: MyInput) => data)
  .handler(async ({ data }) => {
    // runs on the server only
  })
```

## Testing

Tests live in `src/__tests__/` mirroring `src/`:

```
src/__tests__/
  hooks/
  lib/
  services/
```

- Mock server functions with `vi.mock('@/server/auth', () => ({ ... }))`
- Use `renderHook` for hooks, `render` for components
- Test files: `*.test.ts` or `*.test.tsx`

## What Not to Do

- Don't store tokens, access tokens, or session data in `localStorage`, `sessionStorage`, or React state
- Don't call the backend API directly from components or services — always go through `apiClient`
- Don't edit `src/routeTree.gen.ts` by hand
- Don't add new UI primitives by hand if shadcn has them — use `npx shadcn@latest add`
- Don't use `console.log` in committed code
- Don't skip Zod validation on user input
