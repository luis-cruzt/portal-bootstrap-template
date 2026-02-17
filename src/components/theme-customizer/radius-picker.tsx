import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { RadiusOption } from '@/types/theme'

interface RadiusPickerProps {
  options: RadiusOption[]
  selected: RadiusOption
  onSelect: (radius: RadiusOption) => void
}

export function RadiusPicker({
  options,
  selected,
  onSelect,
}: RadiusPickerProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((radius) => (
        <Button
          key={radius}
          variant={selected === radius ? 'default' : 'outline'}
          size="sm"
          className={cn('min-w-14 tabular-nums')}
          onClick={() => onSelect(radius)}
        >
          {radius}
        </Button>
      ))}
    </div>
  )
}
