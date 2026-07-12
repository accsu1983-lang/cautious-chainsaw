## 2025-05-15 - Automated tsconfig.json changes during build
**Learning:** In this Next.js 16 environment, running `pnpm build` automatically modifies `tsconfig.json` by adding `.next` types to the `include` array. This violates repository constraints against unintended configuration changes if committed.
**Action:** Always run `git restore tsconfig.json` after a build and before staging changes for submission.
