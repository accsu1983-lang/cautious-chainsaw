/**
 * Throttles a function to be called at most once every `limit` milliseconds.
 *
 * @param func The function to throttle
 * @param limit The time limit in milliseconds
 * @returns An object with the throttled function and a cancel method
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
  let lastCallTime = 0;

  const throttled = function (this: any, ...args: Parameters<T>) {
    const now = performance.now();
    const remaining = limit - (now - lastCallTime);

    lastArgs = args;

    if (remaining <= 0 || remaining > limit) {
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
      lastCallTime = now;
      func.apply(this, args);
    } else if (!timeoutId) {
      timeoutId = setTimeout(() => {
        lastCallTime = performance.now();
        timeoutId = null;
        if (lastArgs) {
          func.apply(this, lastArgs);
          lastArgs = null;
        }
      }, remaining);
    }
  };

  throttled.cancel = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
    lastArgs = null;
    lastCallTime = 0;
  };

  return throttled as any;
}
