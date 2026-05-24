## 2025-05-14 - Event Listener Optimizations (Scroll & Interaction)
**Learning:** High-frequency event listeners (scroll, mousemove, touchmove) are a primary source of main-thread congestion. Throttling scroll-dependent visibility logic to 100ms (10Hz) reduces handler execution by ~90% while maintaining UI responsiveness. For interactive components like sliders, `requestAnimationFrame` is superior to throttling as it prevents layout thrashing by syncing DOM updates with the browser's refresh rate.

**Action:** Always use `{ passive: true }` for scroll listeners that don't call `preventDefault()`. Use `requestAnimationFrame` with a coordinate-tracking variable for interactive 'drag' behaviors to ensure 60fps performance and avoid stale state updates.
