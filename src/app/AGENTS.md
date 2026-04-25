These rules apply to `src/app/` and page-level UI.

- **Server Components by default.** `"use client"` only for state, effects, or DOM events.
- **Thin routes.** `page.tsx` fetches data, sets metadata, and renders a feature component. Do not dump 150+ lines of JSX in a route file.
- **Data fetching** happens in Server Components. Unwrap async `params` / `searchParams` with `await`.
- **Suspense** around any client child that uses `useSearchParams`.
- **i18n**: `const t = await getTranslations("Namespace");` in Server Components. `useTranslations` in client leaves.
- **Metadata** strings come from `getTranslations("Metadata")` (or a page namespace) — not hardcoded English.
- Use `cn()` for conditional classes.
- Import page rhythm from `@components/layout/global-styles` (`APP_PAGE_STACK_CLASS`, `APP_PAGE_PADDING_CLASS`).
- Prefer named exports for feature UI. Default export is allowed only for `page.tsx` / `layout.tsx` / `route.ts`.
- Explicit `type` on every `<button>`.
- File order: `"use client"` (if required) → imports → types → component.
