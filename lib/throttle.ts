/**
 * Throttles a function to only execute once per every `limit` milliseconds.
 *
 * @param func - The function to throttle
 * @param limit - The time limit in milliseconds
 * @returns A throttled version of the function with a .cancel() method
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): { (...args: Parameters<T>): void; cancel: () => void } {
  let inThrottle: boolean = false;
  let lastFunc: ReturnType<typeof setTimeout> | null = null;
  let lastRan: number = 0;

  const throttled = function (this: any, ...args: Parameters<T>) {
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      lastRan = Date.now();
      inThrottle = true;
    } else {
      if (lastFunc) clearTimeout(lastFunc);
      lastFunc = setTimeout(function () {
        if (Date.now() - lastRan >= limit) {
          func.apply(context, args);
          lastRan = Date.now();
          inThrottle = false;
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
    lastRan = 0;
  };

  return throttled;
}
