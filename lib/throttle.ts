/**
 * Throttles a function to ensure it is not called more than once every `limit` milliseconds.
 * This implementation handles both the leading and trailing edges of the execution.
 */
export function throttle<T extends (...args: any[]) => void>(
  func: T,
  limit: number
) {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  let lastArgs: Parameters<T> | null = null;

  const throttled = (...args: Parameters<T>) => {
    if (timeout) {
      // If we are currently throttled, store the latest arguments for the trailing edge execution
      lastArgs = args;
    } else {
      // Leading edge execution
      func(...args);

      timeout = setTimeout(() => {
        timeout = null;
        // If arguments were captured during the throttle period, execute the trailing edge
        if (lastArgs) {
          const argsToUse = lastArgs;
          lastArgs = null;
          throttled(...argsToUse);
        }
      }, limit);
    }
  };

  /**
   * Cancels any pending throttled executions.
   */
  throttled.cancel = () => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
    lastArgs = null;
  };

  return throttled;
}
