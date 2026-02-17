import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { RadiusOption, ThemePreset } from '@/types/theme'
import { cn } from '@/lib/utils'

function buildStyleOverrides(
  vars: Record<string, string>,
  radius: RadiusOption,
): React.CSSProperties {
  const styles: Record<string, string> = { '--radius': `${radius}rem` }
  for (const [key, value] of Object.entries(vars)) {
    styles[`--${key}`] = value
  }
  return styles as React.CSSProperties
}

function PreviewContent() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Preview Card</CardTitle>
          <CardDescription>
            This is how your theme looks with shadcn components.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Button size="sm">Primary</Button>
            <Button size="sm" variant="secondary">
              Secondary
            </Button>
            <Button size="sm" variant="destructive">
              Destructive
            </Button>
            <Button size="sm" variant="outline">
              Outline
            </Button>
            <Button size="sm" variant="ghost">
              Ghost
            </Button>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="preview-input">Email</Label>
            <Input
              id="preview-input"
              placeholder="email@example.com"
              readOnly
            />
          </div>
          <p className="text-sm text-muted-foreground">
            Muted text for secondary information and descriptions.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

interface ThemePreviewProps {
  preset: ThemePreset
  radius: RadiusOption
}

export function ThemePreview({ preset, radius }: ThemePreviewProps) {
  return (
    <div className="space-y-4">
      <div
        style={buildStyleOverrides(preset.light, radius)}
        className={cn(
          'rounded-lg border bg-background p-4 text-foreground shadow-sm',
        )}
      >
        <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Light
        </p>
        <PreviewContent />
      </div>
      <div
        style={buildStyleOverrides(preset.dark, radius)}
        className={cn(
          'dark rounded-lg border bg-background p-4 text-foreground shadow-sm',
        )}
      >
        <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Dark
        </p>
        <PreviewContent />
      </div>
    </div>
  )
}
