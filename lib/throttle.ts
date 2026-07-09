/**
 * ⚡ BOLT OPTIMIZATION: Throttle utility to limit the execution rate of a function.
 * Especially useful for high-frequency events like scroll, resize, or mousemove.
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  options: { leading?: boolean; trailing?: boolean } = {}
) {
  let timeout: ReturnType<typeof setTimeout> | null = null
  let previous = 0
  const leading = options.leading !== false
  const trailing = options.trailing !== false

  const throttled = function (this: any, ...args: Parameters<T>) {
    const now = Date.now()
    if (!previous && !leading) previous = now
    const remaining = wait - (now - previous)

    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      previous = now
      func.apply(this, args)
    } else if (!timeout && trailing) {
      timeout = setTimeout(() => {
        previous = !leading ? 0 : Date.now()
        timeout = null
        func.apply(this, args)
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
