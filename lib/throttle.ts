/**
 * Throttles a function to only execute once every `wait` milliseconds.
 *
 * @param func The function to throttle
 * @param wait The number of milliseconds to wait between executions
 * @param options.leading Whether to execute on the leading edge (default: true)
 * @param options.trailing Whether to execute on the trailing edge (default: true)
 * @returns A throttled version of the function with a .cancel() method
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  options: { leading?: boolean; trailing?: boolean } = {}
) {
  let timeout: ReturnType<typeof setTimeout> | null = null
  let previous = 0
  let args: any[] | null = null
  let result: any

  const throttled = function (this: any, ...newArgs: any[]) {
    const now = Date.now()
    if (!previous && options.leading === false) previous = now
    const remaining = wait - (now - previous)
    args = newArgs

    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      previous = now
      result = func.apply(this, args)
      if (!timeout) args = null
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(() => {
        previous = options.leading === false ? 0 : Date.now()
        timeout = null
        result = func.apply(this, args!)
        if (!timeout) args = null
      }, remaining)
    }
    return result
  }

  throttled.cancel = () => {
    if (timeout) {
      clearTimeout(timeout)
      timeout = null
    }
    previous = 0
    args = null
  }

  return throttled as T & { cancel: () => void }
}
