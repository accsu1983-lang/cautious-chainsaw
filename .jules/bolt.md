## 2025-05-22 - Optimizing High-Frequency Event Handlers

**Learning:** Throttling scroll events and using `requestAnimationFrame` for interaction handlers significantly reduces main thread overhead and prevents layout thrashing. Throttling to 100ms (10Hz) for UI visibility toggles provides a ~90% reduction in event handler execution while maintaining sufficient responsiveness. Using `{ passive: true }` for scroll listeners allows the browser to optimize scrolling by not waiting for the handler to finish.

**Action:** Always use `throttle` for scroll-dependent UI logic and `requestAnimationFrame` for high-frequency interactive updates (like sliders or dragging). Capture static dimensions (like `getBoundingClientRect`) once at the start of an interaction to avoid layout thrashing during the update loop.
