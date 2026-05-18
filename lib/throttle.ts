/**
 * Throttles a function to be called at most once every `wait` milliseconds.
 * The throttled function has a `.cancel()` method to cancel any pending execution.
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): T & { cancel: () => void } {
  let timeout: ReturnType<typeof setTimeout> | null = null
  let lastArgs: any[] | null = null
  let lastContext: any = null
  let lastCallTime = 0

  const later = () => {
    lastCallTime = Date.now()
    timeout = null
    if (lastArgs) {
      func.apply(lastContext, lastArgs)
      lastContext = lastArgs = null
    }
  }

  const throttled = function (this: any, ...args: any[]) {
    const now = Date.now()
    const remaining = wait - (now - lastCallTime)
    lastArgs = args
    lastContext = this

    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      lastCallTime = now
      func.apply(lastContext, lastArgs)
      lastContext = lastArgs = null
    } else if (!timeout) {
      timeout = setTimeout(later, remaining)
    }
  }

  throttled.cancel = () => {
    if (timeout) {
      clearTimeout(timeout)
      timeout = null
    }
    lastCallTime = 0
    lastContext = lastArgs = null
  }

  return throttled as T & { cancel: () => void }
}
