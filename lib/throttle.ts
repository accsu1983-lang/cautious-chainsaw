/**
 * Throttles a function to only execute once every `limit` milliseconds.
 * Includes trailing edge execution to ensure the last call is eventually handled.
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

  const throttled = function (this: any, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;

      timeout = setTimeout(() => {
        inThrottle = false;
        if (lastArgs) {
          throttled.apply(this, lastArgs);
          lastArgs = null;
        }
      }, limit);
    } else {
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

  return throttled;
}
