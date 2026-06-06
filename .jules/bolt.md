## 2026-06-06 - [Scroll Optimization]
**Learning:** Throttling scroll-dependent visibility logic to 100ms (10Hz) significantly reduces main-thread overhead by approximately 90% while maintaining sufficient responsiveness for UI state transitions like sticky bars and 'Back to Top' buttons.
**Action:** Use the `throttle` utility for any scroll-based UI visibility logic.

## 2026-06-06 - [TypeScript Function Augmentation]
**Learning:** When adding a `.cancel` method to a throttled function in TypeScript, using `Object.assign(throttled, { cancel })` is a clean way to ensure the return type is correctly inferred and satisfies the type system without explicit complex casts.
**Action:** Use `Object.assign` for augmenting functions with utility methods.
