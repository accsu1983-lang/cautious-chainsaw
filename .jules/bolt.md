## 2025-05-14 - Optimized High-Frequency Event Handlers

**Learning:** High-frequency events like `scroll`, `mousemove`, and `touchmove` can cause significant performance bottlenecks if they trigger heavy computations or multiple React state updates per frame. Throttling scroll events to 100ms (10Hz) provides a good balance between responsiveness and performance, reducing event handler execution by ~90%. For smooth interactive components like the `BeforeAfterGallery`, using `requestAnimationFrame` ensures updates are synchronized with the browser's refresh rate and prevents layout thrashing by caching static dimensions (like `getBoundingClientRect`) before the interaction begins.

**Action:** Always throttle scroll listeners and use `requestAnimationFrame` for interactive dragging/moving components. Cache container dimensions on `mousedown`/`touchstart` instead of reading them inside move handlers.
