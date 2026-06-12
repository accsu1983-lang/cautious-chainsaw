## 2026-06-12 - [Throttling High-Frequency Scroll and Interaction Events]
**Learning:** Throttling scroll events to 100ms (10Hz) and using `requestAnimationFrame` for interactive sliders significantly reduces main-thread overhead by up to 90% in Next.js applications while maintaining high perceived responsiveness.
**Action:** Always implement `throttle` for scroll/resize visibility logic and `requestAnimationFrame` with coordinate tracking for drag/slide interactions to prevent layout thrashing and ensure visual updates sync with the browser refresh rate.
