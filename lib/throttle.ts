/**
 * A robust throttle utility that ensures a function is called at most once
 * in a specified time period. Supports leading and trailing edge execution.
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) & { cancel: () => void } {
  let inThrottle: boolean = false;
  let lastArgs: Parameters<T> | null = null;
  let timeout: ReturnType<typeof setTimeout> | null = null;

  const throttled = (...args: Parameters<T>) => {
    if (!inThrottle) {
      // Leading edge execution
      func(...args);
      inThrottle = true;

      timeout = setTimeout(() => {
        inThrottle = false;
        if (lastArgs) {
          // Trailing edge execution
          const argsToUse = lastArgs;
          lastArgs = null;
          throttled(...argsToUse);
        }
      }, limit);
    } else {
      // Capture arguments for trailing edge execution
      lastArgs = args;
    }
  };

  throttled.cancel = () => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
    inThrottle = false;
    lastArgs = null;
  };

  return throttled as ((...args: Parameters<T>) => void) & { cancel: () => void };
}
