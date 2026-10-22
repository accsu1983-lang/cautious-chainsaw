/**
 * Simple, robust, and highly performant throttle implementation with leading/trailing options
 * and a .cancel() method to avoid memory leaks or pending executions after unmount.
 *
 * Designed to prevent high-frequency event handler executions (such as scroll/resize)
 * from causing layout thrashing and high main-thread CPU usage.
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  options: { leading?: boolean; trailing?: boolean } = {}
): T & { cancel: () => void } {
  let timeout: ReturnType<typeof setTimeout> | null = null
  let previous = 0
  let latestArgs: any[] | null = null
  let context: any = null

  const leading = options.leading !== false
  const trailing = options.trailing !== false

  const throttled = function (this: any, ...args: any[]) {
    const now = Date.now()
    if (!previous && leading === false) previous = now
    const remaining = wait - (now - previous)
    latestArgs = args
    context = this

    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      previous = now
      func.apply(context, latestArgs)
      latestArgs = null
      context = null
    } else if (!timeout && trailing !== false) {
      timeout = setTimeout(() => {
        previous = leading === false ? 0 : Date.now()
        timeout = null
        if (latestArgs) {
          func.apply(context!, latestArgs)
          latestArgs = null
          context = null
        }
      }, remaining)
    }
  } as T & { cancel: () => void }

  throttled.cancel = function () {
    if (timeout) {
      clearTimeout(timeout)
      timeout = null
    }
    previous = 0
    latestArgs = null
    context = null
  }

  return throttled
}
