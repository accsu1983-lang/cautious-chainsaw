/**
 * Throttles a function to only execute once every `delay` milliseconds.
 * Implements both leading and trailing edges to ensure the final state is captured.
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): { throttled: (...args: Parameters<T>) => void; cancel: () => void } {
  let timeoutId: ReturnType<typeof setTimeout> | null = null
  let lastArgs: Parameters<T> | null = null

  const throttled = (...args: Parameters<T>) => {
    lastArgs = args
    if (timeoutId) return

    // Execute immediately on the leading edge
    func(...args)

    timeoutId = setTimeout(() => {
      timeoutId = null
      // Execute on the trailing edge if arguments were updated
      if (lastArgs && lastArgs !== args) {
        throttled(...lastArgs)
      }
    }, delay)
  }

  const cancel = () => {
    if (timeoutId) {
      clearTimeout(timeoutId)
      timeoutId = null
    }
    lastArgs = null
  }

  return { throttled, cancel }
}
