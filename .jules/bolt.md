## 2025-05-15 - Event Listener Optimization Strategy

**Learning:** High-frequency event listeners (scroll, mousemove, touchmove) are a common source of main-thread congestion in landing pages with interactive elements. For visibility toggles (like "Back to Top" buttons), a 100ms throttle is sufficient to maintain responsiveness while reducing execution frequency by ~90%. For visual interactions requiring high fidelity (like image sliders), `requestAnimationFrame` is superior to throttling as it aligns updates with the browser's refresh rate, preventing visual tearing.

**Action:** Use `throttle(fn, 100)` for scroll-dependent UI state and `requestAnimationFrame` for high-fidelity mouse/touch interactions. Always use `{ passive: true }` for listeners that don't call `preventDefault()` to avoid scroll-blocking.
