import { IconPalette, IconSearch } from '@tabler/icons-react'
import { Link, createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export const Route = createFileRoute('/_authenticated/dashboard')({
  component: Dashboard,
})

function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to your portal dashboard.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IconSearch className="size-5" />
              New features
            </CardTitle>
            <CardDescription>
              Start adding new features to the dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link to="/dashboard">Explore Features</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IconPalette className="size-5" />
              Theme customizer
            </CardTitle>
            <CardDescription>
              Customize the look and feel of your dashboard with the theme
              customizer.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link to="/theme-customizer">Explore Theme Customizer</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
