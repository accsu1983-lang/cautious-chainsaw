/**
 * Simple throttle utility to limit the rate at which a function can fire.
 * @param func The function to throttle
 * @param wait The number of milliseconds to wait between invocations
 * @returns A throttled version of the function with a .cancel() method
 */
export function throttle<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): T & { cancel: () => void } {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  let lastArgs: any[] | null = null;
  let lastCallTime = 0;

  const throttled = (...args: any[]) => {
    const now = Date.now();
    const remaining = wait - (now - lastCallTime);

    if (remaining <= 0) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      lastCallTime = now;
      func(...args);
    } else {
      lastArgs = args;
      if (!timeout) {
        timeout = setTimeout(() => {
          lastCallTime = Date.now();
          timeout = null;
          if (lastArgs) {
            func(...lastArgs);
            lastArgs = null;
          }
        }, remaining);
      }
    }
  };

  throttled.cancel = () => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
    lastArgs = null;
    lastCallTime = 0;
  };

  return throttled as unknown as T & { cancel: () => void };
}
