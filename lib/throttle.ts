/**
 * ⚡ BOLT OPTIMIZATION: A lightweight, typed throttle utility
 * with leading/trailing edge execution and explicit cancellation.
 * Uses ReturnType<typeof setTimeout> for environment-agnostic safety.
 */
export function throttle<T extends (...args: any[]) => void>(
  func: T,
  delay: number
): T & { cancel: () => void } {
  let timeoutId: ReturnType<typeof setTimeout> | null = null
  let lastArgs: any[] | null = null
  let lastCallTime = 0

  const throttled = (...args: any[]) => {
    lastArgs = args
    const now = Date.now()
    const remaining = delay - (now - lastCallTime)

    if (remaining <= 0 || remaining > delay) {
      if (timeoutId) {
        clearTimeout(timeoutId)
        timeoutId = null
      }
      lastCallTime = now
      func(...args)
    } else if (!timeoutId) {
      timeoutId = setTimeout(() => {
        lastCallTime = Date.now()
        timeoutId = null
        if (lastArgs) {
          func(...lastArgs)
          lastArgs = null
        }
      }, remaining)
    }
  }

  throttled.cancel = () => {
    if (timeoutId) {
      clearTimeout(timeoutId)
      timeoutId = null
    }
    lastArgs = null
    lastCallTime = 0
  }

  return throttled as T & { cancel: () => void }
}
