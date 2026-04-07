/**
 * Throttles a function to be called at most once every `wait` milliseconds.
 *
 * @param func The function to throttle.
 * @param wait The number of milliseconds to wait between calls.
 * @param options.leading Whether to execute the function on the leading edge (defaults to true).
 * @param options.trailing Whether to execute the function on the trailing edge (defaults to true).
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  options: { leading?: boolean; trailing?: boolean } = {}
) {
  let timeout: ReturnType<typeof setTimeout> | null = null
  let previous = 0
  let lastArgs: Parameters<T> | null = null
  let lastContext: any = null

  const throttled = function (this: any, ...args: Parameters<T>) {
    const now = Date.now()
    if (!previous && options.leading === false) previous = now
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
      lastArgs = null
      lastContext = null
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(() => {
        previous = options.leading === false ? 0 : Date.now()
        timeout = null
        if (lastArgs) {
          func.apply(lastContext, lastArgs)
          lastArgs = null
          lastContext = null
        }
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
    lastContext = null
  }

  return throttled as T & { cancel: () => void }
}
