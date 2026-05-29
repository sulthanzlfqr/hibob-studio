# Hibob Studio — Implementation Plan

**Version:** 1.0  
**Date:** 2026-05-30  
**Source of Truth:** positioning.md + information-architecture-v2.md + homepage-blueprint-v2.md + copywriting-system.md + website-redesign-spec.md  
**Status:** Engineering Execution Document

> This document translates the complete strategy stack into an executable engineering roadmap. The philosophy is **Progressive Transformation** — each phase ships independently, can be tested independently, and can be rolled back independently. No phase requires a preceding phase to be complete before it can be executed. No "big bang" rewrite.

---

## Section 1 — Current State Audit

### Project Overview

| Property | Value |
|----------|-------|
| Framework | React 19.2.6 |
| Build tool | Vite 8.0.12 |
| CSS | Tailwind CSS 4.3.0 + heavy inline styles |
| Language | JavaScript (JSX), no TypeScript |
| Routing | Hash-based anchor links, no router library |
| Architecture | Single-page application (SPA) |
| Entry point | `src/main.jsx` → `EntryWrapper.jsx` → `App.jsx` |
| Total estimated LOC | ~2,800 (App.jsx ~2,600 + supporting files) |

---

### Files Inventory

```
hibob-studio/
├── src/
│   ├── main.jsx                    ← React DOM root mount
│   ├── App.jsx                     ← MONOLITHIC: all sections + all data + all components
│   ├── EntryWrapper.jsx            ← Loading screen + welcome screen wrapper
│   ├── CheckoutPage.jsx            ← Separate checkout flow component
│   ├── App.css                     ← Imports index.css
│   ├── index.css                   ← Tailwind directives (@import "tailwindcss")
│   ├── tailwind.config.js          ← Tailwind config (minimal)
│   └── assets/
│       ├── avatar.png              ← Developer character illustration (used in hero)
│       ├── hero.png                ← Secondary hero image asset
│       ├── HIBOB LOGO.svg          ← Brand logo SVG
│       ├── qris.png                ← QRIS QR code (used in checkout)
│       ├── react.svg               ← Unused template asset
│       └── vite.svg                ← Unused template asset
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── hibob-donation-backend/         ← Empty git repo, no content
├── index.html                      ← HTML entry point, Plus Jakarta Sans font
├── package.json
├── vite.config.js
├── postcss.config.js
└── eslint.config.js
```

---

### App.jsx Architecture — Internal Structure

`App.jsx` is a monolithic file with the following distinct regions:

**Region 1 — Constants (lines 1-8)**
```
DISCORD_URL, EMAIL_URL, ROBLOX_URL
```

**Region 2 — Navigation data (lines 9-26)**
```
navItems { id, en } — 6 items each: Home, Services, Projects, Products, Pricing, Contact
```

**Region 3 — Icon paths (lines 28-51)**
```
iconPaths — SVG path strings for all icons used
```

**Region 4 — Content data objects (lines 53-119)**
```
content { id, en } — all section copy:
  hero: badge, h1a/h1b/h1c/h1d, sub, cta1, cta2
  why: label, h2a, h2b, sub
  services: label, h2a, h2b, sub
  projects: label, h2a, h2b, sub, play
  products: label, h2a, h2b, sub, showcase, buy
  pricing: label, h2a, h2b, sub, note, startFrom
  testimonials: label, h2a, h2b, sub
  contact: label, h2a, h2b, sub, cta1, cta2
```

**Region 5 — Static data arrays (lines 76-120)**
```
projects[]     — 9 Roblox games
products[]     — 3 products (Club Kit, Music System, Visual System)
services[]     — 3 services (World Building, Scripting, GUI)
whyMe[]        — 6 differentiator cards
pricing[]      — 3 commission tiers
testimonials[] — 3 client reviews
stats[]        — 3 stats (30+ clients, 2+ years, 100% satisfied)
```

**Region 6 — Custom hooks (lines 127-159)**
```
useScrollProgress() — scroll % tracker for progress bar
useActiveSection()  — IntersectionObserver for active nav section
useReveal()         — IntersectionObserver for [data-reveal] animation
```

**Region 7 — Utility functions (lines 161-166)**
```
scrollTo(e, href) — smooth scroll with history.replaceState
```

**Region 8 — Sub-components (lines 168-267)**
```
Counter({ value })    — animated number counter
Icon({ name, size })  — SVG icon renderer
Divider()             — decorative horizontal line
Label({ text })       — section eyebrow label
Btn({ href, ... })    — button component
MobileMenu({ ... })   — full-screen mobile nav overlay
```

**Region 9 — App() component (lines 268 to end)**
```
State: lang, menuOpen
Hooks: useScrollProgress, useActiveSection, useReveal, useCallback
Derived: c = content[lang], nav = navItems[lang]

Checkout router: if (page === "checkout") → <CheckoutPage />

CSS injection: <style>{`...`}</style> (global keyframes + utility classes)
Background layers: 3 radial gradient orbs + grid pattern overlay

Sections in order:
  HEADER (sticky)
  → section#home     (Hero: avatar.png, stats bar, 2 CTAs)
  → section#about    (Why Me: 6 cards)
  → section#services (Services: 3 cards)
  → section#projects (Projects: 9 game cards)
  → section#products (Products: 3 product cards)
  → section#pricing  (Pricing: 3 commission tiers)
  → section#testimonials
  → section#contact  (Contact CTA)
  FOOTER
  BACK-TO-TOP button
```

---

### Key Technical Characteristics

**Inline styles dominant:** The codebase uses inline `style={{}}` objects almost exclusively. Very few Tailwind utility classes are applied. This makes CSS modification straightforward — no class name hunting — but keeps component files large.

**Content-data separation is excellent:** All copy lives in the `content` object. Changing copy requires only data object changes, not JSX structural changes. This is the single most important technical advantage for Phase 1.

**Bilingual system is built-in:** `lang` state + `content[lang]` access pattern applies throughout. New content must follow this pattern to be bilingual.

**No routing library:** Adding new pages (Phase 5) requires either adding React Router or extending the manual `page` state pattern already used in the checkout route.

**CSS architecture gap:** CSS is a mix of inline styles (majority), Tailwind 4 directives (minimal), and a `<style>` injection block inside App() (global keyframes, utility classes like `.gt`, `.gborder`, `.pulse`, and responsive breakpoints). This injection pattern is non-standard but functional.

---

### Current Homepage Section Map

| Section ID | Label | Status vs. Target |
|-----------|-------|-------------------|
| `#home` | Hero | ❌ Full rewrite required |
| `#about` | Why Me / Kenapa Gua | ❌ Rewrite required |
| `#services` | Services | ❌ Remove from homepage |
| `#projects` | Projects | ❌ Remove from homepage |
| `#products` | Products | ⚠️ Keep + significant expansion |
| `#pricing` | Commission Pricing | ⚠️ Keep + reframe |
| `#testimonials` | Testimonials | ⚠️ Keep + content replacement |
| `#contact` | Open for Commission | ❌ Rewrite required |
| (none) | Problem Statement | 🆕 New section |
| (none) | Ecosystem Overview | 🆕 New section |
| (none) | Creator Identity | 🆕 New section |
| (none) | Workflow | 🆕 New section |

---

## Section 2 — Redesign Impact Map

| Area | Current State | Target State | Impact | Risk | Effort |
|------|--------------|--------------|--------|------|--------|
| **Hero copy** | "Hi, I'm HibobTheDev. I Build Roblox Experiences." + "Hire Me" | Platform headline + "Open Creator Panel" | Critical — first impression | Low (data-only change) | Low |
| **Hero visual** | `avatar.png` floating character illustration | Creator Panel representation / platform visual | High — category signal | Medium (new asset needed) | Medium |
| **Hero badge** | "Full-Stack Roblox Developer" | "Creator Infrastructure Platform" | High — frame-setting | Low (data-only change) | Low |
| **Header brand** | "HibobTheDev" gradient text | "Hibob Studio" | Critical — brand identity | Low | Low |
| **Header CTA** | "Hire Me" → Discord | "Open Creator Panel" → panel.hibobstudio.com | Critical | Low | Low |
| **Navigation items** | Home, Services, Projects, Products, Pricing, Contact | Home, Products, Plans, Docs, About | High | Low | Low |
| **Problem Statement** | Does not exist | New section between hero and ecosystem | High | Low | Medium |
| **Ecosystem section** | Does not exist | New section with 8-product hierarchy diagram | Critical | Medium | High |
| **Creator Identity section** | Does not exist | New section explaining identity backbone | High | Low | Medium |
| **Product data** | 3 products (Club Kit, Music System, Visual System) | Ecosystem of 8 products (5 new: Audio Forge, Asset Manager, License Manager, Donation Platform, Creator Panel) | Critical | Low (data addition) | Medium |
| **Products section JSX** | 3 cards in a grid | Ecosystem overview + 2 spotlights | High | Medium | High |
| **Services section** | 3 commission services | Remove from homepage | Medium | Low | Low |
| **Projects section** | 9 game portfolio cards | Remove from homepage | High | Low | Low |
| **Pricing section** | Commission tiers (GUI/Scripting/Full Dev) | Creator Plans (access-level tiers) | High | Low | Medium |
| **Testimonials** | Commission-era client testimonials | Platform product testimonials | Medium | Low (copy change) | Low |
| **Contact CTA section** | "Open for Commission" | Platform onboarding CTA | High | Low | Low |
| **Workflow section** | Does not exist | New before/after creator week section | Medium | Low | Medium |
| **Footer** | Personal links (HibobTheDev / Roblox profile / Discord / Email) | Company footer with product links | Medium | Low | Low |
| **Stats** | "30+ Clients Served, 2+ Years, 100% Satisfied" | Platform-relevant stats (creators, licenses, tracks, etc.) | Medium | Low | Low |

