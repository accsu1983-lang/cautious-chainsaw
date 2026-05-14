/**
 * Throttles a function to only execute once per every `wait` milliseconds.
 *
 * This version handles both leading and trailing edges:
 * - Leading: Executes immediately on the first call.
 * - Trailing: Ensures the final call within the wait period is eventually executed.
 *
 * Recommended for high-frequency events like 'scroll' or 'resize'.
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null
  let lastArgs: Parameters<T> | null = null
  let lastThis: any = null
  let lastCallTime = 0

  const later = () => {
    lastCallTime = Date.now()
    timeout = null
    if (lastArgs) {
      func.apply(lastThis, lastArgs)
      lastArgs = null
      lastThis = null
    }
  }

  return function(this: any, ...args: Parameters<T>) {
    const now = Date.now()
    const remaining = wait - (now - lastCallTime)

    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      lastCallTime = now
      func.apply(this, args)
    } else if (!timeout) {
      lastArgs = args
      lastThis = this
      timeout = setTimeout(later, remaining)
    }
  }
}
