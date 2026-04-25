/**
 * A high-precision throttle utility.
 *
 * Throttling reduces the number of times a function is executed over time.
 * This is particularly useful for high-frequency events like scroll, resize, or mousemove.
 *
 * Using a 100ms throttle for scroll events can reduce execution frequency by ~90%
 * while maintaining smooth UI transitions.
 *
 * @param func - The function to throttle
 * @param wait - The number of milliseconds to wait between executions
 * @returns A throttled version of the function with a .cancel() method
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): {
  (...args: Parameters<T>): void;
  cancel: () => void;
} {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  let previous = 0;

  const throttled = function (this: any, ...args: Parameters<T>) {
    const now = typeof performance !== 'undefined' ? performance.now() : Date.now();
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
        previous = typeof performance !== 'undefined' ? performance.now() : Date.now();
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