---

## Section 3 — Phase Strategy

Each phase is independently deployable. A phase that is shipped creates a better website than the one before it, even if no subsequent phase is ever executed.

```
PHASE 1 — Brand Repositioning      (Days 1-2)    → Eliminates freelancer identity
PHASE 2 — Platform Story           (Days 3-6)    → Establishes platform structure
PHASE 3 — Product Conversion Layer (Days 7-11)   → Converts visitors to users
PHASE 4 — Trust Layer              (Days 12-15)  → Validates platform with evidence
PHASE 5 — Growth Layer             (Days 16-25)  → Expands to multi-page architecture
```

**Deployment rule:** Each phase ends with a build (`npm run build`) and a manual review pass before being considered complete. No phase ships without passing the Design QA Checklist from website-redesign-spec.md §18.

**Rollback rule:** Every phase change is committed to a git branch. If a phase introduces a regression, the previous commit is restored. Phases that modify only data objects (Phase 1 mostly) have near-zero rollback risk.

---

## Section 4 — Phase 1: Brand Repositioning

### Objective

Eliminate all portfolio/freelancer signals from the visible website. A creator who lands on the site after Phase 1 does not believe they can hire Hibob Studio for commission work. This is the minimum viable repositioning — the fastest possible change with the highest possible positioning impact.

### Deliverables

**1.1 — Header brand name**
Replace "HibobTheDev" with "Hibob Studio" in the header brand link text (line ~335 of App.jsx).

**1.2 — Header CTA**
Replace `Hire Me` button (which links to Discord) with `Open Creator Panel` button linking to `https://panel.hibobstudio.com`. Same button styling, same position. Update in both desktop header (line ~354) and MobileMenu component (line ~239-267).

