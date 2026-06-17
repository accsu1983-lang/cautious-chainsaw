/**
 * Throttles a function to only execute once every `limit` milliseconds.
 * This implementation ensures the function is called at the beginning of the interval
 * and also at the end of the interval if it was called during the interval.
 */
export function throttle<T extends (...args: any[]) => void>(
  func: T,
  limit: number
): T & { cancel: () => void } {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  let lastArgs: any[] | null = null;
  let lastThis: any = null;

  const throttled = function (this: any, ...args: any[]) {
    if (timeoutId) {
      // Save the latest arguments to execute at the end of the interval
      lastArgs = args;
      lastThis = this;
      return;
    }

    // Execute immediately (leading edge)
    func.apply(this, args);

    timeoutId = setTimeout(() => {
      timeoutId = null;
      if (lastArgs) {
        // Execute the latest call that happened during the interval (trailing edge)
        func.apply(lastThis, lastArgs);
        lastArgs = null;
        lastThis = null;
      }
    }, limit);
  };

  (throttled as any).cancel = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
    lastArgs = null;
    lastThis = null;
  };

  return throttled as T & { cancel: () => void };
}
