/**
 * A TypeScript-safe throttle utility that ensures a function is called at most once
 * per specified wait period. Includes a .cancel() method for cleanup.
 */
export interface ThrottledFunction<T extends (...args: any[]) => any> {
  (...args: Parameters<T>): void;
  cancel(): void;
}

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ThrottledFunction<T> {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  let previous = 0;

  const throttled = function (this: any, ...args: Parameters<T>) {
    const now = Date.now();
    const remaining = wait - (now - previous);

    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      func.apply(this, args);
    } else if (!timeout) {
      timeout = setTimeout(() => {
        previous = Date.now();
        timeout = null;
        func.apply(this, args);
      }, remaining);
    }
  };

  throttled.cancel = function () {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
    previous = 0;
  };

  return throttled as ThrottledFunction<T>;
}
