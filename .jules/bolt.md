## 2025-05-14 - Throttling BeforeAfterGallery slider events
**Learning:** High-frequency scroll and move events should be throttled using `requestAnimationFrame` to ensure state updates and re-renders are synced with the browser's refresh rate, reducing main-thread overhead and improving responsiveness on lower-end devices.
**Action:** Always check for high-frequency event listeners (scroll, resize, mousemove, touchmove) and implement `requestAnimationFrame` throttling with a `ticking` flag to optimize performance.

## 2025-05-14 - Capturing event data for async callbacks
**Learning:** When using `requestAnimationFrame` or other asynchronous callbacks inside an event listener, it's safer to capture the required properties from the event object (e.g., `clientX`) into local variables before the callback. This avoids potential issues where the event object might be nullified or reused by the browser before the callback executes.
**Action:** Capture necessary event properties into local variables before passing them to `requestAnimationFrame`.
