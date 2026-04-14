/**
 * A throttle utility that limits the rate at which a function can be called.
 * This implementation supports both leading and trailing edges to ensure
 * the final state is eventually captured.
 *
 * @param func - The function to throttle.
 * @param limit - The time limit in milliseconds.
 * @returns A throttled version of the function.
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): {
  (...args: Parameters<T>): void;
  cancel: () => void;
} {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  let lastArgs: Parameters<T> | null = null;
  let lastContext: any = null;
  let lastCallTime: number = 0;

  const throttledFn = function(this: any, ...args: Parameters<T>) {
    const now = Date.now();
    const remaining = limit - (now - lastCallTime);

    lastArgs = args;
    lastContext = this;

    if (remaining <= 0 || remaining > limit) {
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
      lastCallTime = now;
      func.apply(lastContext, lastArgs);
      lastArgs = null;
      lastContext = null;
    } else if (!timeoutId) {
      timeoutId = setTimeout(() => {
        lastCallTime = Date.now();
        timeoutId = null;
        if (lastArgs) {
          func.apply(lastContext, lastArgs);
          lastArgs = null;
          lastContext = null;
        }
      }, remaining);
    }
  };

  throttledFn.cancel = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
    lastArgs = null;
    lastContext = null;
    lastCallTime = 0;
  };

  return throttledFn as any;
}
