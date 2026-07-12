/**
 * A standard throttle utility that ensures a function is called at most once
 * in a specified time interval.
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): {
  (...args: Parameters<T>): void;
  cancel: () => void;
} {
  let lastFunc: ReturnType<typeof setTimeout> | null = null;
  let lastRan: number | null = null;

  const throttled = function (this: any, ...args: Parameters<T>) {
    const context = this;
    if (lastRan === null) {
      func.apply(context, args);
      lastRan = Date.now();
    } else {
      if (lastFunc) {
        clearTimeout(lastFunc);
      }
      lastFunc = setTimeout(() => {
        if (Date.now() - (lastRan as number) >= limit) {
          func.apply(context, args);
          lastRan = Date.now();
          lastFunc = null;
        }
      }, limit - (Date.now() - (lastRan as number)));
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
