/**
 * Creates a throttled function that only invokes `func` at most once per
 * every `wait` milliseconds.
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  options: { leading?: boolean; trailing?: boolean } = {}
): T & { cancel: () => void } {
  let timeout: ReturnType<typeof setTimeout> | null = null
  let previous = 0
  let result: any
  let lastArgs: any[] | null = null
  let context: any

  const { leading = true, trailing = true } = options

  const later = function () {
    previous = leading === false ? 0 : Date.now()
    timeout = null
    if (lastArgs) {
      result = func.apply(context, lastArgs)
      lastArgs = null
      context = null
    }
  }

  const throttled = function (this: any, ...args: any[]) {
    const now = Date.now()
    if (!previous && leading === false) previous = now
    const remaining = wait - (now - previous)
    context = this
    lastArgs = args

    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null
      }
      previous = now
      result = func.apply(context, lastArgs)
      lastArgs = null
      context = null
    } else if (!timeout && trailing !== false) {
      timeout = setTimeout(later, remaining)
    }
    return result
  } as any

  throttled.cancel = function () {
    if (timeout) {
      clearTimeout(timeout)
      timeout = null
    }
    previous = 0
    lastArgs = null
    context = null
  }

  return throttled
}
