import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { ThemePreset } from '@/types/theme'

interface ThemePresetPickerProps {
  presets: ThemePreset[]
  selectedId: string
  onSelect: (presetId: string) => void
  onSelectCustom: () => void
  isCustomSelected: boolean
}

export function ThemePresetPicker({
  presets,
  selectedId,
  onSelect,
  onSelectCustom,
  isCustomSelected,
}: ThemePresetPickerProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {presets.map((preset) => (
        <Button
          key={preset.id}
          variant="outline"
          size="sm"
          className={cn(
            'gap-2',
            selectedId === preset.id &&
              !isCustomSelected &&
              'ring-2 ring-primary ring-offset-2 ring-offset-background',
          )}
          onClick={() => onSelect(preset.id)}
        >
          <span
            className="size-4 rounded-full border"
            style={{ backgroundColor: preset.primaryColor }}
          />
          {preset.name}
        </Button>
      ))}
      <Button
        variant="outline"
        size="sm"
        className={cn(
          'gap-2',
          isCustomSelected &&
            'ring-2 ring-primary ring-offset-2 ring-offset-background',
        )}
        onClick={onSelectCustom}
      >
        <span
          className="size-4 rounded-full border"
          style={{
            background:
              'conic-gradient(red, yellow, lime, aqua, blue, magenta, red)',
          }}
        />
        Custom
      </Button>
    </div>
  )
}
