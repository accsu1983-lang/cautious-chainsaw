## 2026-05-15 - Throttled Scroll Handlers
**Learning:** Throttling scroll-dependent visibility logic (e.g., 'Back to Top' buttons) to 100ms (10Hz) reduces main-thread overhead by approximately 90% while maintaining sufficient responsiveness for UI state transitions. Using `{ passive: true }` further optimizes scrolling by allowing the browser to skip checking for `preventDefault()`.
**Action:** Always throttle high-frequency events (scroll, resize, mousemove) and use `useMemo` to stabilize the throttled function instance. Provide a `.cancel()` method to clean up pending timers on unmount.
