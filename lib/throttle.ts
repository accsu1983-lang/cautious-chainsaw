/**
 * Simple throttle utility that ensures a function is called at most once every `wait` milliseconds.
 * Provides a leading-edge execution and a trailing-edge execution if another call was made during the wait period.
 */
export function throttle<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): {
  (...args: Parameters<T>): void;
  cancel: () => void;
} {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  let lastArgs: Parameters<T> | null = null;
  let lastContext: any = null;
  let previous = 0;

  const later = () => {
    previous = Date.now();
    timeout = null;
    if (lastArgs) {
      func.apply(lastContext, lastArgs);
      lastArgs = lastContext = null;
    }
  };

  const throttled = function (this: any, ...args: Parameters<T>) {
    const now = Date.now();
    const remaining = wait - (now - previous);

    lastArgs = args;
    lastContext = this;

    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      func.apply(lastContext, lastArgs);
      lastArgs = lastContext = null;
    } else if (!timeout) {
      timeout = setTimeout(later, remaining);
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

  return throttled;
}
