/**
 * Throttles a function to only execute once every `ms` milliseconds.
 * Implements both leading and trailing edges to ensure the function
 * is called immediately on the first event and once more after the last event
 * (to capture the final state).
 *
 * @param fn The function to throttle.
 * @param ms The throttle interval in milliseconds.
 * @returns A throttled version of the function with a .cancel() method.
 */
export function throttle<T extends (...args: any[]) => void>(
  fn: T,
  ms: number
): ((...args: Parameters<T>) => void) & { cancel: () => void } {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  let lastArgs: Parameters<T> | null = null;
  let lastCallTime = 0;

  const throttled = (...args: Parameters<T>) => {
    const now = Date.now();
    const remaining = ms - (now - lastCallTime);

    lastArgs = args;

    if (remaining <= 0 || remaining > ms) {
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
      lastCallTime = now;
      fn(...args);
    } else if (!timeoutId) {
      timeoutId = setTimeout(() => {
        lastCallTime = Date.now();
        timeoutId = null;
        if (lastArgs) {
          fn(...lastArgs);
          lastArgs = null;
        }
      }, remaining);
    }
  };

  throttled.cancel = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
    lastArgs = null;
  };

  return throttled;
}