**1.3 — Hero badge**
Change `content.id.hero.badge` and `content.en.hero.badge` from `"Full-Stack Roblox Developer"` to bilingual: `"Creator Infrastructure Platform"` (EN) / `"Creator Infrastructure Platform"` (ID — same in both, it's a category label).

**1.4 — Hero headline**
Change `content.id.hero.h1a/h1b/h1c/h1d` and `content.en.hero.h1a/h1b/h1c/h1d` from first-person developer introduction to platform category declaration. Target:
- EN: Remove "Hi, I'm" + "HibobTheDev" structure
- New headline structure: `[Eyebrow phrase] [Platform claim]` spanning 2 lines

**1.5 — Hero subheadline**
Change `content.id.hero.sub` and `content.en.hero.sub` from commission developer description ("2 years developing Roblox games... mid-range price, premium results") to platform value statement that names specific creator problems.

**1.6 — Hero primary CTA**
Change `content.id.hero.cta1` and `content.en.hero.cta1` from "Hire Me" / "Hire Me" to "Open Creator Panel" / "Open Creator Panel". Update the `href` of this CTA from `#contact` to `https://panel.hibobstudio.com`. Update in JSX where CTA1 is rendered (line ~379-395).

**1.7 — Hero secondary CTA**
Change `content.id.hero.cta2` and `content.en.hero.cta2` from "Lihat Projects" / "View Projects" to "Lihat Ecosystem" / "See the Ecosystem". Update `href` from `#projects` to `#ecosystem` (the new section that will be added in Phase 2; this CTA can temporarily point to `#products` until Phase 2 lands).

**1.8 — Navigation items**
Update `navItems.id` and `navItems.en` arrays:
- Remove: `{ label: "Services", href: "#services" }`
- Remove: `{ label: "Projects", href: "#projects" }`
- Rename: `{ label: "Pricing" → "Plans", href: "#pricing" }` (keep href for now — the section is being renamed, not relocated yet)
- Keep: Home, Products, Contact

Final V1 nav (interim): `Home | Products | Plans | Contact` (4 items instead of 6)

**1.9 — Contact section label reframe**
Change `content.id.contact.label` from `"Open for Commission"` to `"Start Building"`.
Change `content.en.contact.label` from `"Open for Commission"` to `"Start Building"`.
Change `content.id.contact.h2a/h2b` and `content.en.contact.h2a/h2b` from project-solicitation language to platform invitation language.
Change `content.id.contact.cta1` and `content.en.contact.cta1` from "Discord — Paling Cepet" / "Discord — Fastest" to "Open Creator Panel" / "Open Creator Panel". Update href to `https://panel.hibobstudio.com`.

**1.10 — Pricing section label**
Change `content.id.pricing.label` from `"Commission Pricing"` to `"Creator Plans"`.
Change `content.en.pricing.label` from `"Commission Pricing"` to `"Creator Plans"`.
Change `content.id.pricing.note` and `content.en.pricing.note` — remove "Everything is negotiable" language.
Update pricing tier names in `pricing[]` array from commission services to access tiers.

**1.11 — Footer brand name**
Find "HibobTheDev" in the footer JSX (line ~677) and replace with "Hibob Studio".
Replace `© 2026 HibobTheDev` with `© 2026 Hibob Studio`.

**1.12 — Roblox personal profile link removal**
In the footer, replace the personal Roblox profile link with either the Roblox Group/Community link or remove it entirely.

---

### Success Test

After Phase 1, show the live website to a creator with no context for 10 seconds. Ask: "What kind of company is this?" The answer must be "some kind of platform or tool, not a freelancer." The answer must NOT be "this is a developer I can hire." If the 10-second answer is wrong, Phase 1 has not succeeded.

---

### Files Impacted

| File | Nature of Change | Lines Affected |
|------|-----------------|---------------|
| `src/App.jsx` | Data object changes (content, navItems, pricing, stats) | Lines 9-26, 53-125 |
| `src/App.jsx` | JSX: hero CTA hrefs, header brand text, footer brand text | Lines ~335, ~354, ~373-395, ~677-694 |

No new files. No new components. No structural JSX changes. Phase 1 is almost entirely data object edits.

---

### Risk Assessment

**Risk level: Very Low**

- All changes are in data objects or simple text substitutions in JSX
- No structural component changes
- No new dependencies
- No layout changes
- Bilingual system already handles the pattern; adding new content follows existing pattern
- The checkout system, animation system, and all other functionality are untouched

**One real risk:** The hero secondary CTA ("See the Ecosystem") will point to `#ecosystem` which doesn't exist until Phase 2. Mitigation: Point it to `#products` temporarily with copy "Explore Products" — honest and functional until Phase 2 lands.

---

### Rollback Strategy

Git revert to the commit before Phase 1 began. All changes are in two regions of App.jsx (data objects and a few JSX text nodes). A rollback is a 30-second git operation.

---

## Section 5 — Phase 2: Platform Story

### Objective

Make Hibob Studio visually and structurally look like a platform. After Phase 2, a creator who scrolls the homepage will encounter: (1) a section that names their operational problems, and (2) a visual diagram showing 8 connected products. These two sections do not exist currently.

### Deliverables

**2.1 — Problem Statement section (new)**
Add a new `<section id="problem">` between the Hero section and the Products section in App.jsx.

Structure:
- Section eyebrow label: "Why Hibob Studio Exists" / "Kenapa Hibob Studio Ada"
- H2: Problem-forward headline (from copywriting-system.md §6 product headline rules)
- 4-5 specific problem items displayed as a visual list — each is a named creator pain point with a concrete time/effort cost
- No CTA in this section — resonance only
- Visual style: subtle contrast from surrounding sections; minimal, text-forward

Content pattern for problem items (bilingual, to be added to `content` object):
```
{ icon: "clock", id: "Upload audio satu per satu...", en: "Uploading audio one track at a time..." }
{ icon: "users", id: "Whitelist pembeli secara manual...", en: "Manually whitelisting buyers one by one..." }
{ icon: "layers", id: "Aset tersebar di 5 tempat berbeda...", en: "Assets scattered across 5 different places..." }
{ icon: "x", id: "Tidak ada satu tempat untuk melihat semua...", en: "No single place to see your full operation..." }
```

**2.2 — Ecosystem Overview section (new)**
Add a new `<section id="ecosystem">` after the Problem section.

Structure:
- Section eyebrow label: "The Platform" / "Platform-nya"
- H2: "One connected ecosystem." / "Satu ekosistem yang terhubung."
- Subheadline: Platform-level message (see copywriting-system.md §11 Level 2 message)
- Ecosystem diagram (visual, see below)
- Section CTA: "Lihat semua produk" / "See all products" → `#products`

Ecosystem diagram implementation:
The diagram must show hierarchy, not a grid. Recommended implementation using CSS Grid or Flexbox:
- **Top row:** Creator Panel card (full width or centered, visually dominant)
- **Middle section:** Three layer groups side by side: Content Layer (Audio Forge, Asset Manager), Monetization Layer (License Manager, Donation Platform, Creator Plans), Developer Layer (API)
- **Bottom row:** Creator Identity card (full width or centered, labeled "Foundation")
- Visual connectors: CSS `border-left` or `::before` pseudo-elements creating lines between rows

Each product node in the diagram contains:
- Product name
- Icon
- One-line description (from new `ecosystemProducts` data array)
- Status badge: "Available" (green) or "Coming Soon" (muted)

New data array to add to App.jsx:
```javascript
const ecosystemProducts = [
  { id: "creator-panel", name: "Creator Panel", layer: "hub", icon: "layers", status: "available",
    desc: { id: "Pusat kendali untuk semua operasi creator.", en: "Command center for all creator operations." } },
  { id: "audio-forge", name: "Audio Forge", layer: "content", icon: "music", status: "coming-soon",
    desc: { id: "Pipeline publish audio ke Roblox secara batch.", en: "Batch audio publishing pipeline for Roblox." } },
  { id: "asset-manager", name: "Asset Manager", layer: "content", icon: "box", status: "coming-soon",
    desc: { id: "Repositori aset terpusat dan terversioning.", en: "Centralized, versioned asset repository." } },
  { id: "license-manager", name: "License Manager", layer: "monetization", icon: "shield", status: "coming-soon",
    desc: { id: "Lindungi produk dan otomasi distribusi lisensi.", en: "Protect products and automate license distribution." } },
  { id: "donation-platform", name: "Donation Platform", layer: "monetization", icon: "zap", status: "available",
    desc: { id: "Donasi komunitas yang terhubung ke game.", en: "Community donations connected to your game." } },
  { id: "creator-plans", name: "Creator Plans", layer: "monetization", icon: "star", status: "available",
    desc: { id: "Subscription untuk akses penuh platform.", en: "Subscription for full platform access." } },
  { id: "api", name: "API Infrastructure", layer: "developer", icon: "code", status: "coming-soon",
    desc: { id: "Ekosistem developer terbuka di atas Hibob Studio.", en: "Open developer ecosystem built on Hibob Studio." } },
  { id: "creator-identity", name: "Creator Identity", layer: "identity", icon: "users", status: "available",
    desc: { id: "Fondasi: Discord + Roblox terhubung dalam satu identitas.", en: "Foundation: Discord + Roblox linked in one identity." } },
];
```

**2.3 — Creator Identity section (new)**
Add a new `<section id="identity">` after the Ecosystem section.

Structure:
- Section eyebrow label: "The Foundation" / "Fondasi Platform"
- H2: "Everything connects through your identity." / "Semua terhubung melalui identitas creator-mu."
- Two-column layout: Left — explanation copy. Right — visual representation of Discord + Roblox linking.
- Copy: Explains that Creator Identity is the prerequisite for all other products
- Sets expectation: "The first step in Creator Panel is connecting your identity."
- CTA: "Connect your identity" / "Hubungkan identitasmu" → `https://panel.hibobstudio.com`

**2.4 — Section ordering update**
After Phase 2, the homepage section order in App.jsx becomes:
```
HEADER (sticky)
section#home        (Hero — Phase 1 rewritten)
section#problem     (Problem Statement — Phase 2 NEW)
section#ecosystem   (Ecosystem Overview — Phase 2 NEW)
section#identity    (Creator Identity — Phase 2 NEW)
section#products    (Products — unchanged in Phase 2)
section#pricing     (Plans — Phase 1 renamed)
section#testimonials
section#contact     (Phase 1 rewritten)
FOOTER
```

**2.5 — Navigation update**
Add `#ecosystem` to the navigation (replacing the removed Services/Projects):
Final V2 nav: `Home | Ecosystem | Products | Plans | Contact`

---

### Success Test

After Phase 2, a creator who scrolls through the homepage can correctly answer: "This is a platform with 8 products that work together, built on top of a Creator Identity system." The ecosystem diagram must communicate "connected system" — not "product catalog" — at a visual glance before reading.

---

### Files Impacted

| File | Nature of Change | Type |
|------|-----------------|------|
| `src/App.jsx` | New `ecosystemProducts` data array | Data addition |
| `src/App.jsx` | New problem content in `content{}` object | Data addition |
| `src/App.jsx` | New JSX: `<section id="problem">` | Structure addition |
| `src/App.jsx` | New JSX: `<section id="ecosystem">` with diagram | Structure addition |
| `src/App.jsx` | New JSX: `<section id="identity">` | Structure addition |
| `src/App.jsx` | Section ordering: move new sections above `#products` | Structure change |
| `src/App.jsx` | `navItems` update: add ecosystem link | Data change |

---

### Risk Assessment

**Risk level: Low-Medium**

- New sections are additive — existing sections are not modified
- The ecosystem diagram is the highest-risk element: a grid of 8 equal-weight cards is a failure state; the implementation must maintain hierarchy (Creator Panel prominent, Creator Identity as foundation)
- "Coming Soon" badge styling needs careful implementation to feel intentional, not apologetic
- Navigation now has 5 items instead of the interim 4 — still within acceptable limit

**Mitigation:** Build the ecosystem diagram as a CSS Grid layout with explicit grid-row/grid-column placement for Creator Panel and Creator Identity. Do not use flexbox wrap for the diagram — wrap creates equal-weight grid appearance.

---

### Rollback Strategy

Git revert to Phase 1 commit. The three new sections are additive — reverting removes them cleanly without affecting Phase 1 changes. The data arrays added are isolated and don't affect existing functionality.

---

## Section 6 — Phase 3: Product Conversion Layer

### Objective

Add the sections that directly drive creator-to-panel conversion: product spotlights with before/after workflow, creator workflow visualization, and a rewritten Plans section. After Phase 3, the homepage has a full product conversion flow from problem → ecosystem → product detail → plans → CTA.

### Deliverables

**3.1 — Audio Forge spotlight (new section)**
Add `<section id="audio-forge-spotlight">` after the Creator Identity section.

Structure:
- Section eyebrow: "Audio Forge" (gradient text) / "Available Now" badge
- H2: Problem-first headline ("Stop uploading audio one track at a time.")
- Left column: Before/after workflow text, 2-3 key capabilities, CTA
- Right column: Visual — could be a mockup of the Audio Forge interface, or a split diagram showing manual workflow (many steps) vs. Audio Forge workflow (3 steps)
- CTA: "Try Audio Forge" → `https://panel.hibobstudio.com/audio-forge` (or `https://panel.hibobstudio.com` if sub-path not yet available)

New content to add to `content{}` and a new `productSpotlights` data structure.

**3.2 — License Manager spotlight (new section)**
Add `<section id="license-manager-spotlight">` after Audio Forge spotlight.

Structure identical to Audio Forge spotlight but for License Manager. CTA: "Protect your products" → `https://panel.hibobstudio.com`.

**3.3 — Workflow section (new)**
Add `<section id="workflow">` between product spotlights and the Plans section.

Structure:
- Section eyebrow: "Creator Workflow" / "Workflow Creator"
- H2: "Your week, with the platform." / "Minggu kerjamu, dengan platform."
- Visual: A timeline or day-by-day representation showing the creator's week after Hibob Studio
- Key moments: Monday morning opening Creator Panel, Audio Forge session (10 minutes for 30 tracks), License Manager issuing automatically, Donation Platform processing without action
- Each moment shows time contrast where applicable

Implementation options (in order of effort):
- Option A (low): Numbered list items with icon + heading + description + time-saved badge
- Option B (medium): A card-per-day layout showing the creator's week as a timeline with the Creator Panel "view" represented in each card

**3.4 — Plans section major rewrite**
Update the `pricing[]` data array and the Pricing section JSX:

Rename section ID from `#pricing` to `#plans`.
Update `content.id.pricing.label` → `"Creator Plans"` (already done in Phase 1, confirm completed).
Update `content.id.pricing.h2a/h2b` and `content.en.pricing.h2a/h2b` to access-framing language.

Replace pricing tier data in `pricing[]` array:
```javascript
const pricing = [
  {
    name: { id: "Starter", en: "Starter" },
    price: { id: "Gratis", en: "Free" },
    priceNote: { id: "Mulai membangun.", en: "Start building." },
    desc: { id: "Akses dasar ke platform.", en: "Basic platform access." },
    features: { id: ["Creator Identity (1 akun)", "Donation Platform", "Creator Panel", "Community access"], en: ["Creator Identity (1 account)", "Donation Platform", "Creator Panel", "Community access"] },
    highlight: false,
    cta: { id: "Mulai Gratis", en: "Start Free" },
    href: "https://panel.hibobstudio.com"
  },
  {
    name: { id: "Creator", en: "Creator" },
    price: { id: "Rp X / bulan", en: "IDR X / month" },  // price TBD
    priceNote: { id: "Untuk creator yang serius.", en: "For creators who mean business." },
    desc: { id: "Akses penuh ke seluruh ekosistem.", en: "Full access to the entire ecosystem." },
    features: { id: ["Semua di Starter", "Audio Forge (full access)", "Asset Manager", "License Manager", "Creator Plans tools"], en: ["Everything in Starter", "Audio Forge (full access)", "Asset Manager", "License Manager", "Creator Plans tools"] },
    highlight: true,
    cta: { id: "Mulai Creator", en: "Start Creator" },
    href: "https://panel.hibobstudio.com/subscribe?plan=creator"
  },
  {
    name: { id: "Studio", en: "Studio" },
    price: { id: "Rp X / bulan", en: "IDR X / month" },  // price TBD
    priceNote: { id: "Untuk tim dan studio.", en: "For teams and studios." },
    desc: { id: "Kapasitas yang diperluas dan akses multi-user.", en: "Expanded capacity and multi-user access." },
    features: { id: ["Semua di Creator", "Multi-user access", "Kapasitas diperluas", "Priority support", "API access"], en: ["Everything in Creator", "Multi-user access", "Expanded capacity", "Priority support", "API access"] },
    highlight: false,
    cta: { id: "Mulai Studio", en: "Start Studio" },
    href: "https://panel.hibobstudio.com/subscribe?plan=studio"
  }
];
```

Plans section JSX updates:
- Replace commission-era CTA ("Diskusi Project" → Discord) with plan-tier CTA (tier-specific → panel)
- Add "See full comparison" text link (currently points nowhere; placeholder for Phase 5 /plans page)
- Remove "All prices are negotiable" copy

---

### Success Test

After Phase 3, a creator who reads Audio Forge spotlight should be able to describe the before/after workflow change without re-reading it. The Plans section, when shown to a creator, should be identifiable as subscription access tiers — not commission price tiers. Ask: "What would you call these?" The answer should be "plans" or "subscriptions" — not "packages" or "quotes."

---

### Files Impacted

| File | Nature of Change | Type |
|------|-----------------|------|
| `src/App.jsx` | New product spotlight data + content | Data addition |
| `src/App.jsx` | New JSX: `<section id="audio-forge-spotlight">` | Structure addition |
| `src/App.jsx` | New JSX: `<section id="license-manager-spotlight">` | Structure addition |
| `src/App.jsx` | New JSX: `<section id="workflow">` | Structure addition |
| `src/App.jsx` | `pricing[]` array complete replacement | Data replacement |
| `src/App.jsx` | Pricing section JSX: CTA hrefs, CTA labels, remove negotiable copy | JSX update |
| `src/App.jsx` | Section ID rename: `#pricing` → `#plans` | Section ID change |
| `src/App.jsx` | `navItems` update: "Plans" href → `#plans` | Data change |

---

### Risk Assessment

**Risk level: Low-Medium**

- Product spotlights are additive new sections — low risk
- `pricing[]` array replacement is the highest-risk change in Phase 3: the current checkout system may depend on the pricing data structure. **Verify:** Does `CheckoutPage.jsx` reference the `pricing[]` array? If yes, pricing array changes must be backward-compatible with the checkout data expectations.
- Plans section CTA hrefs now go to `panel.hibobstudio.com` — verify that panel.hibobstudio.com is live and accessible before Phase 3 ships

**Critical check before Phase 3:** Read `CheckoutPage.jsx` to confirm it does not import or reference the `pricing[]` array from `App.jsx`.

---

### Rollback Strategy

Git revert to Phase 2 commit. New sections are additive. Pricing array change is the only structural change to existing data — reversible with git revert.

---

## Section 7 — Phase 4: Trust Layer

### Objective

Replace commission-era social proof with platform-relevant evidence. After Phase 4, the social proof section contains real platform statistics, verifiable creator testimonials about specific products, and integration logos. The trust tier is fully rebuilt.

### Deliverables

**4.1 — Stats update**
Update `stats[]` array from commission-era metrics to platform-relevant metrics:

```javascript
const stats = [
  { value: "X+", label: { id: "Creator Aktif", en: "Active Creators" } },       // Real number
  { value: "X+", label: { id: "Lisensi Diterbitkan", en: "Licenses Issued" } }, // Real number
  { value: "X+", label: { id: "Track Audio Dipublish", en: "Audio Tracks Published" } }, // Real number from Audio Forge
];
```

**Note:** Statistics must be real. If platform is early-stage and numbers are small, that is acceptable — the format is the same. Do not fabricate or estimate statistics. If real data is unavailable, use format: "Growing" / "In progress" rather than inventing a number.

**4.2 — Testimonials update**
Replace `testimonials[]` array content:
- Remove commission-era testimonials ("Satisfied with results. Smooth communication...")
- Add 2-3 product-focused testimonials from real, named, verifiable creators
- Each testimonial must name the specific product used and a specific workflow change

Structure per testimonial:
```javascript
{
  name: "[Real creator name]",
  handle: "[Roblox username or Discord handle — verifiable]",
  product: { id: "Audio Forge", en: "Audio Forge" },
  quote: {
    id: "Quote in Indonesian describing specific workflow change.",
    en: "Quote in English describing specific workflow change."
  },
  avatar: null  // null for text-initial avatar, or path if image available
}
```

**4.3 — Integration logos (new)**
Add an integration logos row to the social proof section or the Creator Identity section.

New data:
```javascript
const integrations = [
  { name: "Discord", logo: "discord-logo" },    // SVG inline or imported
  { name: "Roblox", logo: "roblox-logo" },
  { name: "Parcel", logo: "parcel-logo" },
];
```

**Note on assets:** Discord and Roblox brand logos must be used within their respective brand guidelines. If SVG files are not available in the codebase, source them or use text+icon representation.

**4.4 — Social proof section (new or rewrite)**
Create or expand the social proof section. Current position: after Workflow section, before Plans.

New structure:
- Stats row (using updated `stats[]` with Counter animations — existing pattern)
- Integration logos row ("Works with" label + logo row)
- Testimonials grid (2-3 testimonials in 2-column layout on desktop, 1-column mobile)

**4.5 — Existing products section enhancement**
The current `section#products` shows 3 products. Add the remaining ecosystem products as "Coming Soon" cards:
- Audio Forge (Coming Soon)
- Asset Manager (Coming Soon)
- License Manager (Coming Soon)
- Creator Panel (special treatment — this is the hub, not a purchasable product card)

The products section after Phase 4 shows all 8 products — some available, some coming soon — so visitors see the full catalog scope.

---

### Success Test

After Phase 4, a creator reading the testimonials section should be able to identify: (1) the specific product that was used, and (2) the specific workflow change that resulted. If testimonials only convey "this is good," they have failed. Ask a creator: "What would you use this platform for after reading the testimonials?" The answer should name a specific product.

---

### Files Impacted

| File | Nature of Change | Type |
|------|-----------------|------|
| `src/App.jsx` | `stats[]` array replacement | Data replacement |
| `src/App.jsx` | `testimonials[]` array replacement | Data replacement |
| `src/App.jsx` | New `integrations[]` data array | Data addition |
| `src/App.jsx` | Social proof section JSX update or expansion | JSX update |
| `src/App.jsx` | `products[]` array expansion with 5 new ecosystem products | Data expansion |
| `src/App.jsx` | Products section JSX: render Coming Soon cards for new products | JSX update |
| `src/assets/` | Discord/Roblox/Parcel logo assets | Asset addition |

---

### Risk Assessment

**Risk level: Low**

- All changes are data replacements or additions
- Integration logo assets need sourcing — if not available as SVGs, use text-only representation temporarily
- Testimonial replacement requires real testimonial content to exist — if creators with product testimonials are not yet identified, this deliverable is blocked until they are. Do not fabricate testimonials.

**Blocked deliverable:** If real product testimonials do not yet exist, 4.2 is blocked. Phase 4 can still ship without testimonials — ship everything else and add testimonials when content is ready.

---

### Rollback Strategy

Git revert to Phase 3 commit. All changes in Phase 4 are data replacements — fully reversible.

---

## Section 8 — Phase 5: Growth Layer

### Objective

Expand from single-page to multi-page architecture. Add individual product pages, a dedicated Plans page, documentation landing, and changelog. This phase requires routing infrastructure that does not currently exist.

### Deliverables

**5.1 — Routing infrastructure**
The current codebase uses a manual `page` state variable (`useState("home")` or `useState("checkout")`) to handle the checkout route. Phase 5 extends this pattern or introduces React Router.

**Decision point — two options:**

Option A (lightweight, no new dependency): Extend the manual page state to support `/products/audio-forge`, `/plans`, `/docs`, `/about`. Map URL paths manually using `window.location.pathname`.

Option B (recommended for growth): Install `react-router-dom` and convert to proper client-side routing. This is a one-time investment that supports all future pages cleanly.

**Implementation choice:** Option B (React Router) is recommended because Phase 5 introduces 6+ new pages. Manual routing becomes brittle at that count. Add to `package.json`: `"react-router-dom": "^7.0.0"` (or latest stable).

**5.2 — Individual product pages**
Create separate page components for each product:
- `src/pages/ProductAudioForge.jsx`
- `src/pages/ProductLicenseManager.jsx`
- `src/pages/ProductDonationPlatform.jsx`
- `src/pages/ProductAssetManager.jsx`
- `src/pages/CreatorPanel.jsx`

Each product page follows the structure from homepage-blueprint-v2.md §6:
1. Problem headline
2. Workflow change description
3. 3-5 key capabilities
4. Ecosystem connection callout ("Works with Creator Identity")
5. Status badge (Available / Coming Soon)
6. CTA → Creator Panel

**5.3 — Plans page**
Create `src/pages/PlansPage.jsx`:
- Full plan comparison table (feature matrix)
- FAQ section
- Plan CTA buttons
- "How billing works" note (payment methods, etc.)

**5.4 — Docs landing page**
Create `src/pages/DocsLanding.jsx`:
- Links to API documentation
- Getting started guide
- Integration guides (Discord, Roblox)
- Note: Actual documentation content may be external (Notion, GitBook, etc.) — this page is a routing hub

**5.5 — Changelog page**
Create `src/pages/Changelog.jsx`:
- Product update history
- Simple chronological list
- Version markers per product

**5.6 — About page**
Create `src/pages/About.jsx`:
- Company mission and vision
- Background of Hibob Studio
- Contact information
- (This is where portfolio context appropriately lives — not on the homepage)

**5.7 — Navigation expansion**
With routing available, expand primary navigation to:
`Home | Products | Plans | Docs | About | [Open Creator Panel →]`

Add a `Products` dropdown or link to `/products` (product catalog page).

**5.8 — SEO metadata**
Add `<title>`, `<meta name="description">` per page. Update `index.html` for the homepage. Implement a metadata management approach (either static per-page or a lightweight helmet equivalent).

---

### Success Test

After Phase 5, a creator can navigate to any product page directly (e.g., `/products/audio-forge`) and understand that product in full without visiting the homepage first. The Plans page must allow a creator to make a subscription decision without returning to the homepage.

---

### Files Impacted

| File | Nature of Change | Type |
|------|-----------------|------|
| `package.json` | Add `react-router-dom` dependency | New dependency |
| `src/main.jsx` | Wrap app in `<BrowserRouter>` | Structural update |
| `src/App.jsx` | Convert from manual page state to React Router routes | Major refactor |
| `src/pages/` | New directory | New directory |
| `src/pages/ProductAudioForge.jsx` | New file | New file |
| `src/pages/ProductLicenseManager.jsx` | New file | New file |
| `src/pages/ProductDonationPlatform.jsx` | New file | New file |
| `src/pages/ProductAssetManager.jsx` | New file | New file |
| `src/pages/CreatorPanel.jsx` | New file | New file |
| `src/pages/PlansPage.jsx` | New file | New file |
| `src/pages/DocsLanding.jsx` | New file | New file |
| `src/pages/Changelog.jsx` | New file | New file |
| `src/pages/About.jsx` | New file | New file |
| `index.html` | Meta tags, page title | Update |
| `vite.config.js` | Possible: `historyApiFallback` for SPA routing | Update |

---

### Risk Assessment

**Risk level: Medium-High**

- React Router introduction is the highest-risk change in the entire roadmap — it requires refactoring how the checkout route is handled, which currently uses a manual page state
- The `CheckoutPage` manual routing pattern (`if (page === "checkout") return <CheckoutPage />`) must be migrated to a proper Route — verify this works correctly before Phase 5 ships
- Vite may need `historyApiFallback` configuration for proper SPA routing (all paths return `index.html`)

**Mitigation:** Phase 5 can ship without React Router by using the manual page state pattern extended to new pages. This is technically feasible for 6-8 pages though not ideal. If Phase 5 scope is too large, split it: Phase 5a (product pages, no routing library) → Phase 5b (React Router + full multi-page).

---

### Rollback Strategy

Git revert to Phase 4 commit. React Router introduction is the most complex rollback — if the checkout route breaks, roll back immediately. All new page files can be removed independently.

---

## Section 9 — File Map

### Files to Modify

| File | Why | Phase |
|------|-----|-------|
| `src/App.jsx` | Primary target: all content, structure, and new sections | 1-4 |
| `src/main.jsx` | BrowserRouter wrapper (Phase 5 only) | 5 |
| `index.html` | Page title, meta description, OG tags | 5 |
| `vite.config.js` | historyApiFallback for SPA routing (Phase 5) | 5 |
| `package.json` | Add react-router-dom (Phase 5) | 5 |

---

### Files to Create

| File | Why | Phase |
|------|-----|-------|
| `src/pages/` (directory) | House all new page components | 5 |
| `src/pages/ProductAudioForge.jsx` | Audio Forge dedicated page | 5 |
| `src/pages/ProductLicenseManager.jsx` | License Manager dedicated page | 5 |
| `src/pages/ProductDonationPlatform.jsx` | Donation Platform dedicated page | 5 |
| `src/pages/ProductAssetManager.jsx` | Asset Manager dedicated page | 5 |
| `src/pages/CreatorPanel.jsx` | Creator Panel dedicated page | 5 |
| `src/pages/PlansPage.jsx` | Full plans comparison page | 5 |
| `src/pages/DocsLanding.jsx` | Documentation hub | 5 |
| `src/pages/Changelog.jsx` | Product update history | 5 |
| `src/pages/About.jsx` | Company / About page | 5 |
| `src/components/` (directory) | Shared components extracted from App.jsx | 3-4 |
| `src/components/EcosystemDiagram.jsx` | Extracted ecosystem visualization | 2 |
| `src/components/ProductSpotlight.jsx` | Reusable product spotlight component | 3 |
| `src/data/ecosystem.js` | Ecosystem product data (extracted) | 2 |

---

### Files to Remove

| File | Why | Phase |
|------|-----|-------|
| `src/assets/avatar.png` | Developer character illustration — replaced with platform visual | 2 |
| `src/assets/hero.png` | Secondary hero image — not used in platform-era hero | 2 |
| `src/assets/react.svg` | Unused Vite template asset | 1 |
| `src/assets/vite.svg` | Unused Vite template asset | 1 |

**Note:** Remove assets only after confirming they are not referenced anywhere in the codebase. Run a grep search before deletion.

---

### Files to Keep (Unchanged)

| File | Why |
|------|-----|
| `src/CheckoutPage.jsx` | Functional checkout — do not touch until Phase 5 routing migration |
| `src/EntryWrapper.jsx` | Loading screen — still appropriate for platform, no change needed |
| `src/index.css` | Tailwind directive — keep |
| `src/App.css` | Imports index.css — keep |
| `src/tailwind.config.js` | Keep |
| `src/assets/HIBOB LOGO.svg` | Brand logo — keep |
| `src/assets/qris.png` | Used in checkout — keep |
| `public/favicon.svg` | Keep |
| `public/icons.svg` | Keep |
| `eslint.config.js` | Keep |
| `postcss.config.js` | Keep |
| `vite.config.js` | Keep until Phase 5 |

---

## Section 10 — Component Map

### Reusable Components (Keep and Extend)

| Component | Location | Status | Notes |
|-----------|----------|--------|-------|
| `Counter` | App.jsx inline | Keep | Used for stats animation; works correctly |
| `Icon` | App.jsx inline | Keep | SVG icon system; add new icons as needed |
| `Divider` | App.jsx inline | Keep | Gradient divider; reuse between sections |
| `Label` | App.jsx inline | Keep | Section eyebrow label; consistent styling |
| `Btn` | App.jsx inline | Keep | Core button; extend for new CTA destinations |
| `MobileMenu` | App.jsx inline | Keep + Update | Update nav items list and CTA in Phase 1 |
| `useScrollProgress` | App.jsx inline | Keep | Progress bar hook; correct implementation |
| `useActiveSection` | App.jsx inline | Keep | IntersectionObserver active section tracker |
| `useReveal` | App.jsx inline | Keep | Scroll reveal animation; keep pattern |

---

### New Components (Create in Phases 2-5)

| Component | File | Phase | Purpose |
|-----------|------|-------|---------|
| `EcosystemDiagram` | `src/components/EcosystemDiagram.jsx` | 2 | Ecosystem hierarchy visualization |
| `ProductSpotlight` | `src/components/ProductSpotlight.jsx` | 3 | Reusable before/after product section |
| `PlanCard` | `src/components/PlanCard.jsx` | 3 | Plan tier card (replaces old pricing card JSX) |
| `IntegrationLogos` | `src/components/IntegrationLogos.jsx` | 4 | Integration partner logos row |
| `TestimonialCard` | `src/components/TestimonialCard.jsx` | 4 | Updated testimonial with product attribution |
| `StatCard` | `src/components/StatCard.jsx` | 4 | Platform stat with Counter animation |
| `ProductCard` | `src/components/ProductCard.jsx` | 4 | Ecosystem product card (available/coming soon) |
| `PageLayout` | `src/components/PageLayout.jsx` | 5 | Shared layout for all pages |
| `Navbar` | `src/components/Navbar.jsx` | 5 | Extracted navigation (from App.jsx header) |
| `Footer` | `src/components/Footer.jsx` | 5 | Extracted footer (from App.jsx footer) |

**Extraction note:** Components remain inline in App.jsx until Phase 5, where the multi-page architecture makes extraction necessary. Extracting them before Phase 5 creates refactoring work without user-facing benefit.

---

### Legacy Components (To Retire)

| Component/Pattern | Retire In | Replacement |
|-------------------|-----------|-------------|
| `MobileMenu` inline in App.jsx | Phase 5 | `src/components/Navbar.jsx` (includes mobile) |
| Inline `<style>` tag in App() | Phase 5 | CSS modules or external CSS file |
| Manual `page` state routing | Phase 5 | React Router |
| `whyMe[]` data array | Phase 2 | Section removed from homepage; data may move to About page |
| `services[]` data array | Phase 2 | Section removed from homepage; data moves to About page |
| `projects[]` data array | Phase 2 | Section removed from homepage; data moves to About page |

---

## Section 11 — Content Migration Plan

### What survives

| Content | Destination | Change Required |
|---------|------------|----------------|
| Products: Club Kit, Music System, Visual System | Products section + product pages | Reframe as ecosystem products; copy update only |
| Product feature lists | Product pages (Phase 5) | Keep with minor terminology updates |
| Checkout system | CheckoutPage.jsx unchanged | No change |
| Payment methods (Bank, E-Wallet, QRIS, Robux) | CheckoutPage.jsx unchanged | No change |
| Voucher system | CheckoutPage.jsx unchanged | No change |
| Discord webhook | CheckoutPage.jsx unchanged | No change |
| Bilingual structure (id/en) | Entire site | Keep and extend |
| Brand gradient system | Entire site | Keep |
| Animation system (scroll reveal, counter, hover) | Entire site | Keep |
| `Divider`, `Label`, `Icon`, `Btn` components | Entire site | Keep |
| Parcel integration | Checkout | Keep |

---

### What gets rewritten

| Content | Why | Phase |
|---------|-----|-------|
| Hero headline + subheadline | Portfolio → platform | 1 |
| Hero badge | Job title → category label | 1 |
| Navigation labels | Portfolio nav → platform nav | 1 |
| About section copy ("Why Me?") | Personal selling → removed from homepage | 2 |
| Contact section ("Open for Commission") | Commission solicitation → platform CTA | 1 |
| Pricing tier names and descriptions | Commission services → access plans | 3 |
| Stats labels | Commission metrics → platform metrics | 4 |
| Testimonial content | Commission praise → product workflow testimonials | 4 |
| Footer brand name and links | Personal → company | 1 |
| Stats (`stats[]`) | Commission-era → platform-era | 4 |

---

### What gets removed from homepage

| Content | Why | Where it goes |
|---------|-----|---------------|
| Services section | Commission services | About page (Phase 5) — credibility context |
| Projects section (9 games) | Freelancer portfolio | About page (Phase 5) — company background |
| "Why Me?" section | Personal selling | About page (Phase 5) — founder background |
| "Commission Pricing" terminology | Retired model | Replaced by "Creator Plans" |
| "All prices are negotiable" copy | Platform pricing is not negotiable | Removed entirely |
| "Open for Commission" | Retired model | Replaced by platform CTA |
| Avatar character illustration | Portfolio visual | Replaced by platform visual |
| Roblox personal profile link | Personal link | Removed from primary nav; About page context |

---

## Section 12 — Design System Impact

### What remains unchanged

| Element | Rule |
|---------|------|
| Background color `#03010f` | Never change. The dark matte is the platform's environment signal. |
| Purple gradient colors (`#a855f7`, `#e879f9`, `#38bdf8`) | These are brand constants. They may be reorganized in their application but the color values are fixed. |
| `.gt` gradient text class | Keep. It is the primary text emphasis tool. |
| `.gborder` gradient border class | Keep. Reuse for featured cards. |
| `.pulse` animation class | Keep. Reapply to primary CTA. |
| Scroll reveal system (`data-reveal`, `[data-d]`) | Keep. Extend to new sections. |
| Counter animation (`Counter` component) | Keep. Apply to new stats. |
| `Divider` component | Keep. Use between all sections. |
| Border-radius: 999px for pills, 12-16px for cards | Keep. |
| Spacing scale | Keep. |
| Plus Jakarta Sans font | Keep. |

---

### What evolves

| Element | Current | Target | Phase |
|---------|---------|--------|-------|
| Gradient application count | Overused — gradient on heading, avatar glow, borders everywhere | Reserved for: key H1 phrase, primary CTA, featured card borders, eyebrow labels | 1 |
| Hero visual | Floating character `avatar.png` | Creator Panel representation | 2 |
| Card grid | Equal-weight grid (all cards same size) | Hierarchy-aware (Creator Panel card larger/prominent) | 2 |
| Background gradient orbs | 3 fixed radial gradients | Reduce to 2; ensure they don't compete with content sections | 2 |
| `float` animation | Applied to avatar | Remove from any interface visuals | 2 |
| Stats presentation | 3 stats (30+ Clients, 2+ Years, 100%) | Platform stats (creators, licenses, tracks) | 4 |

---

### What must never change

1. **The dark base:** `#03010f` or functionally equivalent near-black is the primary background. No section becomes white or light as a design direction.
2. **The gradient values:** `#a855f7 → #e879f9 → #38bdf8` in gradient expressions. These may be rearranged but not replaced with different hues.
3. **The `prefers-reduced-motion` respect:** Already implemented in the global CSS. Any new animation must check this condition.
4. **The bilingual pattern:** All content must have both `id` and `en` versions. No new content that is English-only or Indonesian-only.
5. **The `data-reveal` pattern:** All new sections use `data-reveal` + `data-d` attributes for scroll reveal timing. New sections without this pattern will look visually inconsistent.

---

## Section 13 — SEO Impact

### Current SEO risks

The site is a single-page application with no dedicated metadata per section. Current `index.html` has:
- Generic title (likely "hibob-studio" from Vite template)
- No meta description
- No Open Graph tags
- No structured data / JSON-LD

This is already a weak SEO baseline. The redesign cannot make it significantly worse — but it also provides the opportunity to improve it.

---

### URL strategy

**Current state:** All content is at `/`. No paths. The checkout appears at the same URL with `?page=checkout` or manual page state.

**Phase 1-4 (no change):** The SPA remains at `/`. All content accessible at one URL. Hash navigation for sections (`#ecosystem`, `#products`, `#plans`, etc.) are non-indexable but provide internal navigation.

**Phase 5 (multi-page):** New URLs are created:
```
/                       → Homepage
/products               → Product catalog overview
/products/audio-forge   → Audio Forge dedicated page
/products/license-manager
/products/donation-platform
/products/asset-manager
/products/creator-panel
/plans                  → Creator Plans page
/docs                   → Documentation hub
/changelog              → Product updates
/about                  → Company / About
/checkout               → Checkout flow (migrate from state to route)
```

---

### Redirect strategy

No current URLs need redirects — the site is at `/` currently and remains at `/` through Phase 4. When Phase 5 introduces multi-page routing, the only new consideration is the checkout path: any existing checkout links should redirect from the old state-based access to `/checkout`.

---

### Metadata strategy

**Phase 1-4 (minimal):** Update `index.html` with:
```html
<title>Hibob Studio — Creator Infrastructure for Roblox Developers</title>
<meta name="description" content="Creator infrastructure platform for serious Roblox developers. Manage audio, assets, identity, licensing, and community from one connected ecosystem." />
```

**Phase 5 (per-page):** Each new page gets its own `<title>` and `<meta name="description">`. Implement using React Helmet or the React Router meta API if using React Router v7+.

---

### Keyword direction

The SEO transition mirrors the positioning transition:

| Phase | Primary keywords targeted |
|-------|--------------------------|
| Current | "Roblox developer," "hire Roblox developer," "commission Roblox" |
| Target | "Roblox creator tools," "Roblox audio publishing," "Roblox creator platform," "Roblox license manager," "Roblox donation system" |

---

## Section 14 — Analytics Plan

### What should be measured immediately after Phase 1

Without analytics infrastructure: Manually track "Open Creator Panel" clicks via the Discord server (creators who arrive from the website will be identifiable through onboarding).

With analytics infrastructure (Google Analytics 4 or Plausible — Plausible recommended for privacy and simplicity):

**Primary event: Panel Opens**
```javascript
// Track every "Open Creator Panel" click
gtag('event', 'open_creator_panel', { source: 'homepage' })
```

**Secondary events:**

| Event | When | Why |
|-------|------|-----|
| `hero_cta_click` | "Open Creator Panel" in hero | Primary conversion signal |
| `nav_panel_click` | "Open Creator Panel" in nav | Secondary conversion signal |
| `product_spotlight_cta` | Product-specific CTAs | Product interest signal |
| `plan_cta_click` | Plan tier CTA with plan name | Subscription intent signal |
| `ecosystem_explored` | Scroll past ecosystem section | Platform comprehension signal |
| `scroll_depth_50` | 50% page scroll | Engagement depth signal |
| `scroll_depth_100` | 100% page scroll | Full engagement signal |
| `language_switch` | ID↔EN toggle | Audience composition signal |

---

### Conversion funnel to track

```
Unique visitors
↓
Scroll past hero (scroll > 300px)
↓
Scroll past ecosystem (section#ecosystem in view)
↓
Product CTA click (any product CTA)
↓
"Open Creator Panel" click (primary conversion event)
↓
[Panel session — tracked in panel analytics]
```

The dropoff between each stage identifies where the homepage is losing creators. High dropoff after hero = hero problem. High dropoff after ecosystem = ecosystem comprehension problem. High dropoff before panel click = trust or pricing problem.

---

### Review cadence

| Metric | Review frequency |
|--------|-----------------|
| Panel opens | Weekly |
| Scroll depth distribution | Every 2 weeks |
| Bounce rate trend | Every 2 weeks (compare before/after each phase) |
| CTA click distribution | Monthly |
| Language split (ID/EN) | Monthly |

---

## Section 15 — Launch Strategy

### Soft Launch (Phase 1 only)

**Scope:** Phase 1 changes only — brand name, hero copy, navigation, CTA labels.
**Audience:** Internal only. Share with team / collaborators for review before any public promotion.
**Validation checklist:**
- [ ] "HibobTheDev" appears nowhere in header or footer
- [ ] "Hire Me" appears nowhere on the page
- [ ] "Open Creator Panel" is the primary CTA and navigates to panel.hibobstudio.com
- [ ] All text is readable in both ID and EN
- [ ] Existing checkout flow is unaffected
- [ ] Mobile layout correct

**Duration:** 24-48 hours before Phase 2 begins.

---

### Internal Review (Phases 2-3 complete)

**Scope:** Full homepage with Problem Statement, Ecosystem, Creator Identity, Product Spotlights, Workflow, and new Plans section.
**Audience:** Internal + 2-3 trusted creators from the Discord community for qualitative feedback.

**Review questions for trusted creators:**
1. "What kind of company is this?" (Target: "platform" — not "freelancer")
2. "Which product is most relevant to you, and why?" (Target: names a specific product with workflow reason)
3. "What would you do next?" (Target: "open the panel" or "check the plans")
4. "Is anything confusing?" (Open feedback)

**Duration:** 3-5 days of review. Incorporate feedback before Phase 4.

---

### Public Release (Phase 4 complete)

**Scope:** Full redesigned homepage with trust layer complete.
**Announcement:** Post in Discord server, Roblox community forums, social media.
**Announcement framing:** Platform announcement — not "we redesigned the website" but "Hibob Studio platform is now available."

---

### Post-Launch Validation (Week 1-2 after public release)

**Watch for:**
- Creator Panel sessions (primary success signal)
- Any support questions that reveal confusion about what Hibob Studio is (secondary signal — confusion = homepage failure)
- Bounce rate compared to pre-redesign (improvement expected after Phase 1; further improvement after Phase 4)
- Language split — confirm both ID and EN content is rendering correctly

---

## Section 16 — Success Metrics

### Phase 1

| Metric | Success | Failure | Review window |
|--------|---------|---------|---------------|
| Zero freelancer signals | Page contains none of: "Hire Me," "Commission," "HibobTheDev" in header | Any of these appear | Before Phase 2 begins |
| Hero read result | Creator states "platform" not "freelancer" in 10-second exposure test | "Freelancer" or "developer for hire" | Before Phase 2 |
| Navigation passes | No "Services" or "Projects" in nav | Either appears | Before Phase 2 |

### Phase 2

| Metric | Success | Failure | Review window |
|--------|---------|---------|---------------|
| Ecosystem comprehension | Creator identifies 3+ products and understands they are connected | Sees 8 isolated products | After Phase 2 ships |
| Problem section resonance | Creator says "yes, that's my situation" at 1+ problem items | No recognition | After Phase 2 ships |
| Creator Identity understood | Creator knows "connect identity first" is the first step | Arrives at panel confused | Within 1 week of Phase 2 |

### Phase 3

| Metric | Success | Failure | Review window |
|--------|---------|---------|---------------|
| Audio Forge comprehension | Creator describes before/after workflow without re-reading | Cannot state the change | After Phase 3 ships |
| Plans framing | Creator identifies tiers as "subscription plans" not "commission packages" | Calls them "quotes" or "packages" | After Phase 3 ships |
| CTA routing | All product CTAs → panel.hibobstudio.com (not Discord) | Any CTA still goes to Discord | Before Phase 3 ships |

### Phase 4

| Metric | Success | Failure | Review window |
|--------|---------|---------|---------------|
| Testimonial specificity | Testimonials name a specific product and a specific workflow change | Testimonials only express satisfaction | Before Phase 4 ships |
| Stats accuracy | All stats are real current numbers | Any stat is fabricated or stale | Before Phase 4 ships |
| Trust section purpose | Creator can name at least one reason to trust the platform from this section | Section is ignored | 2 weeks after Phase 4 ships |

### Phase 5

| Metric | Success | Failure | Review window |
|--------|---------|---------|---------------|
| Product page navigation | Creator lands on `/products/audio-forge` and understands the product without visiting homepage | Confusion or incorrect mental model | 1 week after Phase 5 ships |
| Routing integrity | Checkout flow works at `/checkout` | Any checkout regression | Immediately after Phase 5 ships |
| Core Web Vitals | LCP < 2.5s, FID < 100ms, CLS < 0.1 | Any metric in "Needs Improvement" | 2 weeks after Phase 5 ships |

---

## Section 17 — Risk Register

### Technical Risks

| Risk | Probability | Impact | Mitigation |
|------|------------|--------|-----------|
| App.jsx reaches 3,500+ lines — becomes difficult to maintain | High (Phase 3) | Medium | Extract EcosystemDiagram and ProductSpotlight as components early in Phase 3 |
| CheckoutPage references `pricing[]` array and breaks when array is replaced | Medium | High | Read CheckoutPage.jsx fully before Phase 3; confirm no imports from App.jsx data |
| React Router migration breaks existing checkout flow | Medium | High | Test checkout flow explicitly before Phase 5 ships; keep manual routing as fallback |
| `panel.hibobstudio.com` is not live when Phase 1 CTAs point to it | Medium | High | Confirm panel URL is accessible before Phase 1 ships CTA changes |
| New sections use `data-reveal` but `useReveal()` hook doesn't observe dynamically added elements | Low | Low | Call `useReveal()` after any dynamic section addition; or add new elements to initial observation set |
| Vite SPA routing not configured → direct URL access to `/products/audio-forge` returns 404 | High (Phase 5) | High | Add `historyApiFallback: true` to Vite config in Phase 5 |

---

### UX Risks

| Risk | Probability | Impact | Mitigation |
|------|------------|--------|-----------|
| Ecosystem diagram renders as equal-weight grid, defeating hierarchy argument | Medium | High | Specify exact CSS Grid layout with named grid areas; do not use flex-wrap |
| Hero visual is placeholder or absent — platform visual is not yet created | High | Medium | Ship Phase 1 with a styled dark panel mockup (CSS only, no image needed initially) |
| Problem section is too abstract — creators don't recognize their situation | Medium | High | Use very specific, daily-routine language; test with 2 creators before public launch |
| Coming Soon badges on 5/8 products creates impression platform is incomplete | Medium | Medium | Frame Coming Soon positively — "Here's what's coming" positioning; use muted styling, not apologetic |

---

### Business Risks

| Risk | Probability | Impact | Mitigation |
|------|------------|--------|-----------|
| Removing Services/Projects sections loses any creators who arrived specifically for commission work | Medium | Low | Commission inquiries can be addressed via Discord; website is not the commission intake point |
| Plans pricing not set when Phase 3 ships | High | Medium | Ship with "Coming Soon" on price fields, or "Join the waitlist" CTA if pricing not finalized |
| No real product testimonials available for Phase 4 | High | Medium | Phase 4 ships without testimonials; add when available; don't fabricate |
| Panel.hibobstudio.com has poor first-run experience — damages website's credibility | Medium | High | Align panel onboarding with expectations set by website; especially Creator Identity as first step |

---

### SEO Risks

| Risk | Probability | Impact | Mitigation |
|------|------------|--------|-----------|
| Phase 5 routing without proper `historyApiFallback` causes 404s for direct URL access | High | Medium | Configure Vite before Phase 5 ships |
| Keyword dilution — removing "commission" and "Roblox developer for hire" loses existing organic traffic | Low | Low | Monitor organic traffic; if there is any meaningful "hire Roblox developer" traffic, create an About page that addresses it |
| Page title change affects any existing search rankings | Low | Very Low | Current site has minimal SEO equity; the change is net positive |

---

### Branding Risks

| Risk | Probability | Impact | Mitigation |
|------|------------|--------|-----------|
| Gradient overuse in new sections — new sections add gradients without discipline | Medium | Low | Enforce gradient rules from website-redesign-spec.md §8 on every new section; review before shipping each phase |
| "Coming Soon" for 5 products makes the platform look half-built | Medium | Medium | Communicate roadmap as intentional vision, not absence; "Here's where we're going" |

---

## Section 18 — Execution Order

This is the exact order of implementation steps. Each item is a discrete, testable unit of work. Check off each before starting the next.

```
PHASE 1 EXECUTION

□ 1.  Read CheckoutPage.jsx fully — confirm it does not import from App.jsx data objects
□ 2.  Confirm panel.hibobstudio.com is accessible at the URL
□ 3.  Git commit: "checkpoint: pre-phase-1 state"
□ 4.  Update content.en.hero.badge → "Creator Infrastructure Platform"
□ 5.  Update content.id.hero.badge → "Creator Infrastructure Platform"
□ 6.  Update content.en.hero: h1a/h1b/h1c/h1d → platform headline structure
□ 7.  Update content.id.hero: h1a/h1b/h1c/h1d → platform headline structure (ID translation)
□ 8.  Update content.en.hero.sub → platform subheadline
□ 9.  Update content.id.hero.sub → platform subheadline (ID translation)
□ 10. Update content.en.hero.cta1 → "Open Creator Panel"
□ 11. Update content.id.hero.cta1 → "Open Creator Panel"
□ 12. Update content.en.hero.cta2 → "Explore Products"
□ 13. Update content.id.hero.cta2 → "Explore Products"
□ 14. Update navItems.id: remove Services, remove Projects, rename Pricing→Plans
□ 15. Update navItems.en: remove Services, remove Projects, rename Pricing→Plans
□ 16. Find header JSX "HibobTheDev" → replace with "Hibob Studio" (line ~335)
□ 17. Find header "Hire Me" button → update label to "Open Creator Panel", href to panel URL
□ 18. Find MobileMenu "Hire Me" → update same way
□ 19. Update hero CTA1 href in JSX from #contact → https://panel.hibobstudio.com
□ 20. Update hero CTA2 href in JSX from #projects → #products
□ 21. Update content.en.contact.label → "Get Started"
□ 22. Update content.id.contact.label → "Mulai Sekarang"
□ 23. Update content.en.contact.h2a/h2b → platform invitation headline
□ 24. Update content.id.contact.h2a/h2b → platform invitation headline (ID)
□ 25. Update content.en.contact.cta1 → "Open Creator Panel", href → panel URL
□ 26. Update content.id.contact.cta1 → "Open Creator Panel", href → panel URL
□ 27. Update content.en.pricing.label → "Creator Plans"
□ 28. Update content.id.pricing.label → "Creator Plans"
□ 29. Remove "everything is negotiable" note from pricing content
□ 30. Update pricing tier names in pricing[] (keep structure, rename labels)
□ 31. Find footer "HibobTheDev" → replace with "Hibob Studio"
□ 32. Find footer "© 2026 HibobTheDev" → "© 2026 Hibob Studio"
□ 33. Find footer Roblox personal profile link → remove or replace with community link
□ 34. Delete src/assets/react.svg (confirm not referenced)
□ 35. Delete src/assets/vite.svg (confirm not referenced)
□ 36. npm run build → confirm no build errors
□ 37. Manual review: read full page in both ID and EN, check all 12 Phase 1 deliverables
□ 38. Git commit: "phase-1: brand repositioning complete"

PHASE 2 EXECUTION

□ 39. Add ecosystemProducts[] data array to App.jsx (8 products with layer classification)
□ 40. Add problem section content to content.id and content.en objects
□ 41. Add Creator Identity section content to content.id and content.en objects
□ 42. Add iconPaths entries for any new icons needed (e.g., "api", "identity")
□ 43. Create EcosystemDiagram JSX structure with CSS Grid hierarchy (inline or extracted)
□ 44. Add <section id="problem"> JSX between Hero and Products sections
□ 45. Add <section id="ecosystem"> JSX with EcosystemDiagram after Problem
□ 46. Add <section id="identity"> JSX after Ecosystem
□ 47. Update navItems: add { label: "Ecosystem", href: "#ecosystem" } to both id and en
□ 48. Update hero CTA2 href from #products → #ecosystem
□ 49. Apply data-reveal to all new section elements
□ 50. npm run build → confirm no build errors
□ 51. Test: scroll reveal on all new sections
□ 52. Test: ecosystem diagram hierarchy visible (Creator Panel prominent, Creator Identity at base)
□ 53. Test: Coming Soon badges on unfinished products
□ 54. Test: bilingual toggle works on all new sections
□ 55. Git commit: "phase-2: platform story sections added"

PHASE 3 EXECUTION

□ 56. Add productSpotlights[] data structure (Audio Forge, License Manager)
□ 57. Add workflow section content to content objects
□ 58. Add <section id="audio-forge-spotlight"> JSX after Creator Identity
□ 59. Add <section id="license-manager-spotlight"> JSX after Audio Forge spotlight
□ 60. Add <section id="workflow"> JSX after product spotlights
□ 61. Replace pricing[] array with Creator Plans tier data
□ 62. Update Pricing section JSX: tier CTA hrefs → panel URLs, remove negotiable copy
□ 63. Update section id="pricing" → id="plans" in JSX
□ 64. Update navItems: "Plans" href → "#plans"
□ 65. Verify: no CTA on homepage still points to Discord as primary action
□ 66. npm run build → confirm no build errors
□ 67. Test: product spotlight before/after is legible on mobile
□ 68. Test: plans section renders 3 tiers with correct CTAs
□ 69. Test: checkout flow still works (open checkout, complete purchase attempt)
□ 70. Git commit: "phase-3: product conversion layer complete"

PHASE 4 EXECUTION

□ 71. Gather real platform statistics (creator count, licenses, tracks) — confirm accuracy
□ 72. Gather real product testimonials from named, verifiable creators
□ 73. Source Discord, Roblox, Parcel logo SVGs
□ 74. Update stats[] array with platform-relevant real numbers
□ 75. Update testimonials[] array with product-specific testimonials
□ 76. Add integrations[] data array
□ 77. Update Social Proof section JSX: stats row + integration logos + testimonials
□ 78. Expand products[] array with 5 new ecosystem products (Audio Forge, Asset Manager, License Manager, Creator Panel, Donation Platform updates)
□ 79. Update Products section JSX: render all 8 products, Coming Soon treatment for unavailable
□ 80. npm run build → confirm no build errors
□ 81. Test: stats counter animation triggers on scroll for new stats
□ 82. Test: integration logos visible and properly sized
□ 83. Test: testimonials attributable and readable
□ 84. Test: all 8 products render with correct status badges
□ 85. Full Design QA Checklist from website-redesign-spec.md §18
□ 86. Git commit: "phase-4: trust layer complete"
□ 87. Soft announcement: share with Discord community, invite feedback

PHASE 5 EXECUTION

□ 88. Decision: React Router vs extended manual routing — document decision
□ 89. If React Router: npm install react-router-dom
□ 90. Create src/pages/ directory
□ 91. Migrate checkout route from page state to /checkout route
□ 92. Test: checkout flow works at /checkout path
□ 93. Create PageLayout component (shared header + footer)
□ 94. Extract Navbar component from App.jsx header
□ 95. Extract Footer component from App.jsx footer
□ 96. Create ProductAudioForge.jsx page
□ 97. Create ProductLicenseManager.jsx page
□ 98. Create ProductDonationPlatform.jsx page
□ 99. Create ProductAssetManager.jsx page
□ 100. Create CreatorPanel.jsx page
□ 101. Create PlansPage.jsx with full feature matrix
□ 102. Create DocsLanding.jsx
□ 103. Create Changelog.jsx
□ 104. Create About.jsx (portfolio content, company background)
□ 105. Update navigation to include all new routes
□ 106. Update vite.config.js: historyApiFallback for SPA routing
□ 107. Update index.html: page title and meta description
□ 108. npm run build → confirm no build errors
□ 109. Test: direct URL access to /products/audio-forge returns correct page
□ 110. Test: direct URL access to /plans returns Plans page
□ 111. Test: direct URL access to /checkout returns checkout flow
□ 112. Full Core Web Vitals check (Lighthouse)
□ 113. Git commit: "phase-5: multi-page architecture complete"
□ 114. Public announcement: Hibob Studio platform launch
```

---

## Section 19 — Final Recommendation

### If only one phase could be shipped this month, which phase?

**Phase 1: Brand Repositioning.**

**Why:**

Phase 1 is the highest-impact, lowest-risk, fastest-to-implement phase in the entire roadmap. It requires no new components, no structural changes, no new dependencies, and no new design assets. It is almost entirely data object changes in a file the team already knows well.

The business impact of Phase 1 is disproportionate to its implementation effort. Every day the website shows "Hi, I'm HibobTheDev. I Build Roblox Experiences." and "Hire Me," the platform is actively reinforcing the wrong mental model in every visitor's mind. This costs positioning equity with every visit. The longer it runs, the more creators associate Hibob Studio with the commission model.

Phase 1 stops that cost immediately. After Phase 1 is live:
- The hero communicates "platform" not "freelancer"
- The primary CTA drives panel visits, not Discord commission inquiries
- The navigation structure reflects a platform company
- The brand name is "Hibob Studio" not a personal developer handle

Phase 1 can be completed in a single focused session (1-2 hours of implementation + review). It should not wait for Phase 2-5 to be planned, designed, or implemented. It should ship as soon as possible.

Phase 2-5 matter enormously — but they matter more after Phase 1 has already eliminated the positioning damage that accumulates with every visitor.

---

## Section 20 — Master Roadmap

```
TODAY
│  Current state: Personal portfolio, "Hire Me," commission model
│  All strategy documents complete (positioning, IA, blueprint, copy, spec)
│  No code has been changed
│
├── PHASE 1: Brand Repositioning                              [Days 1-2]
│   ├── Hero: platform headline, platform CTA
│   ├── Header: "Hibob Studio," "Open Creator Panel"
│   ├── Navigation: Home | Products | Plans | Contact
│   ├── Contact: "Get Started" not "Open for Commission"
│   ├── Pricing: "Creator Plans" not "Commission Pricing"
│   └── Footer: "Hibob Studio" not "HibobTheDev"
│
│   RESULT: Visitor sees platform, not freelancer
│
├── PHASE 2: Platform Story                                   [Days 3-6]
│   ├── Problem Statement section (new)
│   ├── Ecosystem Overview with 8-product hierarchy (new)
│   ├── Creator Identity section (new)
│   └── Navigation: + Ecosystem link
│
│   RESULT: Visitor understands connected platform, not product catalog
│
├── PHASE 3: Product Conversion Layer                         [Days 7-11]
│   ├── Audio Forge spotlight: before/after workflow
│   ├── License Manager spotlight: before/after workflow
│   ├── Workflow section: creator week visualization
│   └── Plans rewrite: access tiers, panel CTAs
│
│   RESULT: Visitor can visualize their workflow with the platform
│
├── PHASE 4: Trust Layer                                      [Days 12-15]
│   ├── Platform stats (real creator/license/track numbers)
│   ├── Product testimonials (named, verifiable, product-specific)
│   ├── Integration logos (Discord, Roblox, Parcel)
│   └── All 8 products visible (5 as Coming Soon)
│
│   RESULT: Visitor has evidence that the platform works and others use it
│
├── PHASE 5: Growth Layer                                     [Days 16-25]
│   ├── React Router introduction
│   ├── Individual product pages (/products/audio-forge, etc.)
│   ├── Plans page (/plans — full feature matrix)
│   ├── Docs landing (/docs)
│   ├── Changelog (/changelog)
│   ├── About page (/about — portfolio context here)
│   └── SEO metadata per page
│
│   RESULT: Multi-page platform site, discoverable, indexable
│
└── HIBOB STUDIO V2
    Full Creator Infrastructure Platform website.
    Every page reinforces: infrastructure, not services.
    Every CTA leads to: panel.hibobstudio.com.
    Every product is present: available or coming soon.
    Every visitor leaves knowing: what Hibob Studio is.
```

---

*This document is the implementation source of truth. When implementation decisions conflict with this document, consult the upstream strategy documents (positioning.md, information-architecture-v2.md, homepage-blueprint-v2.md, copywriting-system.md, website-redesign-spec.md) in order. The most upstream document takes precedence.*

*Hibob Studio — Implementation Plan — 2026-05-30*
