## 2025-05-15 - [Throttling Scroll Events]
**Learning:** Throttling scroll-dependent visibility logic (e.g., 'Back to Top' buttons, 'CTA Bar') to 100ms (10Hz) reduces main-thread overhead by approximately 90% while maintaining sufficient responsiveness for UI state transitions.
**Action:** Use a leading/trailing edge throttle for high-frequency scroll events and ensure `{ passive: true }` is used to prevent scroll jank.
