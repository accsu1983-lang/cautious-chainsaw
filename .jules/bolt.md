## 2025-05-14 - Redundant Throttled Execution
**Learning:** A standard throttle implementation that executes on the leading edge can cause a redundant second execution if not carefully managed. If the function is called once, and the timeout is scheduled without checking if a subsequent call actually happened, it might trigger twice for a single event.
**Action:** Ensure the throttle utility only schedules a trailing edge execution if a new set of arguments was received during the wait period.

## 2025-05-14 - Next.js 16 tsconfig.json Mutability
**Learning:** Next.js 16 (and some earlier versions) automatically modifies `tsconfig.json` during the build process to include dev types. This can conflict with repository constraints that forbid configuration changes.
**Action:** Always run `git restore tsconfig.json` after a build or dev session to revert automated changes and maintain codebase hygiene.
