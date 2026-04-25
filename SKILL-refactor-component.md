**Description**: Break a React/TS module over 150 lines into small, named pieces.

1. **Analyze**: List responsibilities (header, empty state, list row, summary, data, URL sync).
2. **Extract types**: Shared `interface` / `type` / `enum` → `types.ts` (or colocate if used once). Prefer inference for implementation details. Use `satisfies` / `as const` for literals.
3. **Extract utilities**: Pure helpers (filters, slug, cover URL) → `utils.ts` or a kebab-case module.
4. **Extract constants**: Magic strings, galleries, static arrays → `constants.ts`.
5. **Extract sub-components**: New PascalCase files. Example: `CartPage` → `CartHeader`, `CartEmptyState`, `CartItemRow`, `CartSummary`.
6. **Reassemble**: Original file imports and renders the pieces. Pages in `src/app/` stay thin.
7. **Verify**: `npx tsc --noEmit`, then `npx biome check --write .`.
