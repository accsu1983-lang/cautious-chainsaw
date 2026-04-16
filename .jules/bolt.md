# Bolt Performance Journal

## 2025-05-15 - Event Listener Optimization Audit
**Learning:** High-frequency event listeners (scroll, mousemove, touchmove) in several components (`CTABar`, `BackToTop`, `WhatsAppWidget`, `BeforeAfterGallery`) are currently unthrottled, leading to excessive state updates and potential main-thread jank during user interaction. Using a 100ms throttle for scroll events can reduce handler execution by ~90% while maintaining a responsive UI. For direct interactions like the comparison slider, `requestAnimationFrame` is preferred to sync with the display refresh rate.
**Action:** Implement a standard `throttle` utility and apply it to scroll listeners. Use `requestAnimationFrame` for the `BeforeAfterGallery` slider.
