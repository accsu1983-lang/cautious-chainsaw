/**
 * Throttles a function to be executed at most once every `limit` milliseconds.
 * Supports both leading and trailing edge execution.
 * Includes a .cancel() method to clear pending timeouts.
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): {
  (...args: Parameters<T>): void;
  cancel: () => void;
} {
  let inThrottle: boolean = false;
  let lastArgs: Parameters<T> | null = null;
  let timeout: ReturnType<typeof setTimeout> | null = null;

  const throttledFunc = (...args: Parameters<T>) => {
    if (!inThrottle) {
      // Leading edge
      func(...args);
      inThrottle = true;

      timeout = setTimeout(() => {
        inThrottle = false;
        // Trailing edge
        if (lastArgs) {
          const argsToUse = lastArgs;
          lastArgs = null;
          throttledFunc(...argsToUse);
        }
      }, limit);
    } else {
      lastArgs = args;
    }
  };

  throttledFunc.cancel = () => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
    inThrottle = false;
    lastArgs = null;
  };

  return throttledFunc;
}
