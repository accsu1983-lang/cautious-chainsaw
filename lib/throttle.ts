/**
 * Simple, typed throttle utility function with leading and trailing edge support
 * and a `.cancel()` method to clear pending timeouts.
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  options: { leading?: boolean; trailing?: boolean } = {}
): ((...args: Parameters<T>) => void) & { cancel: () => void } {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  let previous = 0;
  let lastArgs: Parameters<T> | null = null;

  const leading = options.leading !== false;
  const trailing = options.trailing !== false;

  const throttled = function (...args: Parameters<T>) {
    const now = Date.now();
    if (!previous && !leading) {
      previous = now;
    }

    const remaining = wait - (now - previous);
    lastArgs = args;

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

  throttled.cancel = function () {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
    previous = 0;
    lastArgs = null;
  };

  return throttled;
}
