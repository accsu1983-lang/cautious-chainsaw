## 2025-05-14 - [Event Listener Optimization]
**Learning:** Throttling high-frequency events (scroll/mouse/touch) to 100ms or using `requestAnimationFrame` significantly reduces main-thread overhead without compromising perceived responsiveness for UI state transitions. Caching bounding rectangles on interaction start (e.g., mousedown) prevents layout thrashing during drag operations.
**Action:** Always prefer throttled listeners for visibility toggles and `requestAnimationFrame` for coordinate-based interactive components.
