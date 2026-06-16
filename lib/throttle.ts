/**
 * Simple throttle function to limit the execution frequency of a function.
 * @param func The function to throttle
 * @param limit The time limit in milliseconds
 * @returns A throttled version of the function with a .cancel() method
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) & { cancel: () => void } {
  let lastFunc: ReturnType<typeof setTimeout> | undefined;
  let lastRan: number | undefined;

  const throttled = function(this: any, ...args: Parameters<T>) {
    if (!lastRan) {
      func.apply(this, args);
      lastRan = Date.now();
    } else {
      if (lastFunc) clearTimeout(lastFunc);
      lastFunc = setTimeout(() => {
        if (Date.now() - (lastRan || 0) >= limit) {
          func.apply(this, args);
          lastRan = Date.now();
          lastFunc = undefined;
        }
      }, limit - (Date.now() - lastRan));
    }
  };

  throttled.cancel = () => {
    if (lastFunc) {
      clearTimeout(lastFunc);
      lastFunc = undefined;
    }
    lastRan = undefined;
  };

  return throttled as any;
}
