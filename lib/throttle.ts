/**
 * Throttles a function to execute at most once every `limit` milliseconds.
 * Includes both leading and trailing edge execution.
 *
 * @param func - The function to throttle
 * @param limit - The throttle limit in milliseconds
 * @returns A throttled version of the function with a .cancel() method
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): T & { cancel: () => void } {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  let lastArgs: any[] | null = null;
  let lastContext: any = null;

  const throttled = function (this: any, ...args: any[]) {
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
  } as any;

  throttled.cancel = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
    lastArgs = null;
    lastContext = null;
  };

  return throttled as T & { cancel: () => void };
}
