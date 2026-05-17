## 2025-05-17 - Throttling High-Frequency UI Events

**Learning:** Unthrottled scroll and interaction events (mousemove, touchmove) can execute dozens of times per second, causing unnecessary main-thread overhead and potentially layout thrashing if they trigger synchronous layout measurements (like `getBoundingClientRect`). Throttling to 100ms (10Hz) for visibility checks reduces execution frequency by ~90% while maintaining sufficient responsiveness for UI state transitions. For smooth interactive animations, `requestAnimationFrame` is superior as it synchronizes updates with the browser's paint cycle and naturally prevents double-firing within a single frame.

**Action:** Always throttle scroll-dependent visibility logic to 100ms and use `requestAnimationFrame` for input-driven visual updates. Capture static dimensions once at the start of an interaction (e.g., `mousedown`) to avoid repeated layout triggers inside high-frequency handlers.
