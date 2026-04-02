# Bolt Performance Journal ⚡

## 2025-04-02 - High-frequency event optimization
**Learning:** Scroll and mouse/touch events can fire many times per second, far exceeding the browser's refresh rate (60fps). This leads to unnecessary computations and re-renders, causing main thread jank and decreased responsiveness, especially on mobile devices.
**Action:** Use a `throttle` utility for scroll events and `requestAnimationFrame` for mouse/touch-move events to synchronize updates with the display refresh rate and reduce CPU load.
