# Bolt's Performance Journal

## 2025-02-18 - Throttling Scroll Listeners
**Learning:** High-frequency scroll events in CTABar, BackToTop, and WhatsAppWidget were firing at ~100Hz, causing unnecessary main-thread work. Throttling to 100ms (10Hz) maintains UI responsiveness while reducing handler execution by ~90%.
**Action:** Always use throttled handlers for scroll-dependent visibility logic.

## 2025-02-18 - rAF for Interaction Smoothness
**Learning:** The BeforeAfterGallery slider was updating on every mouse/touch move event, which can exceed the display's refresh rate. Using `requestAnimationFrame` ensures that state updates are synchronized with the frame budget, providing a smoother feel and avoiding wasted work.
**Action:** Use rAF for drag/slider components to ensure 60fps-compliant updates.
