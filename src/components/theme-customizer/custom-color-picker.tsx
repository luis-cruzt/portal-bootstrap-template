import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface CustomColorPickerProps {
  color: string
  onColorChange: (hex: string) => void
}

export function CustomColorPicker({
  color,
  onColorChange,
}: CustomColorPickerProps) {
  return (
    <div className="flex items-end gap-3">
      <div className="space-y-1.5">
        <Label htmlFor="color-picker">Pick a color</Label>
        <input
          id="color-picker"
          type="color"
          value={color}
          onChange={(e) => onColorChange(e.target.value)}
          className="h-10 w-16 cursor-pointer rounded-md border bg-transparent p-1"
        />
      </div>
      <div className="flex-1 space-y-1.5">
        <Label htmlFor="hex-input">Hex</Label>
        <Input
          id="hex-input"
          value={color}
          onChange={(e) => {
            const val = e.target.value
            if (/^#[0-9a-fA-F]{6}$/.test(val)) {
              onColorChange(val)
            }
          }}
          placeholder="#6366f1"
          maxLength={7}
        />
      </div>
    </div>
  )
}
