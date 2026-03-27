## 2026-03-27 - [Initial Performance Patterns]
**Learning:** Found multiple high-frequency event listeners (scroll, mousemove, touchmove) that can be throttled with requestAnimationFrame. This is a common pattern for smooth interactions and reduced main-thread overhead.
**Action:** Implement requestAnimationFrame throttling for these listeners across the codebase.
