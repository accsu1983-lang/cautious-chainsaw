/**
 * Throttles a function to only execute once every `delay` milliseconds.
 *
 * @param func - The function to throttle
 * @param delay - The delay in milliseconds
 * @returns A throttled version of the function
 */
export function throttle<T extends (...args: any[]) => void>(func: T, delay: number): T {
  let lastCall = 0;
  let timeout: NodeJS.Timeout | null = null;
  let lastArgs: any[] | null = null;

  return function(this: any, ...args: any[]) {
    const now = Date.now();
    const remaining = delay - (now - lastCall);

    if (remaining <= 0 || remaining > delay) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      lastCall = now;
      func.apply(this, args);
    } else if (!timeout) {
      lastArgs = args;
      timeout = setTimeout(() => {
        lastCall = Date.now();
        timeout = null;
        if (lastArgs) {
          func.apply(this, lastArgs);
          lastArgs = null;
        }
      }, remaining);
    }
  } as T;
}
