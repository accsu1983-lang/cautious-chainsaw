/**
 * Throttles a function to only be called once per specified wait period.
 * Supports both leading and trailing edge execution.
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  wait: number
) {
  let timeout: ReturnType<typeof setTimeout> | null = null
  let previous = 0
  let lastArgs: Parameters<T> | null = null
  let lastContext: any = null

  const throttled = function (this: any, ...args: Parameters<T>) {
    const now = Date.now()
    const remaining = wait - (now - previous)
    lastArgs = args
    lastContext = this

    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      previous = now
      func.apply(lastContext, lastArgs)
      lastArgs = null
      lastContext = null
    } else if (!timeout) {
      timeout = setTimeout(() => {
        previous = Date.now()
        timeout = null
        if (lastArgs) {
          func.apply(lastContext, lastArgs)
          lastArgs = null
          lastContext = null
        }
      }, remaining)
    }
  }

  throttled.cancel = () => {
    if (timeout) {
      clearTimeout(timeout)
      timeout = null
    }
    previous = 0
    lastArgs = null
    lastContext = null
  }

  return throttled
}
