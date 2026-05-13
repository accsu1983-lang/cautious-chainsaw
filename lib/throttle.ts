/**
 * Throttles a function to only execute once every `wait` milliseconds.
 * Provides a leading and trailing edge execution.
 *
 * @param func The function to throttle.
 * @param wait The number of milliseconds to wait between executions.
 * @returns A throttled version of the function.
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  let lastArgs: Parameters<T> | null = null;
  let lastContext: any = null;

  const later = () => {
    if (lastArgs) {
      func.apply(lastContext, lastArgs);
      lastArgs = null;
      lastContext = null;
      timeout = setTimeout(later, wait);
    } else {
      timeout = null;
    }
  };

  return function(this: any, ...args: Parameters<T>) {
    if (timeout) {
      lastArgs = args;
      lastContext = this;
    } else {
      func.apply(this, args);
      timeout = setTimeout(later, wait);
    }
  };
}
