/**
 * A robust throttle utility that ensures a function is called at most once
 * per specified wait period. Supports leading and trailing edges.
 * Correctly updates arguments for the trailing-edge execution.
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): T & { cancel: () => void } {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  let previous = 0;
  let lastArgs: Parameters<T> | null = null;
  let lastContext: any = null;

  const throttled = function (this: any, ...args: Parameters<T>) {
    const now = Date.now();
    const remaining = wait - (now - previous);

    lastContext = this;
    lastArgs = args;

    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      func.apply(lastContext, lastArgs);
      lastArgs = lastContext = null;
    } else if (!timeout) {
      timeout = setTimeout(() => {
        previous = Date.now();
        timeout = null;
        if (lastArgs) {
          func.apply(lastContext, lastArgs);
          lastArgs = lastContext = null;
          previous = Date.now();
        }
      }, remaining);
    }
  };

  throttled.cancel = () => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
    previous = 0;
    lastArgs = lastContext = null;
  };

  return throttled as T & { cancel: () => void };
}
