/**
 * Creates a throttled function that only invokes func at most once per every
 * limit milliseconds. The throttled function comes with a cancel method to
 * cancel delayed func invocations.
 */
export function throttle<T extends (...args: any[]) => void>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) & { cancel: () => void } {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  let lastArgs: Parameters<T> | null = null;
  let lastRun = 0;

  const throttled = (...args: Parameters<T>) => {
    lastArgs = args;
    const now = Date.now();
    const remaining = limit - (now - lastRun);

    if (remaining <= 0) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      func(...lastArgs);
      lastRun = now;
      lastArgs = null;
    } else if (!timeout) {
      timeout = setTimeout(() => {
        if (lastArgs) {
          func(...lastArgs);
          lastRun = Date.now();
          lastArgs = null;
        }
        timeout = null;
      }, remaining);
    }
  };

  throttled.cancel = () => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
    lastArgs = null;
  };

  return throttled;
}
