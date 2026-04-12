## 2025-05-15 - [High-Frequency Event Optimization]
**Learning:** Throttling scroll events (100ms) with `{ passive: true }` and using `requestAnimationFrame` for interaction-heavy move events significantly reduces main thread workload during user interaction. Capturing event properties like `clientX` before the `rAF` callback is essential to avoid issues with event object pooling in asynchronous contexts.
**Action:** Always prefer throttled or `rAF`-synced handlers for high-frequency events (`scroll`, `mousemove`, `touchmove`).

## 2025-05-15 - [Next.js 16 Auto-Config Reversion]
**Learning:** `pnpm build` in Next.js 16 (with Turbopack) automatically modifies `tsconfig.json` to include `.next` type paths. This violates strict "no-modification" constraints on configuration files.
**Action:** Manually revert `tsconfig.json` changes and remove any generated log files (`dev_server.log`) before submission.
