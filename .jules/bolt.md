# Bolt Performance Journal

## 2025-05-14 - Initializing Performance Optimization Tracking
**Learning:** High-frequency events like `scroll`, `mousemove`, and `touchmove` in this codebase are currently unthrottled, leading to potential layout thrashing and main-thread congestion.
**Action:** Implement a centralized `throttle` utility and use `requestAnimationFrame` for interactive UI elements to ensure 60fps performance and reduce CPU usage.
