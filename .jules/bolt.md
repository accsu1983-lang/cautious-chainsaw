## 2025-06-11 - Throttling Scroll-Dependent Visibility Logic
**Learning:** Throttling high-frequency events like 'scroll' to 100ms (10Hz) reduces main-thread overhead by approximately 90% while maintaining sufficient responsiveness for UI state transitions. Using passive event listeners further improves scrolling performance by allowing the browser to optimize scroll handling.

**Action:** Always throttle scroll and resize listeners in React components using a 100ms interval and use `{ passive: true }` when `preventDefault()` is not required.
