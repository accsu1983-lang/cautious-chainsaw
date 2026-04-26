# Bolt's Performance Journal

## 2025-05-14 - Event Listener Optimization: Throttle vs. requestAnimationFrame
**Learning:** High-frequency events (scroll, mousemove, touchmove) can saturate the main thread if left unoptimized. For visibility toggles (like "Back to Top" or "CTA Bar"), a 100ms (10Hz) throttle is sufficient and reduces execution frequency by ~90%. For visual interactions that must feel perfectly fluid (like a comparison slider), `requestAnimationFrame` (rAF) is superior as it gates updates to the monitor's refresh rate (typically 60Hz), preventing redundant calculations for frames that will never be rendered.

**Action:**
- Use 100ms `throttle` for non-visual logic (scroll-based triggers).
- Use `requestAnimationFrame` for interaction-heavy visual updates (sliders, parallax).
- Always use `{ passive: true }` for scroll listeners when not calling `preventDefault()`.
- Wrap throttled/rAF-gated handlers in `useMemo` within React components to maintain instance stability across re-renders.
