/**
 * A robust throttle utility that limits the execution of a function to once every wait milliseconds.
 * Supports leading and trailing edge execution.
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  options: { leading?: boolean; trailing?: boolean } = {}
): T & { cancel: () => void } {
  let timeout: ReturnType<typeof setTimeout> | null = null
  let previous = 0
  let lastArgs: any[] | null = null
  let lastContext: any = null

  const { leading = true, trailing = true } = options

  const later = () => {
    previous = leading === false ? 0 : Date.now()
    timeout = null
    if (lastArgs) {
      func.apply(lastContext, lastArgs)
      lastArgs = lastContext = null
    }
  }

  const throttled = function (this: any, ...args: any[]) {
    const now = Date.now()
    if (!previous && leading === false) previous = now
    const remaining = wait - (now - previous)
    lastContext = this
    lastArgs = args

    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      previous = now
      func.apply(lastContext, lastArgs)
      lastArgs = lastContext = null
    } else if (!timeout && trailing !== false) {
      timeout = setTimeout(later, remaining)
    }
  } as T & { cancel: () => void }

  throttled.cancel = () => {
    if (timeout) {
      clearTimeout(timeout)
      timeout = null
    }
    previous = 0
    lastArgs = lastContext = null
  }

  return throttled
}
