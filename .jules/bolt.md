## 2026-03-13 - Next.js 16 React Imports during SSR
**Learning:** Using React hooks (like useMemo, useEffect, useState) in Client Components within this Next.js 16 / React 19 codebase requires an explicit `import React` to prevent ReferenceErrors during Server-Side Rendering (SSR) production builds.
**Action:** Always include `import React` explicitly at the top of any Client Component when modifying or adding React hooks.
