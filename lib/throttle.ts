/**
 * Throttles a function to only execute once every `wait` milliseconds.
 * Supports leading and trailing edge execution.
 * Includes a .cancel() method to clear any pending execution.
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  options: { leading?: boolean; trailing?: boolean } = { leading: true, trailing: true }
) {
  let timeout: ReturnType<typeof setTimeout> | null = null
  let previous = 0
  let latestArgs: any[] | null = null

  const throttled = function (this: any, ...args: any[]) {
    const now = Date.now()
    if (!previous && options.leading === false) previous = now
    const remaining = wait - (now - previous)
    latestArgs = args

    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      previous = now
      func.apply(this, args)
      if (!timeout) latestArgs = null
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(() => {
        previous = options.leading === false ? 0 : Date.now()
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

  return throttled as T & { cancel: () => void }
}
