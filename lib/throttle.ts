/**
 * ⚡ BOLT OPTIMIZATION: A lightweight, high-performance throttle utility.
 * Limits the execution of high-frequency events (like scroll or resize) to at most once per `wait` ms.
 * Provides a `.cancel()` method to prevent memory leaks and clean up pending executions on unmount.
 */
export function throttle<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): T & { cancel: () => void } {
  let timeout: ReturnType<typeof setTimeout> | null = null
  let previous = 0

  const throttled = function (this: any, ...args: any[]) {
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
  } as any

  throttled.cancel = () => {
    if (timeout) {
      clearTimeout(timeout)
      timeout = null
    }
    previous = 0
  }

  return throttled
}
