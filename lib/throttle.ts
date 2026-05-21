/**
 * Simple throttle implementation that ensures a function is only called at most once
 * in every 'wait' milliseconds.
 *
 * Includes support for:
 * - Leading edge execution (first call fires immediately)
 * - Trailing edge execution (last call fires after the wait period)
 * - .cancel() method to stop pending executions
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  options: { leading?: boolean; trailing?: boolean } = {}
) {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  let previous = 0;
  let latestArgs: any[] | null = null;
  let context: any = null;

  const throttled = function (this: any, ...args: Parameters<T>) {
    const now = Date.now();
    if (!previous && options.leading === false) previous = now;
    const remaining = wait - (now - previous);
    context = this;
    latestArgs = args;

    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      func.apply(context, latestArgs);
      if (!timeout) {
        context = null;
        latestArgs = null;
      }
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(() => {
        previous = options.leading === false ? 0 : Date.now();
        timeout = null;
        func.apply(context, latestArgs!);
        if (!timeout) {
          context = null;
          latestArgs = null;
        }
      }, remaining);
    }
  };

  throttled.cancel = function () {
    if (timeout) {
      clearTimeout(timeout);
    }
    previous = 0;
    timeout = null;
    context = null;
    latestArgs = null;
  };

  return throttled as T & { cancel(): void };
}
