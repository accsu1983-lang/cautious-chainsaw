/**
 * Throttles a function to only execute once every `wait` milliseconds.
 *
 * Performance Impact:
 * Throttling high-frequency events like 'scroll' to 100ms (10Hz) can reduce
 * main-thread event handler execution by ~90% while remaining responsive.
 *
 * @param func The function to throttle
 * @param wait The number of milliseconds to wait
 * @returns A throttled version of the function with a .cancel() method
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): { (...args: Parameters<T>): void; cancel(): void } {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  let previous = 0;

  const throttled = function(this: any, ...args: Parameters<T>) {
    const now = Date.now();
    const remaining = wait - (now - previous);

    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      func.apply(this, args);
    } else if (!timeout) {
      timeout = setTimeout(() => {
        previous = Date.now();
        timeout = null;
        func.apply(this, args);
      }, remaining);
    }
  };

  throttled.cancel = () => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
    previous = 0;
  };

  return throttled;
}
