/**
 * ⚡ BOLT OPTIMIZATION: Lightweight high-performance throttle utility
 * Limits the rate at which a function can fire.
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): { (...args: Parameters<T>): void; cancel: () => void } {
  let timeout: ReturnType<typeof setTimeout> | null = null
  let lastArgs: Parameters<T> | null = null
  let lastThis: any = null
  let lastCallTime = 0

  const later = () => {
    lastCallTime = Date.now()
    timeout = null
    if (lastArgs) {
      func.apply(lastThis, lastArgs)
      lastArgs = lastThis = null
    }
  }

  const throttled = function (this: any, ...args: Parameters<T>) {
    const now = Date.now()
    const remaining = wait - (now - lastCallTime)

    lastArgs = args
    lastThis = this

    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      lastCallTime = now
      func.apply(lastThis, lastArgs)
      lastArgs = lastThis = null
    } else if (!timeout) {
      timeout = setTimeout(later, remaining)
    }
  }

  throttled.cancel = () => {
    if (timeout) {
      clearTimeout(timeout)
      timeout = null
    }
    lastArgs = lastThis = null
    lastCallTime = 0
  }

  return throttled
}
