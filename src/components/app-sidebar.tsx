import {
  Avatar,
  AvatarFallback,
} from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from '@/components/ui/item'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar'
import { Route as AuthenticatedRoute } from '@/routes/_authenticated'
import { logoutFn } from '@/server/auth'
import {
  IconDashboard,
  IconHeadset,
  IconLogout,
  IconMoon,
  IconSelector,
  IconSun
} from '@tabler/icons-react'
import { Link, useRouter, useRouterState } from '@tanstack/react-router'
import { useTheme } from 'next-themes'

const navItems = [
  { title: 'Home', to: '/dashboard', icon: IconDashboard },
] as const

export function AppSidebar() {
  const routerState = useRouterState()
  const router = useRouter()
  const { user } = AuthenticatedRoute.useRouteContext()
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  const handleLogout = async () => {
    const result = await logoutFn()
    if (result?.success) {
      await router.navigate({ to: '/login' })
    }
  }

  const initials = user?.phone
    ? user.phone.slice(-2).toUpperCase()
    : 'CS'

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              asChild
            >
              <Link to="/dashboard">
                <Button size="icon-sm" asChild className="size-8">
                  <span>
                    <IconHeadset />
                  </span>
                </Button>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">GWAP Support</span>
                  <span className="truncate text-xs">Customer Portal</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.to}>
                  <SidebarMenuButton
                    isActive={routerState.location.pathname === item.to || routerState.location.pathname.startsWith(item.to + '/')}
                    tooltip={item.title}
                    asChild
                  >
                    <Link to={item.to}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-open:bg-sidebar-accent data-open:text-sidebar-accent-foreground"
                >
                  <Avatar>
                    <AvatarFallback className="rounded-lg">{initials}</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">Support Agent</span>
                    <span className="truncate text-xs">
                      {user?.phone ?? 'Unknown'}
                    </span>
                  </div>
                  <IconSelector />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-(--radix-dropdown-menu-trigger-width) min-w-56"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuGroup>
                  <DropdownMenuLabel>
                    <Item size="xs">
                      <ItemMedia>
                        <Avatar>
                          <AvatarFallback>{initials}</AvatarFallback>
                        </Avatar>
                      </ItemMedia>
                      <ItemContent>
                        <ItemTitle>Support Agent</ItemTitle>
                        <ItemDescription>{user?.phone ?? 'Unknown'}</ItemDescription>
                      </ItemContent>
                    </Item>
                  </DropdownMenuLabel>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={toggleTheme}>
                    {theme === 'light' ? <IconMoon /> : <IconSun />}
                    {theme === 'light' ? 'Dark mode' : 'Light mode'}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    <IconLogout />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
