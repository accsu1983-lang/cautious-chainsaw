## 2026-07-06 - Optimized high-frequency event handlers
**Learning:** Throttling high-frequency events like scroll (100ms) and mousemove (requestAnimationFrame) significantly reduces CPU load and layout thrashing in React applications. Caching bounding rectangles during the start of an interaction (e.g., mousedown) prevents repeated expensive `getBoundingClientRect` calls during move events.
**Action:** Always use throttling for scroll listeners and RAF for drag interactions.
