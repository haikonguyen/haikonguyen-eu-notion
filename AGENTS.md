<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

This is the root instruction file for `haikonguyen-eu-notion`. It contains global rules. For scoped rules, see `src/app/AGENTS.md`, `src/components/AGENTS.md`, `src/features/AGENTS.md`, `src/lib/AGENTS.md`, and `src/app/api/AGENTS.md`.

- **Next.js 16.3+** (App Router, `src/app/`)
- **React 19.2+**
- **TypeScript 7.x** (strict mode)
- **Tailwind CSS 4.x** for new UI
- **Biome 2.5+** (lint + format; do not reintroduce ESLint)
- **next-intl** (i18n — never hardcode UI strings)
- **Zustand** for client session state (cart, nav, toast)
- **Keystatic** (local Git CMS) for blog + About Story; **Cloudflare R2** for CMS media
- **Tailwind CSS only.** Do not add MUI, Emotion, or CSS-in-JS.

## Layout

- `src/app/`: routes, layouts, metadata, Route Handlers (`/keystatic` admin is chrome-free)
- `src/features/`: cohesive feature modules (blog, portfolio, contact, cart, home, about, account, services)
- `src/components/`: shared UI (`ui/`, `layout/`, `common/`)
- `src/lib/`: Keystatic reader, R2 helpers, store, hooks, i18n loaders
- `src/actions/`: Server Actions only (e.g. R2 presigned upload URL)
- `content/`: Keystatic Markdoc posts + About Story + portfolio YAML collections (no image binaries)
- `messages/`: translation files (`en`, `cs`, `vi`)
- `i18n/`: next-intl routing + request config
- `proxy.ts`: request gateway when locale routing or session work is added (`middleware.ts` is deprecated in Next.js 16)

## 1. Next.js 16 + TypeScript

- NEVER use `any`. Use `unknown` and type predicates.
- Use `satisfies` for type inference with validation.
- Extract inline object types into named `interface` or `type` (prefer `types.ts`).
- NEVER use an `I` prefix for interfaces (`Props`, not `IProps`).
- Component props: `[ComponentName]Props` (e.g. `CartHeaderProps`).
- Use **enums** over string unions for fixed known sets. Microsoft style: PascalCase enum name and PascalCase members (`enum PortfolioCategory { All = "All" }`).
- UI components: **PascalCase** files (`CartHeader.tsx`, `PostHero.tsx`, `BentoGrid.tsx`). Never kebab-case for JSX components.
- Feature UI folders: **PascalCase** when they own a component surface (`PostCard/`, `BookingForm/`).
- Non-component modules: **kebab-case** (`get-page-slug.ts`, `load-locale-messages.ts`, `create-contact-schema.ts`).
- Hooks: `use` + camelCase file (`useCartBadgeCount.ts`, `useCarousel.ts`).
- Symbols: `camelCase` functions/variables, `PascalCase` types/components/enums, `SCREAMING_SNAKE_CASE` for true constants.
- Props: named `[ComponentName]Props` interfaces — do not inline `{ foo: string }` on exported component signatures.
- Forms: `react-hook-form` + Zod + shared `@components/ui/form` fields. See `SKILLS.md` §5.
- Path aliases already in `tsconfig.json` (`@components/*`, `@features/*`, `@lib/*`, `@/*`). Prefer them over deep relatives.

## 2. Modern JavaScript / React 19

- NEVER `import React from "react"`. Use named imports (`import { useState } from "react"`).
- ES6+: arrow functions, destructuring, optional chaining, nullish coalescing.
- Prefer `async/await` over `.then()`.
- React 19 compiler: avoid `useMemo`, `useCallback`, and `memo` unless profiling shows they are required.
- **Avoid `useEffect` by default.** Prefer derive-during-render, lazy `useState(() => …)`, event handlers, or adjusting state during render when props change. Effects are only for real external sync (DOM APIs, subscriptions, service workers). Never use effects for init-once values, mirroring props → state, or data fetching.
- **Prefer Zustand over prop drilling** for cross-tree client state (cart, toast, nav). Presentational components may still take props; containers subscribe to the store.
- **Resolve derived values at the leaf.** Pass a stable id/slug; look up the image/label where it is used.

## 3. Clean code

- Intention-revealing names. Booleans use `is`, `has`, `should`.
- Write self-explanatory code; **zero obvious comments**. Comments only for non-obvious *why*.
- **No dead code**: unused imports, unused variables, commented-out code.
- **Low cognitive complexity**: no deeply nested `if/else` or nested ternaries. Extract pure functions. Keep Biome complexity under 15.
- Ternaries: single-line only (`isOpen ? "value" : "other"`).
- **Maximum 150 lines per file.** If larger, extract (see `SKILL-refactor-component.md`).
- **No pass-through wrappers** that only call one other function with the same arguments.
- **No magic numbers** — named constants in `constants.ts` / feature constants.
- Shared page rhythm lives in `src/components/layout/global-styles.ts`. Import tokens; do not duplicate `pt-16 sm:pt-20 …` strings.

## 4. i18n

- Always use `next-intl`. No hardcoded user-facing strings (labels, titles, placeholders, aria-labels, empty states, validation messages).
- Server Components: `const t = await getTranslations("Namespace");`
- Client Components: `const t = useTranslations("Namespace");`
- Add keys to `messages/en.json` first, then `cs.json` and `vi.json`.

## 5. Commands

- `npx biome check --write .` for lint/format.
- `npx tsc --noEmit` after structural changes.
- `npm run dev` to start locally (`next dev --turbopack`).
