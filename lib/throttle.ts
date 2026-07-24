/**
 * ⚡ BOLT OPTIMIZATION: A lightweight, robust leading & trailing edge throttle function
 * designed to minimize main-thread execution on high-frequency browser events
 * like scroll, resize, or mousemove.
 */
export function throttle<T extends (...args: any[]) => void>(
  func: T,
  limit: number
): T & { cancel: () => void } {
  let timer: ReturnType<typeof setTimeout> | null = null;
  let lastArgs: any[] | null = null;
  let lastThis: any = null;

  const throttled = function (this: any, ...args: any[]) {
    if (timer) {
      lastArgs = args;
      lastThis = this;
      return;
    }

    func.apply(this, args);

    const run = () => {
      timer = setTimeout(() => {
        if (lastArgs) {
          func.apply(lastThis, lastArgs);
          lastArgs = null;
          lastThis = null;
          run();
        } else {
          timer = null;
        }
      }, limit);
    };

    run();
  } as any;

  throttled.cancel = () => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    lastArgs = null;
    lastThis = null;
  };

  return throttled;
}
