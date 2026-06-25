/**
 * Throttles a function to only execute once per every `limit` milliseconds.
 * This is useful for high-frequency events like scroll or resize.
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): { (...args: Parameters<T>): void; cancel: () => void } {
  let lastFunc: ReturnType<typeof setTimeout> | null = null;
  let lastRan: number | null = null;

  const throttled = function(this: any, ...args: Parameters<T>) {
    const context = this;

    if (lastRan === null) {
      func.apply(context, args);
      lastRan = Date.now();
    } else {
      if (lastFunc) {
        clearTimeout(lastFunc);
      }

      const remaining = limit - (Date.now() - lastRan);

      lastFunc = setTimeout(function() {
        if (Date.now() - (lastRan as number) >= limit) {
          func.apply(context, args);
          lastRan = Date.now();
          lastFunc = null;
        }
      }, remaining);
    }
  };

  throttled.cancel = () => {
    if (lastFunc) {
      clearTimeout(lastFunc);
      lastFunc = null;
    }
    lastRan = null;
  };

  return throttled;
}
