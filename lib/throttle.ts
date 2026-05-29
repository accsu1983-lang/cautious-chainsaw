/**
 * A throttle utility that limits the frequency of function executions.
 * It ensures the function is called at most once every `wait` milliseconds.
 * This implementation includes leading and trailing edge execution.
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): {
  (...args: Parameters<T>): void
  cancel: () => void
} {
  let timeout: ReturnType<typeof setTimeout> | null = null
  let previous = 0
  let lastArgs: Parameters<T> | null = null
  let lastContext: any = null

  const later = () => {
    previous = Date.now()
    timeout = null
    if (lastArgs) {
      func.apply(lastContext, lastArgs)
      lastArgs = lastContext = null
    }
  }

  const throttled = function (this: any, ...args: Parameters<T>) {
    const now = Date.now()
    const remaining = wait - (now - previous)
    lastContext = this
    lastArgs = args

    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      previous = now
      func.apply(lastContext, lastArgs)
      lastArgs = lastContext = null
    } else if (!timeout) {
      timeout = setTimeout(later, remaining)
    }
  }

  throttled.cancel = () => {
    if (timeout) {
      clearTimeout(timeout)
      timeout = null
    }
    previous = 0
    lastArgs = lastContext = null
  }

  return throttled
}
