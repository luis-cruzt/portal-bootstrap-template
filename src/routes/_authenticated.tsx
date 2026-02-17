import {
  createFileRoute,
  Outlet,
  redirect,
} from '@tanstack/react-router'
import { getCurrentUserFn, hasRequiredRoleFn } from '@/server/auth'
import { AppSidebar } from '@/components/app-sidebar'
import {
  SidebarInset,
  SidebarProvider,
} from '@/components/ui/sidebar'
import {
  TooltipProvider,
} from '@/components/ui/tooltip'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async ({ location }) => {
    const user = await getCurrentUserFn()
    const hasRole = await hasRequiredRoleFn()

    if (!user || !hasRole) {
      throw redirect({
        to: '/login',
        search: { redirect: location.href },
      })
    }

    return { user }
  },
  component: AuthenticatedLayout,
})

function AuthenticatedLayout() {
  return (
    <TooltipProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <Outlet />
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  )
}
