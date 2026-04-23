# Bolt's Performance Journal - Critical Learnings

## 2025-04-23 - Throttling High-Frequency Events
**Learning:** Throttling scroll events to 100ms (10Hz) significantly reduces main-thread overhead for non-critical UI updates (like showing/hiding a Back to Top button) without impacting perceived responsiveness. For interactive components like a comparison slider, `requestAnimationFrame` is superior as it synchronizes with the browser's paint cycle, but it's critical to capture the latest input coordinates (like `clientX`) *outside* the frame callback to ensure the update uses the most current state when it finally executes.
**Action:** Use the central `throttle` utility for scroll/resize events and `requestAnimationFrame` with input capturing for drag/move interactions.
