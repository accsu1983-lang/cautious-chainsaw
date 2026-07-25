/**
 * A high-performance throttle utility with leading/trailing edge support and a `.cancel()` method.
 * Designed to optimize high-frequency events like scroll, resize, or pointer movements.
 *
 * ⚡ BOLT OPTIMIZATION: Throttles high-frequency calls to reduce main-thread overhead.
 */
export function throttle<T extends (...args: any[]) => void>(
  func: T,
  wait: number,
  options: { leading?: boolean; trailing?: boolean } = {}
): T & { cancel: () => void } {
  let timeout: ReturnType<typeof setTimeout> | null = null
  let previous = 0
  let lastArgs: any[] | null = null

  const leading = options.leading !== false
  const trailing = options.trailing !== false

  const throttled = function (this: any, ...args: any[]) {
    const now = Date.now()
    if (!previous && leading === false) previous = now
    const remaining = wait - (now - previous)
    lastArgs = args

    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      previous = now
      func.apply(this, args)
      lastArgs = null
    } else if (!timeout && trailing !== false) {
      timeout = setTimeout(() => {
        previous = leading === false ? 0 : Date.now()
        timeout = null
        func.apply(this, lastArgs || [])
        lastArgs = null
      }, remaining)
    }
  }

  throttled.cancel = function () {
    if (timeout) {
      clearTimeout(timeout)
      timeout = null
    }
    previous = 0
    lastArgs = null
  }

  return throttled as any
}
