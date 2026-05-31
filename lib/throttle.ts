/**
 * A robust throttle implementation with leading/trailing edge support and a .cancel() method.
 * Throttling high-frequency events (like scroll or mousemove) reduces main-thread overhead
 * by limiting how often a function can be executed.
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  options: { leading?: boolean; trailing?: boolean } = {}
) {
  let timeout: ReturnType<typeof setTimeout> | null = null
  let previous = 0
  let latestArgs: any[] = []
  let context: any

  const throttled = function (this: any, ...args: any[]) {
    const now = Date.now()
    if (!previous && options.leading === false) previous = now
    const remaining = wait - (now - previous)
    context = this
    latestArgs = args

    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      previous = now
      func.apply(context, latestArgs)
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(() => {
        previous = options.leading === false ? 0 : Date.now()
        timeout = null
        func.apply(context, latestArgs)
      }, remaining)
    }
  }

  throttled.cancel = () => {
    if (timeout) {
      clearTimeout(timeout)
      timeout = null
    }
    previous = 0
  }

  return throttled
}
