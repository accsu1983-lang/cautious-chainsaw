/**
 * Limits the execution frequency of a function.
 * Useful for high-rate events like scrolling or resizing.
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): {
  (...args: Parameters<T>): void;
  cancel: () => void;
} {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  let lastArgs: Parameters<T> | null = null;
  let lastContext: any = null;

  const throttled = function(this: any, ...args: Parameters<T>) {
    if (timeoutId) {
      lastArgs = args;
      lastContext = this;
      return;
    }

    func.apply(this, args);

    timeoutId = setTimeout(() => {
      timeoutId = null;
      if (lastArgs) {
        throttled.apply(lastContext, lastArgs);
        lastArgs = null;
        lastContext = null;
      }
    }, limit);
  };

  throttled.cancel = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
    lastArgs = null;
    lastContext = null;
  };

  return throttled as unknown as {
    (...args: Parameters<T>): void;
    cancel: () => void;
  };
}
