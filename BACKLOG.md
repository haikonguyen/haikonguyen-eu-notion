# Product Backlog: PWA Liquid Glass Transformation

> **Project**: [haikonguyen.eu](https://www.haikonguyen.eu)  
> **Target Release**: Modern Native-like Progressive Web App (PWA) with Liquid Glass Aesthetic  
> **Base Branch**: `feature/new-ui` (branched from `dev`)  
> **Design Inspiration**: `haianbeauty` architecture, iOS liquid glass design, mobile-first native PWA patterns.

---

## 🌟 1. Vision & Architectural Overview

The goal of this transformation is to evolve the current web portfolio into a high-performance, mobile-first **Progressive Web App (PWA)** featuring a **Liquid Glass** aesthetic. The app delivers a dual-context experience:

1. **Public View**: High-impact marketing & portfolio hub presenting personal brand narrative, latest articles (Notion-backed blog), interactive CV, service offerings (Web Development, Photography, Video), cart, and quick-action launchers.
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

#### `TICKET-HOME-02`: "What's New" Notion Blog Showcase

- **Description**: Dynamic blog preview card/carousel on the home view connected to the Notion API.
- **Tasks**:
  - Article preview card with cover image, category badge, publication date, title, and excerpt.
  - "Read Article →" link with page transition to `/blog/[slug]`.
- **Acceptance Criteria**: Renders real-time latest blog posts from Notion with skeleton loading states.

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
- **Acceptance Criteria**: Seamless switching between Dark, Light, and System modes with full WCAG contrast and liquid glass styling across all 54 pages.

---

## 🎯 4. Milestone Execution Roadmap

| Milestone                                          | Scope                        | Target Focus                                                                                                           |
| :------------------------------------------------- | :--------------------------- | :--------------------------------------------------------------------------------------------------------------------- |
| **Milestone 1 (Current Branch: `feature/new-ui`)** | **Core Foundation & Shell**  | PWA Manifest, Service Worker, Liquid Glass Design Tokens, `AppPageShell`, Floating Top Header & Bottom Navigation Bar. |
| **Milestone 2**                                    | **Public Experience Hub**    | Native Hero Card, Quick Action Launchers, Notion "What's New" Blog, Featured Work, Interactive CV.                     |
| **Milestone 3**                                    | **Services & Commerce**      | Web Dev / Photo / Video Services Catalog, Booking Drawer, Cart Store, Checkout Flow.                                   |
| **Milestone 4**                                    | **Auth & Account Dashboard** | Authentication, Client Dashboard, Upcoming Bookings, Visit History, Invoices, Favorites, Settings.                     |

---
