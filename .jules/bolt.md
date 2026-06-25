## 2025-05-15 - Throttling Scroll Events
**Learning:** High-frequency events like scroll, resize, and mousemove can fire dozens of times per second, leading to excessive state updates and potential layout thrashing if the handlers perform expensive work or trigger re-renders. Throttling these events to a reasonable frequency (e.g., 100ms or 10Hz) significantly reduces main-thread overhead while maintaining perceived responsiveness for UI transitions.

**Action:** Always use a throttle or debounce utility for document-level scroll and resize listeners. For interaction-heavy logic (like sliders), use `requestAnimationFrame` for even smoother updates.
