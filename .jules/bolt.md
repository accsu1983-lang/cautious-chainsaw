# ⚡ Bolt Performance Journal

## 2025-05-14 - [High-frequency Event Optimization]
**Learning:** Scroll events and mouse/touch interactions in the comparison gallery were unoptimized, leading to potential main thread congestion and jank. Throttling scroll events to 100ms and using `requestAnimationFrame` for the comparison slider ensures smooth performance without sacrificing responsiveness.
**Action:** Always throttle scroll listeners for non-critical UI updates and use `requestAnimationFrame` for any frame-by-frame visual updates like sliders or animations.
