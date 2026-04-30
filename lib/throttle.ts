/**
 * A high-performance throttle utility that ensures a function is not called more than once
 * in a specified time frame.
 *
 * Performance Impact:
 * - Reduces execution frequency of high-rate events (scroll, resize, mousemove).
 * - Minimizes main-thread overhead and prevents layout thrashing.
 * - Supports leading/trailing execution and manual cancellation.
 */

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  options: { leading?: boolean; trailing?: boolean } = {}
) {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  let previous = 0;
  let result: ReturnType<T> | undefined;

  const { leading = true, trailing = true } = options;

  const throttled = function (this: any, ...args: Parameters<T>) {
    const now = Date.now();
    if (!previous && leading === false) previous = now;
    const remaining = wait - (now - previous);

    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      result = func.apply(this, args);
    } else if (!timeout && trailing !== false) {
      timeout = setTimeout(() => {
        previous = leading === false ? 0 : Date.now();
        timeout = null;
        result = func.apply(this, args);
      }, remaining);
    }
    return result;
  };

  throttled.cancel = function () {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
    previous = 0;
  };

  return throttled as T & { cancel(): void };
}
