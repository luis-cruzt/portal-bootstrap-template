import type { ThemePreset, ThemeVariable, ThemeVariables } from '@/types/theme'
import { themePresets } from '@/lib/theme-presets'

/** Variables that should keep the custom hue with full chroma */
const chromaticVars: ThemeVariable[] = [
  'primary',
  'primary-foreground',
  'ring',
  'sidebar-primary',
  'sidebar-primary-foreground',
  'sidebar-ring',
  'chart-1',
  'chart-2',
  'chart-3',
  'chart-4',
  'chart-5',
]

/** Variables that should stay untouched (destructive, opacity-based borders) */
const preserveVars: ThemeVariable[] = ['destructive']

/** OKLCH string pattern: oklch(L C H) or oklch(L C H / alpha%) */
const oklchRegex = /^oklch\((\d+\.?\d*)\s+(\d+\.?\d*)\s+(\d+\.?\d*)(.*)\)$/

function replaceHue(
  oklchStr: string,
  newHue: number,
  chromaScale?: number,
): string {
  const match = oklchStr.match(oklchRegex)
  if (!match) return oklchStr

  const l = match[1]
  const c =
    chromaScale !== undefined
      ? (parseFloat(match[2]) * chromaScale).toFixed(3)
      : match[2]
  const rest = match[4] ?? ''
  return `oklch(${l} ${c} ${newHue}${rest})`
}

function transformVariables(
  source: ThemeVariables,
  hue: number,
): ThemeVariables {
  const result = { ...source }

  for (const key of Object.keys(result) as ThemeVariable[]) {
    if (preserveVars.includes(key)) continue

    const value = result[key]

    // Skip opacity-based values like oklch(1 0 0 / 10%)
    if (value.includes('/')) continue

    // Skip achromatic values (chroma is 0)
    const match = value.match(oklchRegex)
    if (!match) continue

    const chroma = parseFloat(match[2])
    if (chroma === 0) continue

    if (chromaticVars.includes(key)) {
      // Full hue replacement for chromatic variables
      result[key] = replaceHue(value, hue)
    } else {
      // Tint neutrals with low chroma at the new hue
      result[key] = replaceHue(value, hue, chroma < 0.05 ? 1 : 0.3)
    }
  }

  return result
}

export function hexToHue(hex: string): number {
  const r = parseInt(hex.slice(1, 3), 16) / 255
  const g = parseInt(hex.slice(3, 5), 16) / 255
  const b = parseInt(hex.slice(5, 7), 16) / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const delta = max - min

  if (delta === 0) return 0

  let hslHue: number
  if (max === r) {
    hslHue = ((g - b) / delta + (g < b ? 6 : 0)) * 60
  } else if (max === g) {
    hslHue = ((b - r) / delta + 2) * 60
  } else {
    hslHue = ((r - g) / delta + 4) * 60
  }

  // HSL hue maps closely to OKLCH hue for saturated colors
  return Math.round(hslHue * 10) / 10
}

export function generateCustomTheme(hue: number): ThemePreset {
  const base = themePresets[0]

  return {
    name: 'Custom',
    id: 'custom',
    primaryColor: `oklch(0.55 0.24 ${hue})`,
    light: transformVariables(base.light, hue),
    dark: transformVariables(base.dark, hue),
  }
}
