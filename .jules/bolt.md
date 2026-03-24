# Bolt's Performance Journal ⚡

## 2025-05-15 - [Initial Performance Audit]
**Learning:** Identified non-critical floating widgets (`WhatsAppWidget`, `BackToTop`, `ExitIntentPopup`) as prime candidates for performance optimization. These components use `useEffect` for scroll listeners and are included in the initial SSR/Hydration bundle, despite being non-essential for the first paint (LCP). Additionally, scroll listeners in these components are not throttled, which can lead to layout thrashing and main-thread jank during scrolling.
**Action:** Implement lazy-loading for these components using `next/dynamic` with `ssr: false`. Use `requestAnimationFrame` and `passive: true` listeners for scroll events to reduce overhead.
