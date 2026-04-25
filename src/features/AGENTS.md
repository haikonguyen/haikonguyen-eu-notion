These rules apply to `src/features/`.

Each feature is self-contained:

- `components/`: PascalCase UI files and folders (`CartHeader.tsx`, `PostCard/`, `BookingForm/`)
- `hooks/`: `useCamelCase.ts`
- `utils/` / schemas: kebab-case helpers (`create-booking-schema.ts`)
- `types.ts`, `constants.ts`, enums as needed
- Forms compose `@components/ui/form` + `useForm` + Zod schemas built with `t()`

## Isolation

- Minimize imports from other features. Shared logic goes to `src/lib/` or `src/components/`.
- Pages in `src/app/` import from the feature barrel (`@features/cart`, `@features/portfolio`).

## Modularity

- Keep files under 150 lines.
- Named exports. Do not default-export utilities or hooks.
- No derived prop drilling: pass ids/slugs; resolve labels/images in the leaf (or a util it calls).
- Zustand for cart and other session client state.
- Avoid `useEffect` unless syncing with the DOM or a third-party widget.
- Always `next-intl` for copy.
