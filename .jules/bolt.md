# Bolt's Performance Journal

Critical learnings only.

## 2025-05-28 - [Event Throttling & rAF Optimization]
**Learning:** High-frequency event handlers (scroll, mousemove, touchmove) can significantly impact main-thread performance and cause layout thrashing if not managed properly. Throttling scroll events to 100ms reduces execution frequency by ~90% while maintaining UI responsiveness. Using `requestAnimationFrame` for dragging interactions ensures updates are synced with the browser's refresh rate.
**Action:** Always use `throttle` for scroll/resize events and `requestAnimationFrame` for interactive dragging or animation-heavy logic. Capture static dimensions once at the start of an interaction to avoid layout-triggering methods like `getBoundingClientRect()` inside high-frequency loops.
