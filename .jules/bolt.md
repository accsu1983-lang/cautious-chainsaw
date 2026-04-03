# Bolt's Performance Journal

## 2025-05-14 - Throttling High-Frequency Scroll Events
**Learning:** High-frequency scroll event listeners in `CTABar`, `BackToTop`, and `WhatsAppWidget` were triggering state updates on every scroll pixel, potentially causing main-thread congestion. Using a custom `throttle` utility (100ms) with both leading and trailing edges ensures responsive UI state changes while significantly reducing unnecessary React re-renders and computations during active scrolling.
**Action:** Always prefer throttled or debounced event listeners for scroll, resize, or mousemove events that trigger React state updates or expensive calculations.
