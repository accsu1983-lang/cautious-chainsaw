/**
 * Throttles a function to execute at most once every `wait` milliseconds.
 * This implementation includes both leading and trailing edge execution.
 * Leading edge: executes immediately on the first call.
 * Trailing edge: executes one last time after the wait period if any calls were made during the wait.
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): { (...args: Parameters<T>): void; cancel: () => void } {
  let timeout: ReturnType<typeof setTimeout> | null = null
  let lastArgs: Parameters<T> | null = null
  let lastCallTime = 0

  const throttled = (...args: Parameters<T>) => {
    const now = Date.now()
    lastArgs = args

    const execute = () => {
      func(...(lastArgs as Parameters<T>))
      lastCallTime = Date.now()
      timeout = null
      lastArgs = null
    }

    if (!timeout) {
      const remaining = wait - (now - lastCallTime)

      if (remaining <= 0) {
        // Leading edge or sufficient time has passed
        execute()
      } else {
        // Schedule trailing edge
        timeout = setTimeout(execute, remaining)
      }
    }
  }

  throttled.cancel = () => {
    if (timeout) {
      clearTimeout(timeout)
      timeout = null
    }
    lastArgs = null
  }

  return throttled
}
