# Product Backlog: PWA Liquid Glass Transformation

> **Project**: [haikonguyen.eu](https://www.haikonguyen.eu)  
> **Target Release**: Modern Native-like Progressive Web App (PWA) with Liquid Glass Aesthetic  
> **Base Branch**: `feature/new-ui` (branched from `dev`)  
> **Design Inspiration**: `haianbeauty` architecture, iOS liquid glass design, mobile-first native PWA patterns.

---

## 🌟 1. Vision & Architectural Overview

The goal of this transformation is to evolve the current web portfolio into a high-performance, mobile-first **Progressive Web App (PWA)** featuring a **Liquid Glass** aesthetic. The app delivers a dual-context experience:

1. **Public View**: High-impact marketing & portfolio hub presenting personal brand narrative, latest articles (Keystatic + Cloudflare R2 CMS — see Epic 6), portfolio items from Keystatic (Epic 6.2: software / photography / vlogs), interactive CV, service offerings (Web Development, Photography, Video), cart, and quick-action launchers.
2. **Authenticated User View**: Native dashboard containing client profile status, upcoming service bookings with reschedule/cancellation, visit/inquiry history, saved favorites, and preferences.

### Key Design Pillars

- **Liquid Glass Aesthetic**: Translucent frosted glass layers (`backdrop-blur-2xl`, `border-white/10`, specular highlights, luminous cyan accents, soft ambient glows).
- **Mobile-First Native App Feel**: Floating top header pill, fixed floating bottom navigation bar with active tab indicators, spring animations, drawer sheets for actions, safe-area inset compliance (`env(safe-area-inset-*)`), and tap-highlight suppression.
- **Unified Responsive Shell**: Seamless transition from floating mobile pill elements to expansive, multi-column desktop dashboards.

---

## 🗺️ 2. Information Architecture & Navigation Logic

```mermaid
graph TD
    App[PWA Application Shell] --> Header[Floating Top Pill Header]
    App --> MainContent[Dynamic Page View]
    App --> BottomNav[Floating Bottom Navigation]

    subgraph NavigationTabs [Core Navigation Tabs]
        Home["🏠 Home (Marketing, Blog, CV, Featured Work, Quick Actions)"]
        Services["⚡ Services (Web Dev, Photography, Video)"]
        Cart["🛒 Cart (Service Selection & Checkout)"]
        Account["👤 Account / Profile (Auth & Client Dashboard)"]
        Favorites["❤️ Favorites (Saved Articles & Projects - Authenticated)"]
    end

    BottomNav --> Home
    BottomNav --> Services
    BottomNav --> Cart
    BottomNav --> Account

    subgraph PublicView [Public Experience]
        Home
        Services
        Cart
        Login["Sign In / Register"]
    end

    subgraph AuthView [User Signed-In Experience]
        Dashboard["Client Dashboard"]
        Upcoming["Upcoming Bookings & Consultations"]
        History["Past Orders & Invoices"]
        Favs["Favorites"]
        Settings["Account Settings"]
    end

    Account -->|Logged Out| Login
    Account -->|Logged In| Dashboard
    Dashboard --> Upcoming
    Dashboard --> History
    Dashboard --> Favs
    Dashboard --> Settings
```

---

## 📋 3. Epics & Ticket Breakdown

### 🔷 Epic 1: PWA & Liquid Glass Core Foundation (Milestone 1 — Current Branch: `feature/new-ui`)

_Establish the foundational architecture, design tokens, layout shell, and navigation infrastructure._

#### `TICKET-PWA-00`: Upgrade Dependencies to Latest & Next.js 16.3.1 (Instant Navigation Support)

- **Description**: Upgrade core dependencies to match latest stable versions, specifically Next.js `^16.3.1`, React `19.2.7`, Tailwind CSS `4.3.1`, Zustand `5.0.14`, and add `lucide-react` for clean native-like icons, enabling Next.js 16.3+ instant navigation capabilities and prefetching.
- **Tasks**:
  - Update `package.json` with latest dependencies.
  - Configure `next.config.js` with performance / instant navigation settings.
  - Verify clean TypeScript build and dependency resolution.
- **Acceptance Criteria**: All packages updated to target versions without breaking changes; zero dependency conflicts.

#### `TICKET-PWA-01`: PWA Configuration & Mobile Web Native Shell

- **Description**: Configure Next.js Web App Manifest, Service Worker registration, and mobile-native viewport settings.
- **Tasks**:
  - Implement dynamic Next.js manifest (`src/app/manifest.ts`) with standalone display mode, theme colors, and icons.
  - Setup Service Worker registration (`src/components/pwa/PWARegister.tsx` + `public/sw.js`) with offline caching shell.
  - Configure viewport meta tags in `src/app/layout.tsx` for iOS safe-area handling (`viewport-fit=cover`).
  - Add native touch optimizations to global CSS (`-webkit-tap-highlight-color: transparent`, `overscroll-behavior: none`).
- **Acceptance Criteria**: App is installable as a standalone PWA on iOS/Android; passes PWA audit; notch safe-areas correctly padded.

#### `TICKET-PWA-02`: Liquid Glass Design Tokens & Tailwind Theme

- **Description**: Extend Tailwind 4 theme with glassmorphism utilities, luminous color tokens, and spring animation keyframes.
- **Tasks**:
  - Define CSS custom properties for frosted glass surfaces (`--glass-bg`, `--glass-border`, `--glass-blur`).
  - Configure brand accents: Cyan Glow (`#06b6d4`), Pure Charcoal/OLED Black (`#050505`), Translucent White overlays.
  - Add micro-interaction keyframes for sheet drawers, smooth fade-ins, and active tab scalings.
- **Acceptance Criteria**: Glassmorphism cards and navigation bars render consistently with specular highlights and smooth backdrop blur across both Dark and Light modes.

#### `TICKET-PWA-03`: `AppPageShell` & Adaptive Layout Wrapper

- **Description**: Create a shared layout shell (`AppPageShell`) that handles top floating header spacing, bottom navigation clearance, and responsive constraints.
- **Tasks**:
  - Create `AppPageShell.tsx` supporting multiple container sizes (`Default`, `Auth`, `Cart`, `Checkout`, `FullBleed`).
  - Implement automatic padding calculations using `env(safe-area-inset-top)` and `env(safe-area-inset-bottom)`.
  - Wrap application pages in `AppPageShell`.
- **Acceptance Criteria**: Content never clips behind floating top pill or bottom nav bar across all viewport sizes.

#### `TICKET-PWA-04`: Floating Liquid Glass Navigation Suite

- **Description**: Build floating top header and bottom navigation components with public/auth awareness.
- **Tasks**:
  - **Desktop Floating Header (`HeaderToolbar.tsx`)**: Centered glass pill for navigation links, right-hand pill for user avatar/login, cart badge, and theme toggle.
  - **Mobile Floating Header**: Compact brand logo pill + notification drawer trigger.
  - **Mobile Bottom Navigation (`BottomNavigation.tsx`)**: Floating bottom glass dock featuring 4-5 tabs (Home, Services, Cart with live count badge, Account) with active pill indicators and scale micro-interactions.
  - Create `src/components/layout/nav-items.ts` to manage tab configuration dynamically based on authentication state.
- **Acceptance Criteria**: Bottom navigation stays anchored and responds dynamically to active routes; tap states provide tactile feedback.

---

### 🔷 Epic 2: Public View – Modular Marketing & Interactive Home Hub (Milestone 2)

_Redesign the landing page into a native-like mobile personal brand hub._

#### `TICKET-HOME-01`: Native-First Hero & Quick-Action Launcher

- **Description**: Build the top hero profile card and 2x2 quick action launcher grid based on the mobile design.
- **Tasks**:
  - Hero card with rounded-3xl profile image, "Digital Studio" badge, title, and "View Latest Work" CTA button.
  - 2x2 Quick Action Grid:
    - 📅 **Book a 1:1**: Opens consultation modal/drawer.
    - ✉️ **Contact Me**: Direct trigger to contact sheet.
    - 📄 **Interactive CV**: Smooth scroll or modal trigger to CV view.
    - 📷 **Gear List / Work**: Direct shortcut to equipment & setup breakdown.
- **Acceptance Criteria**: Matches mobile native design mockup with glassmorphic tactile buttons.

#### `TICKET-HOME-02`: "What's New" Blog Showcase (Keystatic)

- **Description**: Dynamic blog preview card/carousel on the home view fed by the Keystatic reader (depends on Epic 6 POC merged — `TICKET-CMS-03` done in PR #21).
- **Tasks**:
  - Article preview card with cover image (R2 URL via `next/image`), category/tag badge, publication date, title, and excerpt.
  - "Read Article →" link with page transition to `/post/[slug]` (current route; not `/blog/[slug]`).
- **Acceptance Criteria**: Renders latest posts from Keystatic with skeleton loading states; zero external CMS API calls.

#### `TICKET-HOME-03`: "Featured Work" Visual Showcase Hub

- **Description**: Interactive multi-disciplinary portfolio section featuring Web Dev, Photography, and Video.
- **Tasks**:
  - Category filtered grid/carousel (All, Dev, Photography, Vlogs).
  - Dev preview card with code syntax highlight snippet.
  - Photo preview card with lightbox zoom (`yet-another-react-lightbox`).
  - Vlog card with play button and video modal trigger.
- **Acceptance Criteria**: Seamless media previews with zero layout shifts and instant modal playback.

#### `TICKET-HOME-04`: Interactive CV & Career Journey Drawer

- **Description**: Modern interactive CV section with skill progress gauges, education credentials, and career timeline.
- **Tasks**:
  - Technical Arsenal skills grid with animated percentage bars.
  - Education & Certifications card.
  - Professional experience timeline with role descriptions and tech tags.
  - "Download PDF" resume action.
- **Acceptance Criteria**: Clean interactive display togglable between Story and CV modes.

---

### 🔷 Epic 3: Services & Booking / Inquiry Engine (Milestone 3)

_Build out dedicated service offerings, package pricing, and booking flows._

#### `TICKET-SRV-01`: Unified Services Catalog (`/services`)

- **Description**: Dedicated services catalog page with rich cards for each service discipline.
- **Tasks**:
  - **1. Web App Development**: Architecture, Full-stack Next.js, Performance Optimization, Custom UI/UX.
  - **2. Photography**: Commercial & Editorial, Event Coverage, Portrait Sessions, Visual Storytelling.
  - **3. Video & Filmmaking**: YouTube/Vlog Production, Promotional Teasers, Video Editing & Grading.
  - Deliverables checklist, estimated turnaround, and pricing/quote tiers for each service.
  - "Add to Cart" and "Inquire / Book" buttons.
- **Acceptance Criteria**: Clear, high-converting presentation of all offerings with direct cart integration.

#### `TICKET-SRV-02`: Interactive Consultation & Booking Flow

- **Description**: Multi-step booking/scheduling drawer for 1:1 sessions and service reservations.
- **Tasks**:
  - Date & time slot picker.
  - Scope questionnaire (project goals, budget, timelines).
  - Integration with calendar / Cal.com or direct inquiry dispatch via SendGrid.
- **Acceptance Criteria**: Users can book available slots with immediate validation and email confirmation.

---

### 🔷 Epic 4: Shopping Cart & Checkout Experience (Milestone 3)

_Implement cart state, floating badge indicators, and smooth checkout flow._

#### `TICKET-CART-01`: Persistent Cart Store & Floating Badge Indicator

- **Description**: Zustand-powered shopping & booking cart store with local storage persistence.
- **Tasks**:
  - State management for added services, consultation slots, and digital downloads.
  - Live count badge synchronized on desktop header and mobile bottom navigation.
- **Acceptance Criteria**: Items persist across page navigation and browser sessions.

#### `TICKET-CART-02`: Liquid Glass Cart Drawer & Checkout Summary (`/cart`, `/checkout`)

- **Description**: Slide-up liquid glass cart drawer on mobile and full checkout page on desktop.
- **Tasks**:
  - Itemized list with quantity adjustments, service notes, and remove actions.
  - Price summary breakdown (Subtotal, taxes/deposit if applicable).
  - Checkout form capturing client contact details and payment/inquiry submission.
- **Acceptance Criteria**: Seamless checkout experience with validation and success screen.

---

### 🔷 Epic 5: User Authentication & Client Dashboard (Milestone 4)

_Deliver full user dashboard, upcoming bookings management, and account settings._

#### `TICKET-AUTH-01`: Authentication Gateway & Session Management (`/login`, `/account`)

- **Description**: Unified login and registration modal/page with liquid glass styling.
- **Tasks**:
  - Magic Link / Email & Password authentication.
  - GitHub & Google OAuth login support.
  - Auth context & session hooks (`useAuth`, `useUser`).
- **Acceptance Criteria**: Secure session handling with automatic redirection and protected routes.

#### `TICKET-ACC-01`: Authenticated User Dashboard Layout (`/account`)

- **Description**: Responsive client dashboard inspired by `haianbeauty`.
- **Tasks**:
  - Desktop: Left sidebar with navigation tabs (Profile, Bookings, Favorites, History, Settings).
  - Mobile: Native segmented view or bottom sheet tab navigation.
  - Profile header with user avatar, name, and membership tier badge.
- **Acceptance Criteria**: Responsive split view on desktop and smooth native cards on mobile.

#### `TICKET-ACC-02`: Upcoming Bookings & Inquiries Management

- **Description**: Interactive cards for active bookings, upcoming consultations, and project milestones.
- **Tasks**:
  - Date & time badges with status indicators (Confirmed, Pending, In Review).
  - Reschedule and Cancellation actions with confirmation dialogs.
  - Direct link to meeting room or project briefing documents.
- **Acceptance Criteria**: Users can view and manage their scheduled services with real-time status updates.

#### `TICKET-ACC-03`: History, Invoices & Digital Assets

- **Description**: Historical log of completed services, past inquiries, downloadable invoices, and digital deliveries.
- **Tasks**:
  - Chronological list of completed projects and bookings.
  - Downloadable PDF invoices and receipts.
  - Download links for deliverables (photoshoots, code repositories, video edits).
- **Acceptance Criteria**: Complete historical audit trail accessible at any time.

#### `TICKET-ACC-04`: Favorites & Saved Content Hub (`/favorites`)

- **Description**: Bookmark and favorites hub for saved articles, projects, and service packages.
- **Tasks**:
  - Quick bookmarking toggle across blog posts, portfolio items, and services.
  - Dedicated favorites view under user account.
- **Acceptance Criteria**: Real-time bookmarking with instant UI feedback.

#### `TICKET-ACC-05`: Account Settings & Personalization

- **Description**: Client profile settings and display preferences.
- **Tasks**:
  - Update profile information (Name, Email, Phone, Company).
  - Notification preferences (Email notifications, booking reminders).
  - Theme mode toggle (Dark, Light, System) and language preferences.
- **Acceptance Criteria**: Preference changes persist immediately to database and local storage.

#### `TICKET-THEME-01`: Multi-Theme Engine & Light Mode Surface Adaptations

- **Description**: Complete color tokens and frosted glass adaptations for Light Mode across all pages, Bento grid cards, Notion blog renderers, forms, and custom components.
- **Tasks**:
  - Audit and replace hardcoded dark utility classes (`bg-black/85`, `bg-black/45`, `text-white`) with responsive theme-aware variables (`bg-card`, `bg-glass-surface`, `text-foreground`).
  - Create light-mode frosted glass variants with soft drop shadows and high-contrast typography.
  - Implement dynamic theme provider with system preference listener and instant toggle.
  - Adapt blog/Markdoc renderers (post-Keystatic) — not Notion block chrome.
- **Acceptance Criteria**: Seamless switching between Dark, Light, and System modes with full WCAG contrast and liquid glass styling across all 54 pages.

---

### 🔷 Epic 6: Keystatic CMS + Cloudflare R2 (Notion / ImageKit Replacement)

_Replace the Notion-backed blog + About Story pipeline with Keystatic (Git-based CMS). Store CMS media on Cloudflare R2 (not `public/`). Near-zero subscription cost. Clean Next.js App Router data loading instead of Notion block trees._

**Status**
- **POC (CMS-01 → CMS-05): DONE** — merged via [PR #21](https://github.com/haikonguyen/haikonguyen-eu-notion/pull/21).
- **CMS-06 (all blog posts): DONE** — **36** inventory slugs under `content/posts/*.mdoc` on `dev` (ImageKit URLs kept on purpose).
- **CMS-11 (YouTube embeds): DONE** — merged to `dev` ([PR #23](https://github.com/haikonguyen/haikonguyen-eu-notion/pull/23)).
- **Shipped shape (do not re-invent)**:
  - Config: root `keystatic.config.ts` (`storage.kind: 'local'`).
  - Collection `posts` → `content/posts/*.mdoc`; singleton `aboutStory` → `content/about-story.mdoc`.
  - Frontmatter: `title`, `publishedDate`, `excerpt`, `tags`, `authorName`, `coverImage` + Markdoc `content`.
  - Inline images: Markdoc **`R2Image`** (`src`, `alt`, `caption`) in `src/lib/keystatic/r2-image-component.ts`; public render `src/features/blog/components/R2CmsImage.tsx`.
  - YouTube embeds: Markdoc **`YouTubeEmbed`** (`url`, `title`, `caption`) in `src/lib/keystatic/youtube-embed-component.ts`; public render `src/features/blog/components/YouTubeEmbed.tsx`; URL helpers in `src/lib/youtube/*`.
  - Reader: `src/lib/keystatic/*` → `getAllPosts`, `getPostBySlug`, `getAboutStory`.
  - Admin: `/keystatic` via `npm run dev:keystatic` (Webpack — Turbopack breaks Keystatic UI).
- **Next session**: **Epic 6.2** — Portfolio items via Keystatic (`TICKET-PF-01` → `TICKET-PF-04`). Parallel polish: CMS-07 / CMS-08. CMS-10 (admin auth gate) when public Admin risk is prioritized. CMS-09 later.
- **Admin access note**: Keystatic has **no built-in password/login** for `storage.kind: 'local'`. `/keystatic` is open if deployed. See `TICKET-CMS-10`.

#### Context (read before implementing)

- **Routes**: `/blog`, `/post/[slug]`, About Story tab — do **not** invent `/blog/[slug]`.
- **i18n**: UI stays `next-intl` (`en`/`cs`/`vi`). CMS body stays **monolingual**.
- **Images during migration**: keep **ImageKit absolute URLs** in `coverImage` / `R2Image.src` (same as welcome post). Do **not** re-upload binaries to R2 in CMS-06.
- **Images long-term**: R2 + custom domain + `next/image` (CMS-09). App chrome may stay in `public/`.
- Follow root `AGENTS.md`: no `any`, no hardcoded UI strings, ≤150 LOC/file, Biome + `tsc`.

#### ✅ `TICKET-CMS-01` … `TICKET-CMS-05` — POC (completed)

Shipped in PR #21: Keystatic admin/API, R2 helpers + env stubs, reader rewire for blog/post/About, Notion/ImageKit runtime path removed from those routes, About Story + 1 real post migrated, caption polish, verification green.

---

### 🔷 Epic 6.1: Full Content Migration & CMS Polish (next session)

_Prerequisite: PR #21 merged into `dev`. Branch: `cursor/keystatic-migrate-all-posts-ff86`. Content-first; minimize code churn._

#### `TICKET-CMS-06`: Migrate All Remaining Blog Posts (ImageKit URLs) — **DONE** (merged to `dev`)

- **Status**: All **36** inventory posts present under `content/posts/YYYY-MM-DD-<slug>.mdoc`. Public URLs stay `/post/<slug>` via reader mapping. Typecheck + build green.

- **Description**: Bring the full production blog catalog into `content/posts/*.mdoc` using the welcome-post template. Keep ImageKit URLs for covers + inline images.
- **Gold template**: `content/posts/welcome-to-my-new-website.mdoc` (+ `content/about-story.mdoc` for singleton reference).
- **Inventory (35 remaining; skip if file already exists)**. Use these **exact production slugs** (from live ImageKit cover paths on `www.haikonguyen.eu/blog`):

| Year | Slug |
| ---: | --- |
| 2015 | `a-warm-winter-day-in-prague`, `an-old-friend-from-childhood`, `canon-fd-100mm-f2-8-ssc-review`, `canon-nfd-200-mm-f4-review`, `charles-bridge-photoshoot`, `prague-main-train-station-photoshoot`, `switching-from-canon-to-sony` |
| 2016 | `bangkok-city-of-angels`, `dr-jose-rizal-bridge`, `ha-long-bay-descending-dragon-bay`, `london-tower-bridge`, `my-cousin-hoai-anh`, `my-cousin-thao`, `pier-66`, `seattle-columbia-tower`, `the-emerald-city`, `the-hanoi-street-barber`, `vancouver-telus-world-of-science` |
| 2017 | `bitexco-tower-view`, `blue-hour-prague`, `heroes-square`, `hindu-prayers`, `ho-chi-minh-city`, `independence-palace`, `singapore`, `the-chain-bridge`, `the-hungarian-state-opera`, `vietnam-vlog-part-i-part-ii` |
| 2018 | `prague-heart-of-europe`, `rudolfinum`, `the-dancing-house`, `vlog-8-singapore`, `vlog-9-singapore-part-ii`, `vlog-10-budapest` |
| 2020 | _(done)_ `welcome-to-my-new-website` |
| 2022 | `next-js-review` |

- **Source priority**:
  1. Notion API export (if `NOTION_API_KEY` + blog database id are available) — preferred for fidelity.
  2. Else production `https://www.haikonguyen.eu/post/<slug>` + ImageKit convention `https://ik.imagekit.io/8qy7obkhf/haikonguyen-eu/blog/<year>/<slug>/…` (covers are typically `…/cover.jpg`).
- **Conversion rules** (match shipped schema exactly):
  - One file: `content/posts/<slug>.mdoc`.
  - Frontmatter keys **only**: `title`, `publishedDate` (`YYYY-MM-DD`), `excerpt`, `tags` (string array), `authorName` (default `Haiko Nguyen`), `coverImage` (absolute ImageKit URL; strip transform query `?tr=…` if present).
  - Body: Markdoc. Map Notion/HTML → paragraphs, headings, lists, links, quotes, code, dividers.
  - Every inline image → `{% R2Image src="…" alt="…" caption="…" /%}` (caption optional; `alt` required).
  - Do **not** commit image binaries. Do **not** change `keystatic.config.ts` unless blocked.
  - Preserve production slugs/URLs where possible.
- **Batching**: migrate by year (2015 → 2022); after each batch run `npm run typecheck` + `npm run build` and spot-check 1–2 slugs; commit per batch.
- **Acceptance Criteria**:
  - `content/posts/` has all **36** inventory slugs (including welcome).
  - `/blog` lists every post; `/post/<slug>` works for a sample from each year.
  - No Notion client reintroduced; ImageKit remains in `next.config.ts` `images.remotePatterns` until CMS-09.

#### `TICKET-CMS-12`: Soft Fade-In for Blog / CMS `next/image` — **DONE**

- **Status**: Shipped on `cursor/cms-image-fade-in-ac96`. Shared `FadeInImage` client wrapper fades opacity `0 → 100` on `onLoad` (500ms ease-out). Wired into `R2CmsImage` (inline Markdoc), `PostHero` cover, and `PostCard` covers. Avatar / chrome images unchanged.
- **Why**: CMS/post images already used `next/image` but painted abruptly as bytes arrived; no custom load transition existed.
- **Acceptance Criteria**: Post covers and inline R2 images fade in smoothly once decoded; hover scale on cards still works; `tsc` + Biome green.

#### `TICKET-CMS-07`: Keystatic Admin Preview for `R2Image` (`ContentView`)

- **Description**: Replace the bare “R2 IMAGE” chrome-only block in `/keystatic` with a thumbnail via Keystatic `ContentView` (fields stay built-in — no custom form framework).
- **Tasks**:
  - Extend `src/lib/keystatic/r2-image-component.ts` (or split `R2ImageContentView` if LOC limit bites) with `ContentView` rendering `<img>` when `value.src` is absolute / resolvable.
  - Keep edit fields `src`, `alt`, `caption` and existing `handleFile` upload behavior.
  - Prefer JSX in the component module (avoid renaming config to `.tsx` unless required).
  - Verify with `npm run dev:keystatic` (Webpack).
- **Acceptance Criteria**: About Story / post editors show a visible preview for populated `R2Image` blocks; drop-upload + paste URL still work.

#### `TICKET-CMS-08`: Notion Parity Extras (only if content needs them)

- **Description**: Add Markdoc components **only for block types that appear in migrated bodies** and lack a Markdoc equivalent.
- **Likely candidates** (old Notion renderer): `Todo`, `Toggle` / disclosure. Skip if CMS-06 can flatten without loss.
- **Note**: YouTube / video embeds are tracked separately as **`TICKET-CMS-11`** (proven need in vlog posts).
- **Tasks**:
  - During/after CMS-06, grep migrated `.mdoc` for gaps; implement only proven needs.
  - Each: Keystatic `block()` schema + public renderer in `MarkdocRenderer` map.
  - ≤150 LOC/file; no speculative unused components.
- **Acceptance Criteria**: No silent content loss vs production; unused components are not shipped.

#### `TICKET-CMS-11`: YouTube Embed Markdoc Component — **DONE** (merged to `dev` via [PR #23](https://github.com/haikonguyen/haikonguyen-eu-notion/pull/23))

- **Description**: Let admins insert YouTube links as a Keystatic Markdoc block (Haianbeauty `NotionMediaBlocks` parity) and render responsive embeds on blog posts.
- **Why**: Migrated vlog posts still dump YouTube as plain links / raw embed URLs; no admin insert path for embeds after Notion removal.
- **Tasks**:
  - Shared URL helpers in `src/lib/youtube/` (`parseYoutubeUrl`, `buildYoutubeEmbedUrl`, thumbnail URL) — support `watch`, `youtu.be`, `/embed/`, `/shorts/`, optional `&t=` / `start`.
  - Keystatic `YouTubeEmbed` block (`url`, optional `title` / `caption`) + admin `ContentView` thumbnail preview (`src/lib/keystatic/youtube-embed-component.ts`).
  - Public renderer `src/features/blog/components/YouTubeEmbed.tsx` registered in `MarkdocRenderer` + `keystatic.config.ts`.
  - Reuse helpers from portfolio `VideoModal` (remove local embed URL builder).
  - Convert dedicated vlog posts: `vietnam-vlog-part-i-part-ii`, `vlog-8-singapore`, `vlog-9-singapore-part-ii`, `vlog-10-budapest`.
  - i18n fallback iframe title (`YouTubeEmbed.defaultTitle` in `en` / `cs` / `vi`).
  - Out of scope: R2 native `<video>` uploads, Vimeo / arbitrary iframes, auto-detecting every prose YouTube link.
- **Acceptance Criteria**:
  - Admin can insert **YouTube Embed** from Keystatic Markdoc toolbar.
  - `/post/<vlog-slug>` shows a playable responsive iframe (not a bare URL).
  - Invalid / non-YouTube URLs render nothing (no broken iframe).
  - `tsc` + Biome + build green.
- **Markdoc shape**: `{% YouTubeEmbed url="https://www.youtube.com/watch?v=…" title="…" caption="…" /%}`

#### `TICKET-CMS-09`: ImageKit → R2 Media Cutover (later; after CMS-06)

- **Description**: Copy CMS media ImageKit → R2; rewrite `coverImage` + `R2Image.src`; remove ImageKit `remotePatterns` / env leftovers.
- **Tasks**:
  - Script or documented bulk copy with key layout `blog/covers/…`, `blog/inline/…`, `about/…`.
  - Rewrite content to R2 URLs/keys; smoke `/blog` + sample posts + About.
  - Remove ImageKit host allowlist when unused.
- **Acceptance Criteria**: Blog/About have zero ImageKit runtime dependency; binaries still not in Git.

#### `TICKET-CMS-10`: Protect Keystatic Admin (`/keystatic`) — Supabase gate (Haianbeauty-style)

- **Description**: Keystatic does **not** ship username/password auth for local storage. Once `/keystatic` is publicly reachable, gate the Admin UI **and** `/api/keystatic/*` behind custom auth we control (same pattern as Haianbeauty: credentials/session in Supabase).
- **Why not Keystatic Cloud / GitHub-only auth first**: We want full control of who can open Admin without forcing editors through Keystatic Cloud; aligns with Epic 5 client auth stack later.
- **Important split** (do not conflate):
  1. **Access control** — who can open `/keystatic` + Admin API.
  2. **Persistence** — `local` storage on Vercel does **not** commit content to git. Production editing that sticks still needs `storage.kind: 'github'` (or edit-only on private/dev). Auth alone does not fix writes.
- **Recommended phased approach**:
  1. **Immediate hardening** (can ship before full Supabase): `showAdminUI` / `notFound()` (or redirect) for `/keystatic` + 404 the Keystatic route handler in production unless an explicit allow flag is set — matches [Keystatic’s local-mode recipe](https://keystatic.com/docs/recipes/nextjs-disable-admin-ui-in-production).
  2. **Supabase admin gate** (Haianbeauty pattern): login page or modal; session cookie; allowlist via `app_metadata` role (e.g. `is_admin` / `cms_editor`) — **never** authorize from editable `user_metadata`.
  3. **Protect both surfaces**: Admin layout (`src/app/keystatic/layout.tsx`) **and** `src/app/api/keystatic/[...params]/route.ts`. UI-only checks are insufficient.
  4. **Later (optional)**: switch Keystatic to `github` storage so authenticated production edits commit to the repo; keep Supabase as the gate (or combine with GitHub permissions).
- **Tasks**:
  - Add `TICKET`-level env stubs (`NEXT_PUBLIC_SUPABASE_URL`, anon/publishable key, server secrets as needed) — do not invent until implementing.
  - Server-side session check for `/keystatic` + Keystatic API; unauthenticated → login or 404.
  - Admin allowlist (single-owner email / `app_metadata` flag); CMS editors ≠ every signed-in client from Epic 5.
  - Document: local-dev Admin stays open or uses the same gate behind a toggle.
- **Acceptance Criteria**:
  - Anonymous requests to `/keystatic` and `/api/keystatic/*` cannot use the Admin in production.
  - Allowlisted Supabase admin can sign in and open Admin when the gate is enabled.
  - No secrets in client bundles beyond publishable keys; RLS/session rules follow Supabase security checklist.
- **Out of scope for this ticket**: full Epic 5 client dashboard; Keystatic Cloud billing; R2 media cutover (CMS-09).

#### Out of scope (still explicit for Epic 6.1)

- Multi-locale CMS bodies.
- Keystatic `kind: 'github'` production storage (tracked under CMS-10 phase 4 / separate follow-up).
- Cloudflare Image Resizing / Images product.
- Bot upload automation (prefixes + presigned PUT already scaffolded).
- Moving **services** / home marketing chrome into Keystatic (Home showcase optional under Epic 6.2 PF-04).
- Fully custom CMS admin UI (not supported; use `ContentView` / built-in fields only).

#### Agent prompt (Epic 6.1 polish — CMS-07 / CMS-08 only)

```markdown
You are an expert full-stack TypeScript engineer on `haikonguyen/haikonguyen-eu-notion`.
Read `AGENTS.md` and **Epic 6.1** in `BACKLOG.md` before coding.

### Prerequisites
- Epic 6 POC + CMS-06 + CMS-11 already on `dev`.
- Branch from latest `dev`: `cursor/keystatic-cms-polish-<suffix>`.

### Objective
1) `TICKET-CMS-07` — add `ContentView` thumbnail preview for `R2Image` in Keystatic admin.
2) `TICKET-CMS-08` — only if migrated content needs Todo/Toggle (or similar).
Do **not** start `TICKET-CMS-09` or Epic 6.2 unless explicitly asked.

### Must match shipped schema
- Packages: `@keystatic/core`, `@keystatic/next`, `next-intl`, Biome, Tailwind 4
- Admin: `npm run dev:keystatic` (Webpack)
- Config: `keystatic.config.ts`
- Components: `src/lib/keystatic/r2-image-component.ts`
- Public renderer: `src/features/blog/components/R2CmsImage.tsx`

### Done when
R2Image admin shows previews; tsc/biome/build green; PR opened into `dev`.
```

---

### 🔷 Epic 6.2: Portfolio CMS (Keystatic) — Software / Photography / Vlogs

_Make `/portfolio` fully CMS-driven so admins can add Software Architecture projects, Photography gallery items, and Vlogs from Keystatic — same local Git CMS + R2 URL pattern as blog._

**Status**: Implementation in progress on `cursor/portfolio-cms-backlog-ffdb` — PF-01…PF-03. PF-04 deferred. PF-05/PF-06 later.

**Decisions (locked)**

| Topic | Decision |
| --- | --- |
| Locale | **EN only** in CMS for now. Multilingual tracked as **`TICKET-PF-05`** (later). |
| Seed | Seed current placeholders; delete/replace anytime in Keystatic Admin (files under `content/portfolio/`). |
| Home (PF-04) | **Out of first PR** — keep Home showcase static; most efficient. `featured` field still on schema for later. |
| Vlogs inventory | Channel: [youtube.com/@haikonguyen](https://www.youtube.com/@haikonguyen). Seed with placeholders / known video URLs; replace with real uploads in Admin. |
| Photography media | **No new R2 account required for PF-01…03** — paste ImageKit / Unsplash / absolute URLs (same as blog). R2 portfolio prefix cutover stays under CMS-09 / later media milestone. |
| Detail slugs / SEO | **No `/portfolio/[slug]` in first PR** — keep modal + lightbox. SEO slug pages tracked under **`TICKET-PF-06`** (later). |

**Current architecture (as of `dev`)**

| Layer | Today | Problem |
| --- | --- | --- |
| Data | Hardcoded in `src/features/portfolio/constants.ts` (Unsplash placeholders) | Cannot add real work without a code change |
| Copy | Titles / descriptions / photo alts in `messages/{en,cs,vi}.json` under `Portfolio.projects.*` / `Portfolio.vlogs.*` | New items require translation key edits |
| UI | Client-only `PortfolioContent` → `PortfolioSections` filters Dev / Photo / Vlogs | No reader; no server data load |
| CMS | Keystatic only has `posts` + `aboutStory` | No portfolio collections |
| Home | Showcase carousel uses Home i18n + static image constants — **not** portfolio data | Optional later wiring |

**Recommended approach (default unless overridden)**

1. **Three Keystatic collections** (not one polymorphic collection) — mirrors the three `/portfolio` sections and keeps Admin labels clear:
   - `softwareProjects` → `content/portfolio/software/*`
   - `photographyItems` → `content/portfolio/photography/*`
   - `portfolioVlogs` → `content/portfolio/vlogs/*`
2. **Monolingual CMS fields** for item titles/descriptions/alts (same rule as blog bodies). Keep **section chrome** in `next-intl` (`Portfolio.title`, filter labels, modal chrome, empty states).
3. **Images / thumbnails as text URL fields** (ImageKit / R2 / absolute URL) — no binaries in Git; reuse `getR2PublicUrl` when values look like object keys.
4. **Vlogs store a YouTube URL** (not a raw id) and parse via existing `src/lib/youtube/*` helpers; optional duration + thumbnail override (fallback: YouTube thumbnail helper).
5. **Sort order** integer on every item; optional `featured` boolean for later Home showcase (PF-04).
6. **Seed** Keystatic content from current placeholder inventory so `/portfolio` stays populated during cutover, then replace with real work in Admin.
7. **Phase 1** wires `/portfolio` only. Home showcase stays static unless PF-04 is in scope.

#### Schema sketch (do not invent fields beyond this without backlog update)

**`softwareProjects`**

| Field | Type | Notes |
| --- | --- | --- |
| `title` | slug | Public id / Keystatic slug |
| `summary` | text | Card short description |
| `longDescription` | multiline text | Modal “challenge” body |
| `coverImage` | text | Absolute URL or R2 key |
| `tags` | string array | e.g. `Software`, `Next.js 15` |
| `tech` | string array | Tech stack chips |
| `githubUrl` | text (optional) | |
| `demoUrl` | text (optional) | |
| `sortOrder` | integer | Ascending |
| `featured` | checkbox | Home / featured later |

**`photographyItems`**

| Field | Type | Notes |
| --- | --- | --- |
| `title` | slug | Also used as lightbox title/alt fallback |
| `alt` | text | Accessibility alt |
| `image` | text | Absolute URL or R2 key |
| `width` | integer | Required by `react-photo-album` |
| `height` | integer | Required by `react-photo-album` |
| `sortOrder` | integer | Ascending |
| `featured` | checkbox | Optional Home hero photo later |

**`portfolioVlogs`**

| Field | Type | Notes |
| --- | --- | --- |
| `title` | slug | Card / modal title |
| `description` | multiline text | Card body |
| `youtubeUrl` | text | Full watch / youtu.be / embed / shorts URL |
| `duration` | text (optional) | Display badge e.g. `14:32` |
| `thumbnail` | text (optional) | Override; else derive from YouTube id |
| `sortOrder` | integer | Ascending |
| `featured` | checkbox | Optional Home vlog slide later |

#### Open questions (answer before implementation)

~~Resolved — see Decisions table above.~~

#### Later (deferred; do not implement in PF-01…03)

##### `TICKET-PF-05`: Multilingual Portfolio CMS Fields (later)

- **Description**: Add CS/VI (and any future locales) for portfolio item copy without forking collections.
- **Best-practice options** (pick when implementing — not now):
  1. **Nested locale object fields** on each entry (`title.en` / `title.cs` / `title.vi`, same for summary/alt/description) — one Admin entry, verbose forms.
  2. **Locale-suffixed parallel entries** (`quantum-crm`, `quantum-crm-cs`) linked by a shared `entryGroupId` — lighter forms, harder to keep in sync.
  3. **Keep CMS EN-only + translate via next-intl** — only works for a fixed inventory; **rejected** for Admin-addable items.
- **Recommended later**: option **1** for a small field set (title, summary, longDescription, alt, vlog description). Do **not** duplicate every technical field (URLs, tech tags, dimensions).
- **Why defer**: Triples Admin surface area and content authoring cost; blog is already monolingual EN; token/complexity cost is high vs value while EN is enough.
- **Acceptance Criteria (when opened)**: Admin can fill EN + at least one other locale; public UI picks locale from next-intl; missing locale falls back to EN.

##### `TICKET-PF-06`: Portfolio Detail Slug Routes for SEO (later)

- **Description**: Optional public routes like `/portfolio/software/[slug]` (and/or vlog slug pages) with metadata / Open Graph.
- **Why it can help SEO**: Indexable URLs, shareable links, rich previews — modals are not crawlable as distinct pages.
- **Why not now**: Current UI is modal + lightbox only; dedicated pages need layout, metadata, and back-navigation work that does not exist yet. Photography grids rarely need per-photo routes.
- **Acceptance Criteria (when opened)**: Opening a project from `/portfolio` can deep-link to a slug URL; direct load works; modal UX either wraps the page or is replaced intentionally.

#### `TICKET-PF-01`: Keystatic Portfolio Collections + Seed Content — **DONE**

Shipped: three collections in `keystatic.config.ts` via `portfolio-collections.ts`; seed YAML under `content/portfolio/{software,photography,vlogs}/` (placeholders + real blog YouTube URLs for vlogs).

#### `TICKET-PF-02`: Portfolio Reader Helpers — **DONE**

Shipped: `getSoftwareProjects`, `getPhotographyItems`, `getPortfolioVlogs` + portfolio types in `src/lib/keystatic/`.

#### `TICKET-PF-03`: Rewire `/portfolio` UI to CMS Data — **DONE**

Shipped: server-loaded `/portfolio`; CMS-driven cards/lightbox/modals; per-item i18n keys removed; empty states added.

#### `TICKET-PF-04` (optional / follow-up): Home Featured Work from CMS

- **Description**: Drive Home showcase slides (or a “latest featured” card) from `featured: true` portfolio entries.
- **Tasks**:
  - Reader helpers for featured software / photo / vlog (limit 1 each or carousel items).
  - Rewire `HomePhotographySlide` / `HomeVlogSlide` / `HomeEngineeringSlide` (or a shared data parent) to accept CMS props from the Home page server component.
  - Keep Home marketing chrome strings in `next-intl` unless explicitly moved.
- **Acceptance Criteria**: Toggling `featured` in Keystatic changes Home showcase media/titles after refresh.
- **Out of scope unless requested**: Full Home copy CMS, services catalog CMS.

#### Architecture notes (implementation constraints)

- Follow root `AGENTS.md`: no `any`, ≤150 LOC/file, Biome + `tsc`, no hardcoded UI chrome strings.
- Admin still `npm run dev:keystatic` (Webpack).
- Reuse YouTube helpers; do not duplicate embed URL builders inside portfolio.
- R2 media cutover for portfolio images stays under **CMS-09** / later milestone (same bucket, `portfolio/` prefix).
- Production persistence of Admin edits still needs CMS-10 phase 4 (`github` storage) — local mode writes files only in the running environment.
- Do **not** block PF-01…03 on CMS-10; local Admin is enough for content authoring in dev.

#### Agent prompt (copy for Epic 6.2 implementation)

```markdown
You are an expert full-stack TypeScript engineer on `haikonguyen/haikonguyen-eu-notion`.
Read `AGENTS.md`, `src/features/AGENTS.md`, `src/lib/AGENTS.md`, and **Epic 6.2** in `BACKLOG.md` before coding.

### Prerequisites
- Branch from latest `dev`: `cursor/portfolio-keystatic-cms-<suffix>`.
- Confirm open questions in Epic 6.2 (locale, seed, Home scope, inventory, detail routes).

### Objective
1) `TICKET-PF-01` — Keystatic collections + seed content under `content/portfolio/…`
2) `TICKET-PF-02` — Reader helpers (`getSoftwareProjects`, `getPhotographyItems`, `getPortfolioVlogs`)
3) `TICKET-PF-03` — Rewire `/portfolio` to CMS; remove hardcoded inventory + per-item i18n keys
4) `TICKET-PF-04` — only if explicitly in scope

### Must match
- Three collections (software / photography / vlogs) as specified in BACKLOG Epic 6.2
- Image fields = URL/key text (no binaries in Git)
- Vlogs: YouTube URL + `src/lib/youtube/*`
- Section chrome stays in next-intl; item copy lives in CMS
- Admin: `npm run dev:keystatic` (Webpack)
- No `any`; ≤150 LOC/file; Biome + tsc + build green

### Done when
Admin can add all three item types; `/portfolio` renders them with existing filters/modals/lightbox; PR opened into `dev`.
```

---

## 🎯 4. Milestone Execution Roadmap

| Milestone                                          | Scope                        | Target Focus                                                                                                           |
| :------------------------------------------------- | :--------------------------- | :--------------------------------------------------------------------------------------------------------------------- |
| **Milestone 1 (Current Branch: `feature/new-ui`)** | **Core Foundation & Shell**  | PWA Manifest, Service Worker, Liquid Glass Design Tokens, `AppPageShell`, Floating Top Header & Bottom Navigation Bar. |
| **Milestone 2**                                    | **Public Experience Hub**    | Native Hero Card, Quick Action Launchers, Keystatic "What's New" Blog, Featured Work, Interactive CV.                  |
| **Milestone 2.5 / parallel**                       | **CMS POC (Epic 6)**         | ✅ Keystatic admin + reader, R2 helpers, rewire blog/post/About, remove Notion path (PR #21).                          |
| **Milestone 2.6**                                    | **CMS migration (Epic 6.1)** | ✅ Posts migrated (CMS-06); ✅ YouTube embeds (CMS-11); ✅ soft image fade-in (CMS-12); remaining: `R2Image` ContentView (CMS-07); optional Todo/Toggle (CMS-08); R2 cutover later (CMS-09). |
| **Milestone 2.7**                                    | **Portfolio CMS (Epic 6.2)** | Keystatic collections for software / photography / vlogs; reader; rewire `/portfolio`; optional Home featured (PF-04). |
| **Milestone 2.8**                                    | **Keystatic Admin gate (CMS-10)** | Harden/disable public `/keystatic`; Supabase allowlisted admin (Haianbeauty-style); optional `github` storage later. |
| **Milestone 3**                                    | **Services & Commerce**      | Web Dev / Photo / Video Services Catalog, Booking Drawer, Cart Store, Checkout Flow.                                   |
| **Milestone 4**                                    | **Auth & Account Dashboard** | Authentication, Client Dashboard, Upcoming Bookings, Visit History, Invoices, Favorites, Settings.                     |
| **Later**                                          | **Portfolio gallery media cutover**  | Large R2 uploads (`portfolio/` prefix), CMS/bot presigned uploads; still `next/image` (CF resizing only if needed).  |

---
