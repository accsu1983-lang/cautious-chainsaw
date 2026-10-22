## 2025-07-07 - Optimize high-frequency event listeners
**Learning:** High-frequency events like 'scroll', 'mousemove', and 'touchmove' can cause layout thrashing and unnecessary re-renders if not handled properly. Throttling scroll events to 100ms and using `requestAnimationFrame` for drag interactions significantly reduces main-thread pressure and ensures visual updates are synced with the browser's refresh rate.
**Action:** Always use a throttle utility for scroll listeners and `requestAnimationFrame` with coordinate tracking for interactive drag/move components.
