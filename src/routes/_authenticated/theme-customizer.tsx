import { useState, useMemo } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import {
  themePresets,
  radiusOptions,
  generateStylesCss,
} from '@/lib/theme-presets'
import { generateCustomTheme, hexToHue } from '@/lib/theme-generator'
import { ThemePreview } from '@/components/theme-customizer/theme-preview'
import { ThemePresetPicker } from '@/components/theme-customizer/theme-preset-picker'
import { CustomColorPicker } from '@/components/theme-customizer/custom-color-picker'
import { RadiusPicker } from '@/components/theme-customizer/radius-picker'
import { CssOutput } from '@/components/theme-customizer/css-output'
import type { RadiusOption } from '@/types/theme'

export const Route = createFileRoute('/_authenticated/theme-customizer')({
  component: ThemeCustomizerPage,
})

function ThemeCustomizerPage() {
  const [selectedPresetId, setSelectedPresetId] = useState('default')
  const [isCustom, setIsCustom] = useState(false)
  const [customColor, setCustomColor] = useState('#6366f1')
  const [radius, setRadius] = useState<RadiusOption>(0.5)

  const activePreset = useMemo(() => {
    if (isCustom) {
      return generateCustomTheme(hexToHue(customColor))
    }
    return (
      themePresets.find((p) => p.id === selectedPresetId) ?? themePresets[0]
    )
  }, [isCustom, customColor, selectedPresetId])

  const cssContent = useMemo(
    () => generateStylesCss(activePreset, radius),
    [activePreset, radius],
  )

  const handlePresetSelect = (presetId: string) => {
    setSelectedPresetId(presetId)
    setIsCustom(false)
  }

  const handleCustomSelect = () => {
    setIsCustom(true)
  }

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Theme Customizer</h1>
        <p className="text-sm text-muted-foreground">
          Pick a theme, adjust the radius, and copy the generated CSS into your
          project&apos;s <code className="text-xs">styles.css</code>.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <section className="space-y-3">
            <h2 className="text-sm font-medium">Color Theme</h2>
            <ThemePresetPicker
              presets={themePresets}
              selectedId={selectedPresetId}
              onSelect={handlePresetSelect}
              onSelectCustom={handleCustomSelect}
              isCustomSelected={isCustom}
            />
            {isCustom && (
              <CustomColorPicker
                color={customColor}
                onColorChange={setCustomColor}
              />
            )}
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-medium">Border Radius</h2>
            <RadiusPicker
              options={radiusOptions}
              selected={radius}
              onSelect={setRadius}
            />
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-medium">Generated CSS</h2>
            <CssOutput cssContent={cssContent} />
          </section>
        </div>

        <div className="space-y-3">
          <h2 className="text-sm font-medium">Preview</h2>
          <ThemePreview preset={activePreset} radius={radius} />
        </div>
      </div>
    </div>
  )
}
