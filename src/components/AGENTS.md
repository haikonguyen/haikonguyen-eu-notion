These rules apply to `src/components/`.

## Structure

- `ui/`: reusable primitives (`BentoGrid`, `Carousel`, `PhotoLightbox`, `VideoModal`, `form/`). PascalCase component files.
- `ui/form/`: shared react-hook-form field primitives (`FormTextField`, `FormTextareaField`, `FormSubmitButton`). Feature forms compose these — do not copy input markup.
- `layout/`: shell, nav, footer. PascalCase component files; kebab-case helpers (`nav-items.ts`).
- `common/`: favicon, hero, toast, social icons. PascalCase component files (`Toast.tsx`).
- `pwa/`: service worker registration (effects are allowed here — real external sync).
- Non-component modules: kebab-case. Hooks: `useCamelCase.ts`.

See root `AGENTS.md` for naming, 150-line limit, and i18n.

## Global layout styles

Reuse tokens from `@components/layout/global-styles`. Do not copy page padding / background class strings.

```tsx
import { APP_PAGE_STACK_CLASS } from "@components/layout/global-styles";

<main className={APP_PAGE_STACK_CLASS}>…</main>
```

- `APP_PAGE_PADDING_CLASS` — public page top/bottom padding (nav + bottom nav).
- `APP_PAGE_BACKGROUND_CLASS` — `bg-background min-h-screen`.
- `APP_PAGE_STACK_CLASS` — padding + background together.

Feature-local classes stay next to the component. Promote a class here only when it is used across pages.

## Do not

- Reintroduce MUI or Emotion.
- Nest extra wrapper `div`s that only set `flex` / `max-w-*` already expressible on the child.
- Hardcode labels; use `next-intl`.
