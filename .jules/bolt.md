## 2026-05-08 - Optimize high-frequency event listeners
**Learning:** Throttling scroll events to 100ms reduces handler execution by ~90%, significantly lowering main-thread work for simple UI state toggles. Using `requestAnimationFrame` for interactive sliders ensures updates are capped at the display refresh rate (e.g., 60fps), preventing redundant calculations and state updates during rapid mouse/touch movements.
**Action:** Use a `throttle` utility for scroll-dependent logic and `requestAnimationFrame` for complex interactive state updates in all future components.
