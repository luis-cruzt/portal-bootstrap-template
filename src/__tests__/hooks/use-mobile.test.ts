import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useIsMobile } from '@/hooks/use-mobile'

describe('useIsMobile', () => {
  beforeEach(() => {
    vi.stubGlobal('innerWidth', 1024)
  })

  it('returns false for desktop viewport', () => {
    vi.stubGlobal('innerWidth', 1024)
    const mockMql = {
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }
    vi.spyOn(window, 'matchMedia').mockReturnValue(
      mockMql as unknown as MediaQueryList,
    )

    const { result } = renderHook(() => useIsMobile())
    expect(result.current).toBe(false)
  })

  it('returns true for mobile viewport', () => {
    vi.stubGlobal('innerWidth', 375)
    const mockMql = {
      matches: true,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }
    vi.spyOn(window, 'matchMedia').mockReturnValue(
      mockMql as unknown as MediaQueryList,
    )

    const { result } = renderHook(() => useIsMobile())

    act(() => {
      // trigger the state update
    })

    expect(result.current).toBe(true)
  })
})
