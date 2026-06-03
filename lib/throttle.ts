/**
 * Throttles a function to only execute at most once every specified limit.
 *
 * @param func The function to throttle
 * @param limit The time limit in milliseconds
 * @returns A throttled version of the function
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): {
  (...args: Parameters<T>): void;
  cancel: () => void;
} {
  let inThrottle: boolean = false;
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  let lastArgs: Parameters<T> | null = null;
  let lastContext: any = null;

  const throttled = function(this: any, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      timeoutId = setTimeout(() => {
        inThrottle = false;
        if (lastArgs) {
          throttled.apply(lastContext, lastArgs);
          lastArgs = null;
          lastContext = null;
        }
      }, limit);
    } else {
      lastArgs = args;
      lastContext = this;
    }
  };

  throttled.cancel = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
    inThrottle = false;
    lastArgs = null;
    lastContext = null;
  };

  return throttled;
}
