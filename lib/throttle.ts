/**
 * Throttles a function to only execute once every specified limit of milliseconds.
 * Supports leading and trailing edge execution.
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): {
  (...args: Parameters<T>): void;
  cancel: () => void;
} {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  let lastArgs: Parameters<T> | null = null;
  let lastRun = 0;

  const throttled = (...args: Parameters<T>) => {
    const now = Date.now();

    // If it's the first call or the limit has passed, execute immediately (leading edge)
    if (now - lastRun >= limit) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      lastRun = now;
      func(...args);
    } else {
      // Store args for the trailing edge execution
      lastArgs = args;

      // If no timeout is scheduled, schedule one for the end of the limit period
      if (!timeout) {
        timeout = setTimeout(() => {
          lastRun = Date.now();
          timeout = null;
          if (lastArgs) {
            func(...lastArgs);
            lastArgs = null;
          }
        }, limit - (now - lastRun));
      }
    }
  };

  const cancel = () => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
    lastArgs = null;
    lastRun = 0;
  };

  return Object.assign(throttled, { cancel });
}
