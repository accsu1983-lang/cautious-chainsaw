## 2025-06-14 - High-Frequency Event Optimization

**Learning:** High-frequency events like `scroll`, `mousemove`, and `touchmove` can significantly impact main-thread performance. Throttling scroll events to ~100ms (10Hz) provides a good balance between responsiveness and efficiency, reducing handler execution by ~90%. For interactive drag components, using `requestAnimationFrame` to batch state updates and caching `getBoundingClientRect` outside the move loop (e.g., during `mousedown`) prevents layout thrashing and ensures smooth visual updates.

**Action:** Always throttle scroll-dependent visibility logic and use `requestAnimationFrame` for custom interactive drag/move components. Ensure container dimensions are cached at the start of an interaction rather than recalculated during movement.
