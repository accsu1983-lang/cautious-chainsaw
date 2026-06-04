## 2025-05-22 - [Optimized Event Listeners & RAF Interaction]
**Learning:** High-frequency event listeners (scroll, mousemove, touchmove) without throttling or synchronization (RAF) create significant main-thread overhead and layout thrashing. Adding `{ passive: true }` to scroll listeners is a critical, zero-cost optimization.
**Action:** Always throttle scroll/resize handlers to ~100ms and use `requestAnimationFrame` for high-frequency interactive UI updates. Ensure document-level event listeners are cleaned up in `useEffect` to prevent memory leaks.
