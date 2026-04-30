## 2025-05-14 - Event Throttling for UI Components
**Learning:** High-frequency event listeners (scroll, mousemove, touchmove) are a common performance bottleneck in interactive landing pages. Throttling scroll listeners to 100ms reduces execution frequency by ~90% while remaining responsive. `requestAnimationFrame` is ideal for frame-perfect UI updates like sliders.
**Action:** Always use `throttle` for scroll/resize and `requestAnimationFrame` for interactive dragging. Ensure `{ passive: true }` is set for scroll/touch listeners where `preventDefault` is not needed.
