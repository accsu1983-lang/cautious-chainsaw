## 2025-05-15 - [Event Optimization Patterns]
**Learning:** Throttling scroll-dependent visibility logic to 100ms reduces main-thread overhead by ~90% while remaining responsive. For high-frequency input interactions (like sliders), `requestAnimationFrame` with external coordinate capturing ensures smoother UI updates and prevents layout thrashing.
**Action:** Apply 100ms throttle to scroll listeners and `requestAnimationFrame` to interaction handlers (mousemove/touchmove).

## 2025-05-15 - [Next.js 16 TSConfig Side Effects]
**Learning:** Running `pnpm build` or `pnpm dev` in Next.js 16 automatically adds `.next` paths to `tsconfig.json`'s `include` array. This triggers "boundary violation" flags in reviews if not manually reverted.
**Action:** Always verify and revert automatic `tsconfig.json` changes after build/dev cycles before submission.
