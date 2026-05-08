/**
 * Throttles a function to only execute once every `limit` milliseconds.
 * This implementation ensures that the first call is executed immediately (leading edge)
 * and the last call during the wait period is executed after the limit (trailing edge).
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
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  const throttled = (...args: Parameters<T>) => {
    if (!inThrottle) {
      // Execute leading edge
      func(...args);
      inThrottle = true;

      timeoutId = setTimeout(() => {
        inThrottle = false;
        // If there were calls during the throttle period, execute the trailing edge
        if (lastArgs) {
          const argsToUse = lastArgs;
          lastArgs = null;
          throttled(...argsToUse);
        }
      }, limit);
    } else {
      // Save args for trailing edge
      lastArgs = args;
    }
  };

  throttled.cancel = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
    inThrottle = false;
    lastArgs = null;
  };

  return throttled;
}
