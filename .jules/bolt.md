## 2025-05-16 - Throttling High-Frequency Events
**Learning:** High-frequency events such as `scroll`, `mousemove`, and `touchmove` can trigger excessive re-renders and layout calculations if not properly throttled. In this project, multiple components were listening to `scroll` to toggle visibility, and an interactive gallery was recalculating its position on every `mousemove` event without any rate limiting.

**Action:**
1. Use a `throttle` utility for scroll-dependent logic (e.g., 100ms interval) to reduce main-thread overhead by ~90% while maintaining responsiveness.
2. Use `requestAnimationFrame` for high-frequency interaction events (like dragging a slider) to ensure updates align with the display refresh rate and avoid layout thrashing.
3. Always use `{ passive: true }` for scroll listeners that don't call `preventDefault()` to allow the browser to optimize scroll performance.
