/**
 * Throttles a function to be called at most once every `wait` milliseconds.
 * Includes a `.cancel()` method to clean up any pending executions.
 *
 * Performance Note: This reduces event handler execution frequency,
 * saving main-thread resources during high-frequency events like scrolling.
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): { (...args: Parameters<T>): void; cancel: () => void } {
  let timeout: ReturnType<typeof setTimeout> | null = null
  let previous = 0

  const throttled = function (this: any, ...args: Parameters<T>) {
    const now = Date.now()
    const remaining = wait - (now - previous)

    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      previous = now
      func.apply(this, args)
    } else if (!timeout) {
      timeout = setTimeout(() => {
        previous = Date.now()
        timeout = null
        func.apply(this, args)
      }, remaining)
    }
  }

  throttled.cancel = function () {
    if (timeout) {
      clearTimeout(timeout)
      timeout = null
    }
    previous = 0
  }

  return throttled as unknown as { (...args: Parameters<T>): void; cancel: () => void }
}
