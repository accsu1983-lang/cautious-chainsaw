/**
 * A lightweight, fully typed throttle utility.
 * Supports leading and trailing execution edges and provides a .cancel() method to avoid memory leaks.
 */
export function throttle<T extends (...args: any[]) => void>(
  func: T,
  limit: number
): { (...args: Parameters<T>): void; cancel: () => void } {
  let inThrottle = false
  let lastArgs: Parameters<T> | null = null
  let timer: ReturnType<typeof setTimeout> | null = null

  const throttled = (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      timer = setTimeout(() => {
        inThrottle = false
        if (lastArgs) {
          throttled(...lastArgs)
          lastArgs = null
        }
      }, limit)
    } else {
      lastArgs = args
    }
  }

  throttled.cancel = () => {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    inThrottle = false
    lastArgs = null
  }

  return throttled
}
