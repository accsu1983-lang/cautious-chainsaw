/**
 * Simple throttle utility to limit the execution frequency of a function.
 * Useful for performance-sensitive events like scroll, resize, and mousemove.
 */
export function throttle<T extends (...args: any[]) => void>(
  func: T,
  limit: number
): {
  (...args: Parameters<T>): void;
  cancel: () => void;
} {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  let lastRun = 0;

  const throttled = function(this: any, ...args: Parameters<T>) {
    const now = Date.now();
    const remaining = limit - (now - lastRun);

    if (remaining <= 0 || remaining > limit) {
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
      lastRun = now;
      func.apply(this, args);
    } else if (!timeoutId) {
      timeoutId = setTimeout(() => {
        lastRun = Date.now();
        timeoutId = null;
        func.apply(this, args);
      }, remaining);
    }
  };

  throttled.cancel = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
    lastRun = 0;
  };

  return throttled as any;
}
