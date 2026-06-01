export function throttle<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  options: { leading?: boolean; trailing?: boolean } = {}
) {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  let previous = 0;
  let lastArgs: any[] | null = null;
  let lastContext: any = null;

  const throttled = function (this: any, ...args: any[]) {
    const now = Date.now();
    if (!previous && options.leading === false) previous = now;
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
      if (!timeout) {
        lastContext = null;
        lastArgs = null;
      }
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(() => {
        previous = options.leading === false ? 0 : Date.now();
        timeout = null;
        func.apply(lastContext, lastArgs as any[]);
        lastContext = null;
        lastArgs = null;
      }, remaining);
    }
  };

  throttled.cancel = () => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = null;
    previous = 0;
    lastArgs = null;
    lastContext = null;
  };

  return throttled as T & { cancel(): void };
}
