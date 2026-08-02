/**
 * A robust throttle utility with leading/trailing options and a `.cancel()` method.
 * Type-safe and optimized to prevent layout thrashing and scroll-handling overhead.
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  options: { leading?: boolean; trailing?: boolean } = {}
) {
  let timeout: ReturnType<typeof setTimeout> | null = null
  let previous = 0
  let latestArgs: any[] | null = null

  const { leading = true, trailing = true } = options

  const throttled = function (this: any, ...args: any[]) {
    const now = Date.now()
    if (!previous && leading === false) {
      previous = now
    }
    const remaining = wait - (now - previous)
    latestArgs = args

    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      previous = now
      func.apply(this, args)
      latestArgs = null
    } else if (!timeout && trailing !== false) {
      timeout = setTimeout(() => {
        previous = leading === false ? 0 : Date.now()
        timeout = null
        if (latestArgs) {
          func.apply(this, latestArgs)
          latestArgs = null
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
    latestArgs = null
  }

  return throttled
}
