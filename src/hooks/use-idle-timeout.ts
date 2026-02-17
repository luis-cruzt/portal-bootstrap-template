import { useEffect, useRef, useCallback } from 'react'

interface UseIdleTimeoutOptions {
  /** Idle timeout duration in milliseconds */
  timeout: number
  /** Callback to invoke when user becomes idle */
  onIdle: () => void
  /** List of events that reset the idle timer */
  events?: string[]
}

const DEFAULT_EVENTS = [
  'mousemove',
  'keydown',
  'mousedown',
  'touchstart',
  'scroll',
  'wheel',
]

/**
 * Hook that detects user inactivity and triggers a callback after a timeout.
 * Useful for auto-logout functionality.
 */
export function useIdleTimeout({
  timeout,
  onIdle,
  events = DEFAULT_EVENTS,
}: UseIdleTimeoutOptions) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const onIdleRef = useRef(onIdle)

  useEffect(() => {
    onIdleRef.current = onIdle
  }, [onIdle])

  const resetTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }
    timerRef.current = setTimeout(() => {
      onIdleRef.current()
    }, timeout)
  }, [timeout])

  useEffect(() => {
    resetTimer()

    events.forEach((event) => {
      window.addEventListener(event, resetTimer, { passive: true })
    })

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
      events.forEach((event) => {
        window.removeEventListener(event, resetTimer)
      })
    }
  }, [events, resetTimer])
}
