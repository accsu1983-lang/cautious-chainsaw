/**
 * Throttles a function to only execute once every `wait` milliseconds.
 * This implementation includes both leading and trailing edge execution.
 *
 * Performance Note: Reducing scroll event execution frequency by 90% (e.g., 100ms throttle)
 * significantly reduces main-thread overhead during user interaction.
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null
  let lastArgs: Parameters<T> | null = null

  return (...args: Parameters<T>) => {
    if (!timeout) {
      // Leading edge execution
      func(...args)

      timeout = setTimeout(() => {
        timeout = null
        // Trailing edge execution if there were calls during the wait period
        if (lastArgs) {
          func(...lastArgs)
          lastArgs = null
        }
      }, wait)
    } else {
      // Capture arguments for trailing edge
      lastArgs = args
    }
  }
}
