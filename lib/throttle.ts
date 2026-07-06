/**
 * Simple throttle implementation to limit the execution frequency of a function.
 * Ensures the function is called at most once every `limit` milliseconds.
 * Includes trailing edge execution to ensure the final state is captured.
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

  const throttled = function (this: any, ...args: Parameters<T>) {
    if (timeoutId) {
      lastArgs = args;
      lastContext = this;
      return;
    }

    func.apply(this, args);

    timeoutId = setTimeout(() => {
      timeoutId = null;
      if (lastArgs) {
        const argsToUse = lastArgs;
        const contextToUse = lastContext;
        lastArgs = null;
        lastContext = null;
        throttled.apply(contextToUse, argsToUse);
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

  return throttled;
}
