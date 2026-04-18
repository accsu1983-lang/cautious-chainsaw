/**
 * A robust throttle utility that ensures a function is called at most once
 * in a specified time limit. It supports both leading and trailing edges
 * to ensure the final state of an event is captured.
 *
 * @param func The function to throttle
 * @param limit The time limit in milliseconds
 * @returns An object containing the throttled function and a cancel method
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): { throttled: (...args: Parameters<T>) => void; cancel: () => void } {
  let timeout: ReturnType<typeof setTimeout> | null = null
  let lastArgs: Parameters<T> | null = null
  let lastCallTime = 0

  const throttled = (...args: Parameters<T>) => {
    const now = Date.now()
    const remaining = limit - (now - lastCallTime)

    lastArgs = args

    if (remaining <= 0 || remaining > limit) {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      lastCallTime = now
      func(...lastArgs)
      lastArgs = null
    } else if (!timeout) {
      timeout = setTimeout(() => {
        lastCallTime = Date.now()
        timeout = null
        if (lastArgs) {
          func(...lastArgs)
          lastArgs = null
        }
      }, remaining)
    }
  }

  const cancel = () => {
    if (timeout) {
      clearTimeout(timeout)
      timeout = null
    }
    lastArgs = null
    lastCallTime = 0
  }

  return { throttled, cancel }
}
