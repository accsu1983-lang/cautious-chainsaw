## 2025-05-14 - [Event Optimization Patterns]
**Learning:** For high-frequency interactions like image sliders, `requestAnimationFrame` with a "ticking" flag is more efficient than a repeated cancel/reschedule pattern. For scroll-based visibility toggles, a 100ms throttle provides the best balance between performance (90% reduction in calls) and perceived responsiveness.
**Action:** Use the "ticking" flag pattern for all future rAF-based event handlers and prefer `throttle` over `debounce` for scroll-linked UI updates.

## 2025-05-14 - [Environment Hygiene]
**Learning:** Next.js dev server (especially with Turbopack) may automatically update `tsconfig.json` to include `.next` types. This violates "Never modify tsconfig.json" boundaries.
**Action:** Always verify `git status` before submission and manually revert any automated config changes.
