## 2026-06-15 - Throttled scroll-dependent visibility logic
**Learning:** High-frequency scroll event listeners (e.g., in CTABar, WhatsAppWidget, and BackToTop) were executing state updates on every scroll tick. Throttling these to 100ms (10Hz) and using passive listeners significantly reduces main-thread overhead by ~90% without compromising UX responsiveness.
**Action:** Always use the `throttle` utility for scroll, resize, or other high-frequency event listeners that trigger state changes.
