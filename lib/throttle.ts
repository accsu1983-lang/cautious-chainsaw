/**
 * A high-precision throttle utility that supports leading and trailing edges.
 * Uses Date.now() for timing and provides a .cancel() method for cleanup.
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  options: { leading?: boolean; trailing?: boolean } = {}
): { (...args: Parameters<T>): void; cancel(): void } {
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

  throttled.cancel = function () {
    if (timeout) {
      clearTimeout(timeout)
      timeout = null
    }
    previous = 0
  }

  return throttled
}
