These rules apply to `src/lib/`.

- Notion, ImageKit, Zustand stores, and shared hooks live here.
- File names: kebab-case for modules, `useCamelCase.ts` for hooks.
- Do not put React UI in `lib/`.
- Do not hand-write Notion row types that already exist on `BlogPage` in `src/types/notion.ts`. Extend that interface instead of `as any`.
- Validate URL params and external JSON with Zod or type guards before use.
- i18n message loading lives in `src/lib/i18n/`. Do not import `messages/*.json` from random features.
