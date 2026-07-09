# Bolt Performance Journal

## 2025-05-15 - [Throttling Scroll Listeners]
**Learning:** High-frequency event listeners (scroll) in multiple floating components can cause unnecessary main-thread load and layout recalculations. Using a custom throttle utility with `{ passive: true }` and `useMemo` for handler persistence ensures optimal performance and session stability.
**Action:** Always throttle scroll/resize handlers and ensure `.cancel()` is called on unmount to prevent memory leaks.
