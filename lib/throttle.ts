/**
 * Throttles a function to only execute once every `limit` milliseconds.
 * Includes leading and trailing edge execution.
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
) {
  let inThrottle: boolean = false;
  let lastFunc: ReturnType<typeof setTimeout> | null = null;
  let lastRan: number = 0;

  const throttled = function(this: any, ...args: Parameters<T>) {
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      lastRan = Date.now();
      inThrottle = true;

      if (lastFunc) {
        clearTimeout(lastFunc);
        lastFunc = null;
      }

      setTimeout(() => {
        inThrottle = false;
      }, limit);
    } else {
      if (lastFunc) clearTimeout(lastFunc);
      lastFunc = setTimeout(function() {
        if (Date.now() - lastRan >= limit) {
          func.apply(context, args);
          lastRan = Date.now();
          lastFunc = null;
        }
      }, limit - (Date.now() - lastRan));
    }
  };

  throttled.cancel = () => {
    if (lastFunc) {
      clearTimeout(lastFunc);
      lastFunc = null;
    }
    inThrottle = false;
  };

  return throttled;
}
