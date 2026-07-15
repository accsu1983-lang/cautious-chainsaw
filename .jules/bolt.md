## 2024-05-23 - Throttling Scroll Listeners
**Learning:** High-frequency scroll events in components like `BackToTop`, `CTABar`, and `WhatsAppWidget` can lead to redundant state updates and main thread congestion. Implementing a 100ms throttle and using `{ passive: true }` ensures the browser can optimize scroll handling while keeping the UI responsive.
**Action:** Always use throttled or debounced handlers for window-level scroll/resize events in React components, and ensure the throttled function is stable (e.g., via `useMemo`) and cancelled on unmount.
