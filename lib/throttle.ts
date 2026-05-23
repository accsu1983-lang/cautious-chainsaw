/**
 * Throttles a function to only execute once every `limit` milliseconds.
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
  let lastResult: ReturnType<T>;
  let timeout: ReturnType<typeof setTimeout> | null = null;
  let lastArgs: Parameters<T> | null = null;
  let lastContext: any = null;

  const throttled = function(this: any, ...args: Parameters<T>): void {
    const context = this;

    if (!inThrottle) {
      lastResult = func.apply(context, args);
      inThrottle = true;

      timeout = setTimeout(() => {
        inThrottle = false;
        if (lastArgs) {
          throttled.apply(lastContext, lastArgs);
          lastArgs = null;
          lastContext = null;
        }
      }, limit);
    } else {
      lastArgs = args;
      lastContext = context;
    }
  };

  throttled.cancel = () => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
    inThrottle = false;
    lastArgs = null;
    lastContext = null;
  };

  return throttled as any;
}
