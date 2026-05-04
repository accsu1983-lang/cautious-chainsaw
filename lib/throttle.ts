/**
 * A robust throttle utility that ensures a function is called at most once
 * in a specified time period.
 *
 * Performance Impact:
 * Using this for scroll/resize events (e.g., 100ms throttle) reduces event
 * handler execution frequency by approximately 90% (from ~100Hz to 10Hz),
 * significantly lowering main-thread CPU overhead.
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): { (...args: Parameters<T>): void; cancel: () => void } {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  let previous = 0;

  const throttled = function (this: any, ...args: Parameters<T>) {
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
