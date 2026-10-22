/**
 * A robust TypeScript implementation of a throttle function.
 * Throttles execution of a function, ensuring it only runs at most once
 * per `wait` milliseconds. Supports leading and trailing execution options.
 */
export interface ThrottleOptions {
  leading?: boolean;
  trailing?: boolean;
}

export interface ThrottledFunction<T extends (...args: any[]) => any> {
  (...args: Parameters<T>): void;
  cancel(): void;
}

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  options: ThrottleOptions = {}
): ThrottledFunction<T> {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  let previous = 0;
  let lastArgs: Parameters<T> | null = null;

  const leading = options.leading !== false;
  const trailing = options.trailing !== false;

  const throttled = (...args: Parameters<T>) => {
    const now = Date.now();
    lastArgs = args;

    if (!previous && !leading) {
      previous = now;
    }

    const remaining = wait - (now - previous);

    if (remaining <= 0 || remaining > wait) {
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
      previous = now;
      func(...args);
      lastArgs = null;
    } else if (!timeoutId && trailing) {
      timeoutId = setTimeout(() => {
        previous = leading ? Date.now() : 0;
        timeoutId = null;
        if (lastArgs) {
          func(...lastArgs);
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
    previous = 0;
    lastArgs = null;
  };

  return throttled;
}
