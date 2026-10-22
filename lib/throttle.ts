/**
 * A robust, lightweight throttle function to rate-limit execution of high-frequency events.
 * It supports both leading and trailing edges of execution.
 *
 * @param func The function to throttle.
 * @param wait The millisecond threshold for throttling.
 * @returns A throttled function with a `.cancel()` method to clear pending timers.
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) & { cancel: () => void } {
  let timeoutId: ReturnType<typeof setTimeout> | null = null
  let lastArgs: Parameters<T> | null = null
  let lastCallTime = 0

  const throttled = (...args: Parameters<T>) => {
    const now = Date.now()
    lastArgs = args

    const execute = () => {
      lastCallTime = Date.now()
      timeoutId = null
      if (lastArgs) {
        func(...lastArgs)
        lastArgs = null
      }
    }

    if (lastCallTime === 0) {
      // First call (leading edge)
      execute()
    } else {
      const remaining = wait - (now - lastCallTime)

      if (remaining <= 0 || remaining > wait) {
        if (timeoutId) {
          clearTimeout(timeoutId)
          timeoutId = null
        }
        execute()
      } else if (!timeoutId) {
        // Trailing edge
        timeoutId = setTimeout(execute, remaining)
      }
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

  return throttled
}
