These rules apply to `src/lib/`.

- Keystatic reader, R2 helpers, Zustand stores, and shared hooks live here.
- File names: kebab-case for modules, `useCamelCase.ts` for hooks.
- Do not put React UI in `lib/`.
- Blog post shapes live in `src/lib/keystatic/types.ts` — keep them flat (no Notion property nesting).
- Validate URL params and external JSON with Zod or type guards before use.
- i18n message loading lives in `src/lib/i18n/`. Do not import `messages/*.json` from random features.
