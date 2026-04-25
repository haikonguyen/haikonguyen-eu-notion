**Description**: Checklist for reviewing changes in this repo (React 19, Next.js 16 App Router, TypeScript strict, next-intl, Biome).

- [ ] **Server by default**: `"use client"` only when state, effects, or DOM events are required.
- [ ] **Data fetching**: Server Components fetch data. Do not fetch in `useEffect`.
- [ ] **Suspense**: Async client boundaries (e.g. `useSearchParams`) wrapped in `<Suspense>`.
- [ ] **Mutations**: Prefer Server Actions in `src/actions/` over new generic `src/app/api/` routes.
- [ ] **No `any`**: `unknown` + narrowing. No `as` on external input.
- [ ] **Validation**: Zod at network/URL/form boundaries.
- [ ] **`satisfies` / extracted types**: Config objects and props are named, not inline blobs.
- [ ] **File size**: Under 150 lines. If not, apply `SKILL-refactor-component.md`.
- [ ] **Low cognitive complexity**: Nested conditionals and giant JSX extracted. Biome complexity < 15.
- [ ] **Naming**: Booleans `is` / `has` / `should`. Intention-revealing. Enums for fixed sets.
- [ ] **Zero obvious comments**. No dead code.
- [ ] **Avoid `useEffect`**: Derive during render, event handlers, or Zustand.
- [ ] **Modern JS**: Optional chaining, nullish coalescing, destructuring.
- [ ] **Conditional classes**: `cn()` (`clsx` + `tailwind-merge`).
- [ ] **Accessibility**: Explicit `type` on `<button>`. Meaningful `aria-label` via `t()`.
- [ ] **i18n**: No hardcoded UI strings. `getTranslations` / `useTranslations`. Keys in all locale files.
- [ ] **No MUI / Emotion**: UI is Tailwind. Do not reintroduce `@mui/*` or `@emotion/*`.

When reviewing, structure the response as:

1. **High-level summary**
2. **Critical issues**
3. **Suggestions**
4. **Action items**
