/**
 * Throttles a function to only execute once every `wait` milliseconds.
 * Supports both leading and trailing edges.
 *
 * @param func The function to throttle
 * @param wait The number of milliseconds to throttle executions to
 * @param options.leading Whether to execute on the leading edge (default: true)
 * @param options.trailing Whether to execute on the trailing edge (default: true)
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  options: { leading?: boolean; trailing?: boolean } = {}
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null
  let previous = 0
  const leading = options.leading !== false
  const trailing = options.trailing !== false

  const throttled = function (this: any, ...args: Parameters<T>) {
    const now = Date.now()
    if (!previous && leading === false) previous = now
    const remaining = wait - (now - previous)

    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      previous = now
      func.apply(this, args)
    } else if (!timeout && trailing !== false) {
      timeout = setTimeout(() => {
        previous = leading === false ? 0 : Date.now()
        timeout = null
        func.apply(this, args)
      }, remaining)
    }
  }

  return throttled
}
