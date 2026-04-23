/**
 * A robust throttle utility that limits how often a function can be executed.
 *
 * @param func The function to throttle.
 * @param wait The number of milliseconds to throttle executions to.
 * @param options Options for leading/trailing execution.
 * @returns A throttled version of the function with a .cancel() method.
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  options: { leading?: boolean; trailing?: boolean } = {}
) {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  let previous = 0;
  let lastArgs: any[] | null = null;
  let lastContext: any = null;

  const { leading = true, trailing = true } = options;

  const throttled = function (this: any, ...args: Parameters<T>) {
    const now = performance.now();
    if (!previous && leading === false) previous = now;
    const remaining = wait - (now - previous);

    lastContext = this;
    lastArgs = args;

    if (remaining <= 0 || remaining > wait) {
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
      previous = now;
      func.apply(lastContext, lastArgs);
      lastArgs = null;
      lastContext = null;
    } else if (!timeoutId && trailing !== false) {
      timeoutId = setTimeout(() => {
        previous = leading === false ? 0 : performance.now();
        timeoutId = null;
        if (lastArgs) {
          func.apply(lastContext, lastArgs);
          lastArgs = null;
          lastContext = null;
        }
      }, remaining);
    }
  };

  throttled.cancel = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = null;
    previous = 0;
    lastArgs = null;
    lastContext = null;
  };

  return throttled;
}
