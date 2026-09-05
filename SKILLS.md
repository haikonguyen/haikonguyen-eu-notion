# Skills & Development Guidelines

This file extends `AGENTS.md` and is the convention checklist for every change.

## 1. Type safety and enums

- Always use `enum` instead of string unions for predefined options, tabs, categories, and config labels.
- Microsoft naming: PascalCase enum (`enum PortfolioCategory`) and PascalCase members (`All = "All"`).

## 2. File and directory naming

- React components that return JSX: `PascalCase.tsx` (`BentoGrid.tsx`, `BookingForm.tsx`). Never `kebab-case.tsx` for components.
- Feature component folders that own a UI surface: `PascalCase/` (`PostCard/`, `BookingForm/`, `ContactForm/`).
- Context providers: PascalCase (`ThemeContext.tsx`).
- Utilities / helpers / schemas: `kebab-case.ts` (`create-booking-schema.ts`, `nav-items.ts`).
- Hooks: `useCamelCase.ts` (`useCarousel.ts`, `useCartBadgeCount.ts`).
- Next.js 16 request gateway: `proxy.ts` exporting `proxy`. Do not add `middleware.ts`.

## 3. TypeScript

- Prefer inference for locals, helpers, and private return types.
- Use explicit types for exported APIs, shared `types.ts`, and `[ComponentName]Props`.
- Prefer `satisfies`, `as const`, discriminated unions, `import type`, and type predicates over `as` assertions.
- Never use `any`. Narrow `unknown` at boundaries (CMS payloads, `fetch` JSON, URL params).

## 4. Refactoring

- When a file exceeds 150 lines, follow `SKILL-refactor-component.md`.
- After splits, run `npx tsc --noEmit` and `npx biome check --write .`.
- Preserve or improve inference; do not add types that duplicate the implementation.

## 5. React, state, and forms

- Avoid `useEffect` unless syncing with an external system (DOM, SW, third-party widget).
- Prefer Zustand for wizard/session client state. Do not thread store-backed values through intermediate parents.
- Client forms: `react-hook-form` + Zod resolver (`@hookform/resolvers/zod`). Build schemas with `t()` so validation messages are translated.
- Reuse shared field primitives from `@components/ui/form` (`FormTextField`, `FormTextareaField`, `FormSubmitButton`, `FormField`). Do not duplicate label / input / error markup per form.
- Prefer `register` (or `Controller` when needed) through those shared fields — not raw uncontrolled HTML forms.
- Server mutations: Server Actions in `src/actions/` (`"use server"`), Zod at the boundary, serializable `{ success, message | errors }` results.
- Toast: current `Toast` bridges the Zustand slice. Prefer shadcn/Base UI toast once `components.json` is initialized; do not invent a second toast API.
- No magic numbers. No pass-through wrappers. Extract `[ComponentName]Props` interfaces — never inline prop object types on exported components.

## 6. i18n (next-intl)

- Every user-visible string goes through `next-intl`.
- Namespaces match the feature (`Cart`, `Portfolio`, `Nav`, `Home`).
- Keep `messages/en.json` the source of truth for key shape; other locales must have the same keys.
