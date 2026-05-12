## 2026-05-12 - [Layout Thrashing in High-Frequency Events]
**Learning:** Calling `getBoundingClientRect()` inside high-frequency event handlers or `requestAnimationFrame` loops triggers forced synchronous layouts (layout thrashing). Even when attempting to optimize with rAF, reading geometry values that require a layout recalculation before a write can nullify performance gains.
**Action:** Always capture static geometry (like container dimensions) once at the start of an interaction (e.g., `mousedown`, `touchstart`) and reuse those values during the high-frequency update phase.
