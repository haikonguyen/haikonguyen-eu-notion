---
name: refactor-component
description: Split React or TypeScript files over 150 lines into types, utils, constants, and PascalCase sub-components. Use when a file is too large, nested, or the user asks to refactor a component.
---

# Refactor component

Follow [SKILL-refactor-component.md](../../../SKILL-refactor-component.md).

Keep `src/app/**/page.tsx` thin: move UI into `src/features/<name>/components/`.
