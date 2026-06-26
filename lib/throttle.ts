/**
 * Throttles a function to only execute once every `limit` milliseconds.
 * Ensures the first call is executed immediately and the last call
 * is executed after the limit has passed.
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) & { cancel: () => void } {
  let timeoutId: NodeJS.Timeout | null = null
  let lastArgs: Parameters<T> | null = null
  let lastThis: any = null

  const throttledFn = function(this: any, ...args: Parameters<T>) {
    if (timeoutId) {
      lastArgs = args
      lastThis = this
      return
    }

    func.apply(this, args)

    const timeoutHandler = () => {
      timeoutId = null
      if (lastArgs) {
        const argsToUse = lastArgs
        const thisToUse = lastThis
        lastArgs = null
        lastThis = null
        func.apply(thisToUse, argsToUse)
        timeoutId = setTimeout(timeoutHandler, limit)
      }
    }

    timeoutId = setTimeout(timeoutHandler, limit)
  }

  throttledFn.cancel = () => {
    if (timeoutId) {
      clearTimeout(timeoutId)
      timeoutId = null
    }
    lastArgs = null
    lastThis = null
  }

  return throttledFn as any
}
