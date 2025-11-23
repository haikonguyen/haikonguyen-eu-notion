# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

A personal blog and portfolio site built with Next.js, TypeScript, and Notion as a CMS. The site fetches blog posts from a Notion database and renders them using custom React components. Features include a contact form (via SendGrid), theme switching (light/dark mode), and static site generation.

## Development Commands

### Start Development Server
```bash
npm run dev
```
Runs Next.js with Turbopack for faster builds on http://localhost:3000

### Build for Production
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

### Lint Code
```bash
npm run lint
```

## Architecture

### Next.js Pages Router Structure
- Uses Pages Router (not App Router)
- Pages in `/pages/` directory: `index.tsx`, `about.tsx`, `blog.tsx`, `contact.tsx`
- Dynamic routes: `/pages/post/[id].tsx` for individual blog posts
- API routes: `/pages/api/sendgrid.tsx` for contact form submission

### Notion Integration
The site uses Notion as a headless CMS:
- `utils/notion.tsx` contains all Notion API interactions
- `getDatabase()` fetches blog posts from Notion database
- `getPage()` and `getBlocks()` retrieve individual post content
- `renderBlock()` converts Notion blocks to React components
- Supports nested blocks (e.g., toggle blocks) via `getNestedChildBlock()`
- Content types defined in `enums/ContentBlockTypes`

### State Management (Zustand)
Located in `/state/` directory:
- Central store in `state/store.ts` using Zustand with devtools and persist middleware
- State slices pattern:
  - `mainNavSlice.ts` - navigation drawer state
  - `paletteModeSlice.ts` - theme (light/dark) mode persistence
  - `toastSlice.ts` - notification/toast messages
- Only `paletteMode` is persisted to localStorage (see `partialize` in store config)

### Component Architecture
Components in `/components/` organized by feature:
- Each component has its own directory with an index file
- Main barrel export in `components/index.ts`
- Key components:
  - `Layout` - wraps all pages with navigation/footer
  - `Hero` - homepage hero section with background image
  - `PostCard` & `PostList` - blog post display
  - `NotionBlocks` & `NotionText` - render Notion content
  - `ContactForm` - form with react-hook-form and Zod validation
  - `ThemeSwitcher` - light/dark mode toggle

### Styling
- **TailwindCSS** for utility classes (v4.x)
- **Material-UI (MUI)** for components (v7.x with Emotion)
- Custom theme in `/themes/main-theme.tsx` with palette mode switching
- Global styles in `/styles/index.css`
- Glass morphism effects via `GlassWrapper` component

### TypeScript Configuration
- Path aliases configured in `tsconfig.json`:
  - `@components` → `components/`
  - `@utils/*` → `utils/*`
  - `@state/*` → `state/*`
  - `@themes/*` → `themes/*`
  - `@images/*` → `public/assets/images/*`
  - `*` → `types/*` (for type imports)
- Strict mode enabled

## Environment Variables

Required environment variables (create `.env.local`):
```
NOTION_API_KEY=        # Notion integration API key
DATABASE_ID=           # Notion database ID containing blog posts
SENDGRID_API_KEY=      # SendGrid API key for contact form
```

## Key Development Patterns

### Adding Notion Block Types
To support new Notion block types:
1. Add type to `ContentBlockTypes` enum in `/enums/`
2. Update `renderBlock()` switch statement in `utils/notion.tsx`
3. Create corresponding component if needed

### State Management Pattern
Create new state slices following the pattern in `/state/slices/`:
1. Define slice creator function with `StateCreator<StoreProps>`
2. Export slice functions (state + actions)
3. Add to store composition in `state/store.ts`
4. Update `StoreProps` type in `state/types.ts`

### Image Configuration
Remote image domains configured in `next.config.js`:
- Notion CDN domains
- AWS S3 buckets
- Unsplash, Google CDN
Check config before adding new external image sources

## Code Style

- **Prettier**: Single quotes, 80 char width, 2 space tabs (see `.prettierrc.json`)
- **ESLint**: Next.js recommended + TypeScript + Prettier integration
- **Husky**: Pre-commit hooks configured in `.husky/`
