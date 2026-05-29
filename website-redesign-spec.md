# Hibob Studio — Website Redesign Specification

**Version:** 1.0  
**Date:** 2026-05-30  
**Source of Truth:** positioning.md + information-architecture-v2.md + homepage-blueprint-v2.md + copywriting-system.md  
**Status:** Master Specification — Implementation must conform to this document

> This document defines the experience, visual system, interaction model, hierarchy, and implementation requirements for the hibobstudio.com redesign. It does not contain implementation code. It does not contain design mockups. It contains the decisions that design and development must follow — and the reasoning behind each decision, so that edge cases can be resolved without returning to the source documents.

---

## Section 1 — Redesign Goals

### Primary Goal

Make hibobstudio.com the acquisition surface of a Creator Infrastructure Platform — not a personal portfolio, not a commission service, not a developer's showcase.

In the current state, a visitor who lands on hibobstudio.com forms the mental model "this is a Roblox developer I can hire." After the redesign, the same visitor must form the mental model "this is a platform built for Roblox creators." These two mental models are mutually exclusive. The redesign's primary goal is to produce the second one reliably, for every visitor, from the first scroll.

---

### Secondary Goal

Establish visual and experiential credibility as a platform company — without rebuilding from scratch.

The current codebase has a strong foundation: dark matte aesthetic, purple gradient system, React 19 + Vite + Tailwind CSS 4, bilingual support, scroll animations, and a functional checkout system. The redesign leverages this infrastructure. The goal is to reapply it to platform-company communication patterns, not to discard it for a new design system.

---

### Business Goal

Increase the conversion rate from website visit to Creator Panel session (`panel.hibobstudio.com`). Every design decision is evaluated against this goal. Sections that create clarity about the platform increase panel conversions. Sections that create confusion about the platform decrease them. Sections that have no effect on panel conversion are secondary in priority.

---

### User Goal

A serious Roblox creator lands on hibobstudio.com and leaves knowing: (1) this platform exists specifically for their context, (2) at least one product addresses a workflow problem they have right now, and (3) accessing it requires opening Creator Panel.

A creator who leaves the website without these three understandings has not been served by the redesign — regardless of how visually impressive the page is.

---

### Success Criteria

**Behavioral:**
- A user who lands on the homepage and reads only the hero section can correctly describe Hibob Studio as "a platform for Roblox creators" — not "a Roblox developer"
- The "Open Creator Panel" CTA receives more clicks than any other CTA on the page
- Visitors scroll past the hero into the problem section at a higher rate than the current bounce rate
- No visitor who interacts with the page for 2+ minutes still believes they can hire Hibob Studio for commission work

**Visual:**
- The first fold contains zero personal portfolio signals (no character illustration, no "Hi, I'm," no "Hire Me")
- The ecosystem section communicates product relationships visually without requiring the visitor to read all product names
- The navigation reflects a platform company, not a portfolio site

**Copy:**
- No occurrence of banned vocabulary from copywriting-system.md in any visible text
- All CTAs describe their destination, not the visitor's attitude toward clicking

---

### Failure Criteria

The redesign has failed if any of the following are true after launch:

- A visitor at 10 seconds still believes this is a freelancer's website
- "Hire Me" appears anywhere in the live site
- "Commission Pricing" appears anywhere in the live site
- The Projects portfolio section remains as a primary homepage section
- Products appear as independent items with no visual connection between them
- Creator Panel is not the destination of the primary CTA
- The brand name "HibobTheDev" (personal) appears in the header or footer in formal contexts

---

## Section 2 — Experience Principles

These ten principles govern every design decision. When two approaches are in conflict, the principle that appears higher in this list takes precedence.

---

### Principle 1 — Platform first, person second

The website communicates a platform, not a founder. The founder's expertise is what made the platform possible. But the platform is what the visitor is here for. Every design choice that foregrounds the person over the platform — a character illustration, first-person copy, a portfolio section in primary navigation — violates this principle.

Application: The hero visual is a product interface, not a person. The about page may reference the founder's experience. The homepage may not.

---

### Principle 2 — Recognition before excitement

The visitor must recognize Hibob Studio's relevance to them before they can be excited by it. Recognition comes from seeing their specific problem described back to them. Excitement is an appropriate response to a great demo, a compelling visual, or an impressive stat — but only after recognition is established.

Application: The Problem section comes before any product showcase. Animations and visual flourishes come after the visitor has enough context to appreciate them. Nothing exciting should happen before the visitor understands what they are looking at.

---

### Principle 3 — Specificity carries more weight than aesthetics

A visually stunning page that makes vague claims about "the future of creator tools" is less effective than a well-structured page that says "30 audio tracks in 10 minutes." Specificity is the design priority. Aesthetics serve specificity — they do not replace it.

Application: Every visual element should either communicate information or provide context for information. Visual elements that are purely decorative — particles, abstract gradients, animated backgrounds — are lower priority than visual elements that communicate ecosystem structure or product relationships.

---

### Principle 4 — Connection is the argument

The ecosystem's value is not the sum of its parts — it is the connections between the parts. Creator Identity enabling License Manager. License Manager visible in Creator Panel. Audio Forge output feeding into Asset Manager. If the visual system communicates eight products but not their connections, the core platform value proposition is invisible.

Application: The ecosystem visualization is not a grid of product cards. It is a structured visual that shows relationships. Connection lines, visual proximity, shared containers, and layer structure are not aesthetic choices — they are the design argument that Hibob Studio is a platform, not a product collection.

---

### Principle 5 — Dark surfaces signal professional tools

The dark matte background is not a style choice — it is a category signal. The tools that serious creators use for serious work are dark: code editors, Roblox Studio, Discord, game engines. A dark surface tells the primary audience "this tool is for work" before a word is read.

Application: Dark background is non-negotiable. Sections that introduce significant contrast (lighter backgrounds) should be used sparingly and with purpose — never as decoration, always as structural differentiation. A dark homepage with one light section creates emphasis. Multiple light sections create confusion.

---

### Principle 6 — Motion must earn its presence

Every animation on the website consumes the visitor's attention. Attention is finite. An animation that communicates nothing is an animation that consumed attention for no return. The current codebase uses scroll reveal animations effectively — they guide reading order without distracting from content. Any new animation must meet the same standard: does this animation communicate something, or does it just move?

Application: Entrance animations are permitted for all primary content sections (scroll reveal). Hover animations are permitted for interactive elements. Background animations — particles, floating shapes, rotating gradients — are not permitted unless they communicate something specific about the platform.

---

### Principle 7 — Hierarchy is architecture

Visual hierarchy is not decoration. It is the architectural argument of the page. The largest element communicates the most important thing. The most saturated color indicates the highest-priority action. The most prominent position on the screen holds the most critical message. Every deviation from this — making something visually large that is not important, making a secondary CTA as prominent as a primary one — is a miscommunication.

Application: Typography scale, gradient application, visual size, spatial position, and color saturation are all used exclusively to communicate importance. Nothing is made visually prominent for aesthetic reasons alone.

---

### Principle 8 — The panel is the destination, not the product

Creator Panel is not one product among eight. It is the destination of the entire website. Every section of the homepage either builds the understanding that leads a creator toward the panel, or it is not earning its position on the page. The panel CTA is always the primary action — not competing with product-specific CTAs, not competing with community links, not competing with "learn more" flows.

Application: "Open Creator Panel" is always the primary CTA, styled at the highest visual weight. Other CTAs that appear on the same screen are styled at lower visual weight without exception.

---

### Principle 9 — Trust is built by products that exist

The most credible trust signal on the page is a product that demonstrably works — accessible, functional, serving real creators. Social proof copy, testimonials, and statistics support this trust but cannot create it alone. A stunning testimonials section on a page with no working product is not trusted. A utilitarian product card for a product that actually exists and works is trusted.

Application: Trust signals in the visual hierarchy are prioritized as follows: (1) evidence that products exist and work (panel visual, product demos, functional states), (2) quantified adoption stats, (3) creator testimonials, (4) integration logos. The most common mistake is inverting this order.

---

### Principle 10 — Every page has one primary action

No section, no page, no view in the panel has two equally weighted primary actions. The visitor is always given one clear next step — and lower-commitment alternatives are available but visually subordinate. When a page presents two equally prominent CTAs, the visitor evaluates both and often chooses neither. One primary. One secondary. Never two primaries.

Application: This principle applies to every surface — homepage sections, product pages, plans page, panel screens, onboarding steps, and email templates. One primary action. Full stop.

---

## Section 3 — Visual Hierarchy

### Level 1 Attention — Category Declaration

**What it is:** The hero headline — the largest text element on the page.

**Why Level 1:** The visitor's eye travels to the largest, highest-contrast element first. On a dark background, a large white or gradient-treated headline commands first attention. This must contain the category declaration: what Hibob Studio is and who it is for.

**Design requirements for Level 1:**
- Font size: 64px minimum on desktop, 40px minimum on mobile
- Weight: 900 (maximum weight available)
- Color treatment: gradient on the key phrase (purple → cyan), white for supporting words
- Positioned in the upper-left quadrant of the first fold (not centered unless centered is justified by layout)
- Must be readable without scrolling on any standard screen at standard distance

**What must not compete with Level 1:**
- No other text element on the first fold may approach the size or weight of the H1
- The hero visual (right column on desktop) must not be so large or animated that it draws the eye before the headline

---

### Level 2 Attention — Ecosystem Scope

**What it is:** The ecosystem visualization — the structured diagram of eight products in connected hierarchy.

**Why Level 2:** After the visitor understands the category (Level 1), their next question is "how complete is this?" The ecosystem visual answers this. It must be large enough to be understood at a glance and positioned prominently enough to be encountered early in the scroll journey.

**Design requirements for Level 2:**
- The ecosystem section should use significantly more vertical space than a standard text section
- The visual diagram is the primary element — copy is secondary within this section
- Visual scale communicates hierarchy: Creator Panel and Creator Identity are visually larger or more prominent than peer products
- Color coding by layer is used for scannability: Content Layer products share a color, Monetization Layer products share a color
- Product names must be readable without hovering (hover can reveal descriptions, but names must be always-visible)

**What must not compete with Level 2:**
- The ecosystem section should not appear immediately after the hero — the Problem section must appear first, establishing why the ecosystem matters before showing its scope
- Product showcases that follow the ecosystem must not match the ecosystem section's visual weight — they are Level 3

---

### Level 3 Attention — Product Specificity

**What it is:** Individual product spotlights, social proof elements, pricing tiers.

**Why Level 3:** After the visitor understands the category (L1) and the scope (L2), they need specificity about the one or two products most relevant to them. Product spotlights, creator testimonials, and pricing tiers are all Level 3 elements — important, but contextually discovered rather than immediately commanded.

**Design requirements for Level 3:**
- Section headlines (H2) at 32-40px, weight 700-800
- Product cards use consistent card system (see Section 7 for card philosophy)
- Typography hierarchy within product spotlights: product headline (H3) → supporting copy → feature details → CTA
- Social proof elements (stats, testimonials) are visually integrated into the page flow, not presented as separate "trust wall" sections isolated from product context

**The hierarchy rule that cannot be broken:**
Level 1 (category) must always be visually dominant over Level 2 (ecosystem) which must always be visually dominant over Level 3 (specificity). If a product card is styled at the same visual weight as the hero headline, the hierarchy is broken.

---

## Section 4 — Information Hierarchy

### After 5 seconds

**Information delivered:** Hibob Studio is a platform for Roblox creators.

**How it's delivered:** Hero headline only. The visitor has not scrolled. They have read the badge (category label above headline) and the H1 (category declaration). Nothing else.

**Design requirement:** The category label and H1 together must deliver this understanding without any supporting copy. If the visitor needs to read the subheadline to understand the category, the H1 has failed.

**Test:** Cover the subheadline and CTA with your hand. Read only the badge and H1. Can you state the category in one sentence? If yes, the 5-second requirement is met.

---

### After 15 seconds

**Information delivered:** This platform addresses specific Roblox creator problems I have experienced.

**How it's delivered:** Hero subheadline + the beginning of the Problem section. The visitor has read the H1, the subheadline, possibly the CTA labels, and has begun the Problem section. They have scrolled once.

**Design requirement:** The hero subheadline must name a specific problem (audio publishing, whitelist management, identity fragmentation) — not describe the platform abstractly. The Problem section's opening must match the subheadline's specificity immediately, without transition copy that delays the problem statement.

---

### After 30 seconds

**Information delivered:** This platform has multiple interconnected products that together address my operational workflow.

**How it's delivered:** Problem section (complete) + ecosystem overview (encountered, not necessarily fully read). The visitor has experienced the resonance of the problem section and seen the scope of the ecosystem diagram.

**Design requirement:** The ecosystem diagram must communicate "multiple connected products" in a single visual glance — before the visitor reads any product name. The structure of the diagram is the information at 30 seconds, not the text within it.

---

### After 2 minutes

**Information delivered:** One or two specific products are directly relevant to my workflow, and I understand what changes if I adopt them.

**How it's delivered:** Product spotlights (fully read), possibly Creator Identity section. The visitor has identified their most relevant products through the before/after workflow descriptions.

**Design requirement:** Product spotlights must lead with the before-state (the problem the creator currently lives with) and end with the after-state (what is different). The first paragraph of any product spotlight must be recognizable to the specific creator type who would benefit from that product.

---

### After 5 minutes

**Information delivered:** I know the pricing, I understand the onboarding path (connect identity → access products), and I am ready to take action.

**How it's delivered:** Creator Plans section (fully reviewed), Creator Identity section (understood), Closing CTA (encountered). The visitor has resolved the cost objection and understands what the first step in the panel looks like.

**Design requirement:** The Plans section must be scannable in 15 seconds — the visitor should be able to identify their most likely tier without reading every feature line. The Creator Identity section must explicitly state that connecting identity is the first step — setting the expectation before the panel visit.

---

## Section 5 — Conversion Hierarchy

### Primary CTA — "Open Creator Panel"

**Destination:** `panel.hibobstudio.com`  
**Visual treatment:** Color-filled button, highest contrast on page, purple gradient fill or solid accent color. Present in: sticky header, hero, closing CTA section.  
**Behavior:** Same-tab navigation to Creator Panel — not a new tab. See homepage-blueprint-v2.md §10 for the reasoning.  
**Priority:** No other clickable element on the page may match or exceed the visual weight of this CTA except for the logo.

**The rule it cannot violate:** "Open Creator Panel" is the primary CTA on every page of hibobstudio.com. There is no page — no product page, no plans page, no about page — where a different CTA takes primary position over "Open Creator Panel."

---

### Secondary CTA — "Explore Products" or product-specific ("Try Audio Forge")

**Destination:** `/products` or specific product page or panel product section  
**Visual treatment:** Ghost/outline button, or text link with arrow icon. Never color-filled. Never the same size as the primary CTA.  
**Behavior:** May open in same tab. Never opens a modal or lightbox.  
**Priority:** Secondary CTAs support visitors who are not yet ready for the panel. They exist to retain attention — not to convert. They succeed if they prevent a bounce, not if they drive the primary conversion.

---

### Tertiary CTA — "See full comparison," "Read the docs," "Join the community"

**Destination:** `/plans`, `/docs`, Discord server  
**Visual treatment:** Text-only with underline or arrow. No button treatment. Minimum visual weight.  
**Priority:** These are escape valves for visitors with specific information needs. They must not interfere with primary or secondary conversion. They may appear at the end of a section as a supporting link — never as the primary call to action within that section.

---

### What must never compete with primary conversion

The following elements, if placed near the primary CTA, actively reduce its conversion rate by creating choice paralysis:

- Two color-filled buttons of equal size in the same section
- A secondary CTA in ghost button style that is the same height as the primary CTA
- Navigation links visually indistinguishable from CTA buttons
- Any CTA that suggests a service relationship ("Contact Us," "Get a Quote") — even if visually subordinate, the existence of this option confuses the platform positioning
- Pricing information immediately adjacent to the primary CTA in the hero — pricing before value comprehension creates cost-first evaluation

---

## Section 6 — Section Hierarchy

Every homepage section is evaluated across five dimensions: purpose, priority, visual weight, conversion weight, and trust weight.

**Scale:** 1 (lowest) to 5 (highest)

---

### Sticky Navigation

**Purpose:** Persistent access to all primary destinations; primary CTA always accessible  
**Priority:** 5 — present on every scroll position  
**Visual Weight:** 3 — present but not dominant; semi-transparent on scroll, solid on top  
**Conversion Weight:** 5 — "Open Creator Panel" in navigation is the primary recovery CTA for visitors who intend to convert but haven't yet  
**Trust Weight:** 3 — brand logo in header is a constant trust anchor; navigation structure communicates platform maturity

---

### Section 1: Hero

**Purpose:** Category declaration; answer "what is this?" in 3 seconds  
**Priority:** 5 — the most critical section on the page  
**Visual Weight:** 5 — largest text, most visual space, most intentional composition  
**Conversion Weight:** 4 — primary CTA is here; but the hero's primary job is retention, not immediate conversion  
**Trust Weight:** 3 — micro-trust signals (integration icons, platform stat) support but don't lead

---

### Section 2: Problem Statement

**Purpose:** Create resonance; make the creator feel understood before any product is introduced  
**Priority:** 5 — without this section, all product sections lose context and persuasive force  
**Visual Weight:** 2 — deliberately understated; this section speaks, it does not display  
**Conversion Weight:** 1 — no CTA in this section; conversion is not the purpose here  
**Trust Weight:** 4 — specific, accurate description of daily creator pain is itself a trust signal: it demonstrates that the platform was built by someone who has experienced the problem

---

### Section 3: Ecosystem Overview

**Purpose:** Show all eight products as a connected system; answer "how much does this solve?"  
**Priority:** 5 — without this section, Hibob Studio looks like a product, not a platform  
**Visual Weight:** 5 — the ecosystem diagram is the most visually complex element on the page  
**Conversion Weight:** 2 — one directional CTA to /products; ecosystem section builds intent, not immediate conversion  
**Trust Weight:** 3 — showing eight connected products communicates platform maturity and investment

---

### Section 4: Product Spotlight (×2)

**Purpose:** Specificity; give the creator a before/after for their most immediate pain point  
**Priority:** 4 — essential for conversion but positioned after category and scope are established  
**Visual Weight:** 4 — two-column layout, product visual dominant, feature contrast visible  
**Conversion Weight:** 4 — product-specific CTA ("Try Audio Forge") drives intent conversion  
**Trust Weight:** 3 — specific workflow description builds product credibility

---

### Section 5: Creator Identity

**Purpose:** Explain the foundation; set the expectation that identity is the first step  
**Priority:** 4 — without this, creators arrive at the panel confused about why they need to connect accounts first  
**Visual Weight:** 3 — explanatory section; not the most visually spectacular but carries critical information  
**Conversion Weight:** 3 — direct CTA to identity connection in the panel  
**Trust Weight:** 4 — demonstrating that the platform has a verified identity layer is a significant credibility signal

---

### Section 6: Workflow in Practice

**Purpose:** Imagination trigger; allow the creator to visualize their week with the platform in place  
**Priority:** 3 — important for conversion depth but not for initial platform comprehension  
**Visual Weight:** 3 — timeline or before/after structure; moderate visual investment  
**Conversion Weight:** 2 — no direct CTA; this section converts by building imagination, not by directing action  
**Trust Weight:** 3 — showing a realistic week communicates that the platform is designed for actual use, not theoretical use

---

### Section 7: Social Proof

**Purpose:** Validation; give the creator evidence that the platform works and others use it  
**Priority:** 3 — important for trust but positioned after product understanding is established  
**Visual Weight:** 2 — supporting visual treatment; stats cards and testimonial quotes without heavy visual investment  
**Conversion Weight:** 2 — no primary CTA; validation section  
**Trust Weight:** 5 — this is the highest trust-weight section on the page

---

### Section 8: Creator Plans

**Purpose:** Resolve the cost objection; communicate access levels before the final CTA  
**Priority:** 4 — must appear before the closing CTA; pricing unresolved at the moment of conversion creates hesitation  
**Visual Weight:** 3 — standard pricing card treatment; prominent but not dominant  
**Conversion Weight:** 4 — plan CTAs drive subscription starts; "Open Creator Panel" appears in each plan card  
**Trust Weight:** 3 — transparent, published pricing is itself a trust signal (versus "everything negotiable")

---

### Section 9: Closing CTA

**Purpose:** Final invitation; one action for visitors who scrolled the entire page  
**Priority:** 5 — the final conversion surface; must be the clearest section on the page  
**Visual Weight:** 4 — visually distinct from all other sections; treated as a resolved conclusion, not a desperate push  
**Conversion Weight:** 5 — the highest conversion-weight section after the hero  
**Trust Weight:** 2 — trust was built in earlier sections; this section channels it to action

---

### Footer

**Purpose:** Navigation for visitors who reached the bottom; company credibility  
**Priority:** 2 — supports all other sections but is not a primary homepage concern  
**Visual Weight:** 1 — functional, not prominent  
**Conversion Weight:** 2 — product links may drive late discovery; Discord link for community  
**Trust Weight:** 2 — company footer structure (not personal link list) signals platform maturity

---

## Section 7 — Visual System Strategy

### Dark Theme Philosophy

The dark matte background (`#03010f` or equivalent near-black) is the primary surface of the entire website. It is not a theme in the toggle sense — it is the default, permanent state.

**Why dark:** The primary audience uses dark environments as a signal for professional tooling. Roblox Studio is dark. VS Code is dark. Discord is dark. When Hibob Studio is dark, it signals "built for builders" without a word. A light or mixed-light website signals "built for general audiences" — which contradicts the positioning of a platform for serious creators.

**Surface hierarchy within dark:**
- **Layer 0 (deepest, most common):** Primary background — `#03010f` or equivalent
- **Layer 1 (card surfaces):** Slightly elevated — `#0a0614` or equivalent; 4-8px border-radius; used for product cards, pricing cards, testimonial cards
- **Layer 2 (modal/elevated surfaces):** `#110820` or equivalent; used for overlays, dropdowns, active states
- **Layer 3 (glow surfaces):** Dark + colored glow — used sparingly for featured/highlighted elements (the highlighted pricing card, the featured product)

**Section differentiation:** Sections are differentiated by subtle background variation, not by switching to light backgrounds. A section with a very slightly lighter background (`#06020f` to `#0a0614`) appears as distinct from adjacent sections without breaking the dark atmosphere.

---

### Gradient Philosophy

The purple-cyan gradient is the highest-value visual asset in the Hibob Studio brand. Its value depends entirely on restraint. The moment it appears everywhere, it communicates nothing.

**The gradient as emphasis:** Gradients appear on elements that require the visitor's primary attention. Used correctly, a visitor's eye will always travel to gradient-treated elements first. Used incorrectly (applied everywhere), the visitor's eye has nowhere useful to land.

**Full treatment of gradient philosophy in Section 8.**

---

### Surface Philosophy

Every surface in the design carries one of four states:

1. **Resting:** Default state. Dark background, subtle border or no border. Low visual emphasis.
2. **Elevated:** Slightly lighter background (Layer 1). Used for interactive cards that should invite attention without demanding it.
3. **Featured:** Gradient border, or slightly higher surface color, or colored glow. Reserved for one element per section — the most important card, the recommended plan tier, the primary CTA.
4. **Active/Hover:** State change on interaction. Borders light up, background lifts slightly, cursor indicates interactivity.

**The rule:** Only one element per visible viewport area should be in "Featured" state at any time. Two featured elements in the same view cancel each other's emphasis.

---

### Card Philosophy

Cards are the primary repeated component across the website — product cards, pricing cards, testimonial cards, stat cards. They must all derive from the same base card system.

**Base card anatomy:**
- Background: Layer 1 (`#0a0614` or equivalent)
- Border: 1px, very low opacity white (`rgba(255,255,255,0.06)`) by default
- Border-radius: 12px (consistent across all cards — deviation from this creates visual inconsistency)
- Padding: 24px (standard), 32px (featured/prominent), 16px (compact)
- Shadow: No box shadow (dark theme with subtle glow performs better than traditional box shadow)

**Card states:**
- Default: Base card as described above
- Hover: Border opacity increases (`rgba(255,255,255,0.12)`), very slight background lift
- Featured: Gradient border (gradient applied to border, not fill), optional colored glow behind the card
- Disabled/Coming Soon: Base card, reduced opacity (0.5-0.6), "Coming Soon" badge

**The rule:** Cards are not decorated. Cards are structured. The visual weight of a card comes from its content hierarchy — large headline, supporting copy, CTA — not from applied decoration.

---

### Spacing Philosophy

Spacing communicates section importance and reading comfort. A page where all sections have identical spacing feels monotonous. A page where spacing varies intentionally creates rhythm.

**Spacing scale:**
- Micro: 8px (internal component spacing — between icon and label, between stat value and label)
- Small: 16px (intra-card spacing, tight list items)
- Medium: 24-32px (card padding, between form fields, between a headline and its subheadline)
- Large: 48-64px (between a section headline and its content, between two cards in a row)
- XLarge: 96-128px (between homepage sections — the breathing room that separates one section's story from the next)
- XXLarge: 160px+ (hero section top padding — the opening breath before the category declaration)

**Section spacing rule:** The space between sections (XLarge) must be noticeably larger than the space within sections (Large). If a visitor cannot visually identify where one section ends and another begins, the section spacing is too small.

---

### Typography Philosophy

Typography in a dark environment works differently than in a light environment. High contrast (bright text on dark background) is the primary legibility tool, not font weight variation alone.

**Type hierarchy:**

| Level | Size (Desktop) | Size (Mobile) | Weight | Color |
|-------|---------------|---------------|--------|-------|
| H1 (Hero) | 64-80px | 40-48px | 900 | White + gradient key phrase |
| H2 (Section) | 36-44px | 28-36px | 700-800 | White |
| H3 (Product/Card) | 22-28px | 20-24px | 600-700 | White |
| Eyebrow (Badge/Label) | 12-14px | 11-13px | 500-600 | Accent (muted purple or cyan) |
| Body | 16-18px | 15-16px | 400 | `rgba(255,255,255,0.75)` — not pure white |
| Caption/Meta | 13-14px | 12-13px | 400 | `rgba(255,255,255,0.5)` |
| CTA Button | 15-16px | 14-15px | 600 | Varies by CTA type |

**The white value rule:** Body copy is not pure white (`#ffffff`). It is 75% white opacity on dark background. This reduces visual harshness and creates a subtle hierarchy between headlines (pure white) and body (muted white). The human eye perceives this as depth, not as lower contrast.

**Line height:** Body copy: 1.7-1.8 line height. Headlines: 1.1-1.2 line height. Cramped headlines and loose body copy are both wrong. Headlines should be tight. Body should breathe.

**Letter spacing:** Eyebrow/badge text: 0.08-0.12em (slightly tracked out for visual differentiation). Headlines: -0.02em (slightly tighter than default — this adds polish at large sizes). Body: 0 or -0.01em (no visible tracking adjustment).

---

## Section 8 — Gradient Rules

### Where gradients appear

**1. The hero H1 — key phrase only**
The primary headline receives gradient treatment on 2-4 words — the most important phrase in the headline. Not the entire headline. If the entire headline is gradient, the gradient is decoration. If only the key phrase is gradient, the gradient is emphasis.

Correct: "Creator infrastructure for **serious Roblox creators**." (gradient on "serious Roblox creators")
Incorrect: Entire headline in gradient, or gradient on words that don't carry the most meaning.

**2. Primary CTA buttons — fill treatment**
The primary "Open Creator Panel" button uses a gradient fill (purple → accent) as its background. This is the page's highest-conversion surface. The gradient treatment on the button directly signals "this is the most important action."

**3. Section eyebrow labels**
Small eyebrow text above section headlines (e.g., "Creator Infrastructure Platform" above the hero H1, or "Products" above the product spotlight H2) uses a gradient text treatment at small size. This creates visual coherence between the eyebrow and the headline it introduces.

**4. Featured card border**
The featured/recommended pricing tier, or the highlighted product card, uses a gradient border treatment (gradient applied to border, not fill). This differentiates one card from its peers without the harshness of a full gradient fill in a card context.

**5. Creator Identity / ecosystem connection lines (optional)**
In the ecosystem diagram, connection lines between products can use a gradient treatment to visually reinforce the connection relationship. If connection lines are used, they should use a muted version of the gradient — at 40-60% opacity — to suggest connection without commanding attention.

**6. Hover accent states**
When a navigation item or interactive card is hovered, a gradient underline or gradient border accent may appear. This is the minimum use of gradient — functional, not decorative.

---

### Where gradients do NOT appear

**Body text:** No gradient on any body copy. Gradient on body text makes reading physically difficult and communicates visual desperation.

**Section backgrounds:** No gradient fills on section backgrounds as decoration. A dark gradient that shifts from `#03010f` to `#06011a` as a section background is acceptable for structural differentiation. A rainbow or purple-to-cyan gradient as a section background is not acceptable.

**Secondary CTAs:** Secondary CTAs (ghost/outline buttons) do not have gradient fills. They may have a gradient hover state on the border — but the default state is a simple outline.

**Cards (background fill):** Card backgrounds are flat dark surfaces, not gradient fills. A gradient fill on a card background is a design anti-pattern in dark environments — it creates visual noise that competes with the card's actual content.

**Testimonial cards:** Testimonial cards are text-forward. Any gradient treatment on testimonial cards moves attention away from the content and toward the decoration.

**Icons used as functional elements:** Functional icons (close, back, arrow) are white at specified opacity, not gradient-treated. Gradient on functional icons adds visual weight to elements that should be invisible when not needed.

---

### How gradients communicate hierarchy

The gradient is a hierarchy signal. Items without gradient treatment are at lower visual hierarchy. Items with gradient treatment are at higher hierarchy. This creates a readable visual hierarchy system:

**Gradient at full treatment:** Primary action (CTA button), primary message (H1 key phrase), featured state (recommended plan)
**Gradient at muted treatment (60-70% opacity):** Eyebrow labels, section identifiers, connection lines in ecosystem
**Gradient at very muted treatment (30-40% opacity):** Decorative border accents on non-featured cards (hover state only)
**No gradient:** All other elements

The hierarchy is broken if gradient appears at full treatment on more than 3 visible elements simultaneously. The eye has nowhere to prioritize.

---

### How gradients avoid becoming decoration

The test: Remove the gradient from the element. Does the element lose meaning or just visual interest?

- Remove gradient from the primary CTA button: The button loses visual priority relative to secondary CTAs. The gradient is informational — it communicates hierarchy.
- Remove gradient from the H1 key phrase: The headline becomes flat, but the category information remains. The gradient on the headline is partially decorative — but it also creates the brand signature that makes the page recognizably Hibob Studio.
- Remove gradient from a card background: The card loses visual energy but nothing informational. The gradient on card backgrounds is decoration — it should not be there.

Apply this test to every gradient element. If removal loses only aesthetics, reconsider the gradient. If removal loses hierarchy information, the gradient is justified.

---

## Section 9 — Motion System

### What should animate

**Scroll reveal (entrance):** All primary content elements — headlines, product cards, stat figures, testimonials — animate into view as the visitor scrolls to them. The animation is subtle: opacity 0→1 + translateY 20px→0 + blur(4px)→blur(0) over 400-500ms with ease-out cubic-bezier. This pattern already exists in the codebase and should be preserved.

**Counter animation (stats):** Numerical statistics (creator count, license count, audio tracks processed) animate from 0 to their value when scrolled into view. Duration should match the number magnitude — a count to 30 takes less time than a count to 1000. Already exists in codebase.

**CTA hover (micro-interaction):** Primary CTA button responds to hover with: subtle scale increase (1.02x), brightness increase on gradient fill, optional subtle glow appearance. Duration: 150ms. This communicates interactivity without distracting from content.

**Navigation active state:** The navigation pill indicating the current section (as the user scrolls) animates smoothly between positions — sliding underline or background pill transition. Already exists in codebase.

**Card hover (elevation):** Cards respond to hover with: border opacity increase (0.06→0.12), very slight translateY (-2px), optional subtle glow behind card. Duration: 200ms. This communicates interactivity on touch-alternative devices.

**Ecosystem diagram (hover reveal):** In the ecosystem visualization, hovering a product node reveals its one-line description. Reveal animation: opacity 0→1 over 200ms. Not a full tooltip — an inline reveal within the diagram.

---

### What should NOT animate

**Background animations (particles, floating shapes, animated gradients):** These are the most common visual mistake in creator tool design. They are visually impressive for approximately three seconds, then become cognitive friction. Every frame of animation they consume is attention taken from content. Prohibited.

**Continuous looping animations not serving information:** The character float animation in the current hero should not carry over to the new hero. A floating product card is appropriate only if the motion communicates something (e.g., "this is interactive"). A floating decorative element communicates nothing.

**Entrance animations that delay reading:** If a section headline takes longer than 300ms to become fully readable after scroll, the animation is delaying information. The visitor scrolled because they want to read. Don't make them wait.

**Transition animations between pages (unless very brief):** Full-page transitions that take 500ms+ are website animations masquerading as product animations. They feel appropriate in an app — they feel slow in a website.

**Hover animations that require settling:** If a hover state takes more than 250ms to complete, the card "settles" visually after the cursor is in position — this creates a lag that feels unpolished. Maximum 200ms for all hover states.

---

### Hover behavior

**Interactive elements (buttons, cards, nav items):** Cursor changes to pointer. Visual state change (see "What should animate"). No tooltip required for elements that are already labeled.

**Product nodes in ecosystem diagram:** Cursor changes to pointer. Hover reveals the product's one-line description inline. The reveal does not expand the card size — the description appears within the existing card space.

**Navigation items:** Underline or background pill appears (matches existing nav active state behavior). Gradient accent appears on hover for the primary CTA nav button.

**Footer links:** Simple opacity increase on hover (0.6→1 opacity for muted link text). No other hover behavior required for footer.

---

### Entrance behavior

**Section entrance:**
- Trigger: When section enters the viewport (not at scroll start — this causes all animations to trigger simultaneously on mobile)
- Trigger threshold: 15% of section height into viewport
- Animation: opacity 0→1, translateY 24px→0, optional blur(4px)→blur(0)
- Duration: 400ms
- Easing: cubic-bezier(0.16, 1, 0.3, 1) — fast start, controlled deceleration

**Stagger for card grids:**
- When multiple cards in a grid enter view simultaneously, they stagger: 60-80ms delay per card, left to right
- Maximum stagger on mobile: 3 cards with 40ms delay — longer stagger durations on mobile feel slow

**The no-animation rule for above-fold content:** Hero content should not animate on load. The visitor is waiting for the page — making them wait for the hero animation is adding delay to the most critical content. Hero content appears immediately. Sections below the fold animate on scroll.

---

### Scroll behavior

**Smooth scroll:** The existing smooth scroll behavior for anchor navigation (#home, #products, etc.) is preserved. Scroll duration: 600-800ms. Easing: ease-in-out.

**Navigation active section tracking:** The existing IntersectionObserver implementation that updates the active nav pill as the user scrolls is preserved. Threshold: 50% of section in viewport.

**Progress bar:** The existing scroll progress bar in the header is preserved. It communicates reading position, which is a useful signal for long-form content.

**Back-to-top button:** Preserved. Appears after 500px scroll. Smooth scroll to top on click.

**Parallax:** Not permitted. Parallax scrolling creates motion sickness for a meaningful percentage of users and performs poorly on mobile. Any parallax effect in the current codebase should be removed.

---

### Performance requirements

**Frame budget:** All animations must execute at 60fps (16ms frame budget) on a mid-range mobile device. This is non-negotiable. An animation that looks good on desktop but drops frames on mobile is a design failure for this audience — the primary audience uses mobile for discovery.

**Animation that triggers GPU compositing:** Only use transform and opacity for animations (no animating height, width, top, left, background-color). Transform and opacity are GPU-composited and do not trigger layout recalculation. Any animation using other properties is a performance anti-pattern.

**Prefers-reduced-motion:** All animations must respect the `prefers-reduced-motion` media query. For users who have enabled this setting, all entrance animations immediately show final state (no transition). Counter animations show final value immediately. The interface must be fully functional and readable without any animation.

---

## Section 10 — Product Presentation System

### How products appear on the homepage

Products appear at three levels of depth across the homepage:

**Level 1 — Ecosystem overview (summary):**
Name + one-line description + status badge. No feature list. No pricing. This is the product's presence in the ecosystem diagram — just enough to identify its function.

**Level 2 — Product spotlight (mid-depth):**
Problem statement → workflow change → 2-3 key capabilities → CTA. Used for 2 featured products on the homepage (Audio Forge, License Manager). This is a two-column section with description on one side and a visual on the other.

**Level 3 — Product page (full depth):**
Full workflow description → feature breakdown → how it connects to the ecosystem → pricing context → CTA. This lives on individual product pages (`/products/audio-forge`, etc.), not on the homepage.

---

### How products relate to each other visually

The ecosystem diagram is the primary visual argument that products are connected. Its structure must communicate:

**Creator Identity is the foundation.** It appears at the base of the visual hierarchy — larger, or differently styled, or in a visually prominent position that signals "this is what everything else builds on." If Creator Identity is visually equal to all other products, the architecture is misrepresented.

**Creator Panel is the hub.** It appears in a central or top-center position. In a wheel diagram: Creator Panel is the hub, other products are spokes. In a layered diagram: Creator Panel is the top layer. In a card grid: Creator Panel is the largest, most prominent card.

**Products within layers share visual treatment.** Audio Forge and Asset Manager (Content Layer) share a color treatment. License Manager, Donation Platform, and Creator Plans (Monetization Layer) share a different color. API Infrastructure (Developer Layer) has its own treatment. This color-by-layer approach makes the architecture scannable before it is readable.

**Coming Soon products are visually present but muted.** They appear in the same positions they will eventually occupy — not absent, not buried. They carry a "Coming Soon" badge. Their opacity is reduced (0.5-0.6). This communicates roadmap transparency, not product absence.

---

### How ecosystem is visualized

The ecosystem visualization is the most architecturally important component on the homepage. Its design must be decided carefully — the wrong visual structure will communicate "eight separate products" rather than "one connected system."

**Recommended structure: Layered architecture diagram**

```
┌─────────────────────────────────────────────────────────────────┐
│                  CREATOR PANEL (Hub Layer)                       │
│              The command center for everything                   │
└────────────────────────┬────────────────────────────────────────┘
                         │
         ┌───────────────┼───────────────────────────┐
         ↓               ↓                            ↓
┌──────────────┐  ┌──────────────────────────┐  ┌──────────────┐
│ CONTENT LAYER│  │   MONETIZATION LAYER      │  │  DEV LAYER   │
│ Audio Forge  │  │ License Manager           │  │ API Infra    │
│ Asset Manager│  │ Donation Platform         │  │              │
│              │  │ Creator Plans             │  │              │
└──────────────┘  └──────────────────────────┘  └──────────────┘
         │               │                            │
         └───────────────┴────────────────────────────┘
                         ↓
              ┌─────────────────────┐
              │  IDENTITY LAYER     │
              │  Creator Identity   │
              │  (Foundation)       │
              └─────────────────────┘
```

This structure communicates:
- Creator Panel as the access point (top)
- Creator Identity as the foundation (bottom, supporting everything above)
- Three functional layers in between
- Connections between panel, layers, and identity

**Alternative structure: Hub-and-spoke diagram**
Creator Panel in the center, Creator Identity forming an outer ring/foundation, other products as spokes extending from the center. This is a more common visualization pattern but risks making Creator Identity appear equal to other products rather than foundational.

**The visual must not be a plain grid.** A 4×2 or 3×3 grid of product cards communicates "product catalog," not "interconnected system." Any product presentation on the ecosystem section that uses an equal-weight grid is a design failure for this specific section.

---

### How hierarchy is communicated in product presentation

**Size:** Creator Panel card is the largest or most prominent element in the ecosystem view. Creator Identity card is visually differentiated from peer products — larger, or differently positioned, or carrying a "Foundation" label.

**Position:** In Western reading contexts, the most important element occupies top-left or center-top. Creator Panel should occupy one of these positions.

**Color:** Gradient treatment on Creator Panel's label or border indicates its hub status. Creator Identity receives a distinct color accent that sets it apart from the functional layers.

**Label:** Creator Panel carries a label like "Your hub" or "Command center." Creator Identity carries a label like "Foundation" or "Everything connects here." These labels are the only instances where meta-description language is appropriate — they describe the role in the ecosystem, not features.

---

## Section 11 — Trust Presentation System

### How trust appears visually

Trust signals are integrated into the page flow, not isolated in a "Trust Wall" section. The most common mistake in trust presentation is collecting all social proof into one section — this creates a block of testimonials and statistics that feels like a marketing insert rather than evidence.

**Integration principle:** Trust signals appear in context. A stat about Audio Forge (tracks published) appears near the Audio Forge spotlight. A testimonial from a License Manager user appears near the License Manager section. Platform-wide stats appear near the closing CTA. The visitor encounters evidence in the context where it is most relevant — not in an isolated block.

---

### How proof appears

**Proof is specific and positioned.** Vague claims ("many creators use this") do not appear. Specific, positioned claims ("847 audio tracks published in the last 30 days, via Audio Forge") appear where their context makes them credible.

**Proof appearance:**
- Proof cards use the base card system (Layer 1 surface, subtle border)
- Primary proof element: the number (large, white, prominent)
- Supporting context: unit and time qualifier (smaller, muted white)
- Optional: small icon representing the product or metric category

---

### How metrics appear

**Stat display anatomy:**
```
[Large Number: e.g., "847"]  ← 48-60px, weight 700-800, white
[Unit/Context: "audio tracks published"]  ← 14-16px, weight 400, 75% white
[Timeframe if relevant: "this month"]  ← 13px, weight 400, 50% white
```

**Stats grid layout:** 3-4 stats in a row on desktop, 2 per row on tablet, stacked on mobile. Stats do not live in cards — they live in a minimal display arrangement that gives visual priority to the numbers themselves.

**Counter animation:** Stats count from 0 to their value on scroll entry. Counter duration: 1.5-2 seconds for numbers under 1000, 2-2.5 seconds for larger numbers. Easing: ease-out (fast start, slow finish — gives the number the feeling of settling into its value).

---

### How integrations appear

**Integration logos row:** A horizontal row of recognizable logos — Discord, Roblox, Parcel — labeled "Works with" or "Integrated with." Logos at 60-80% opacity (not full opacity — integration logos at full opacity create visual competition with content). On hover: logos animate to full opacity.

**Placement:** The integrations row appears within the hero section (as a trust signal) or near the Creator Identity section (where the integration most directly applies). It does not appear as a standalone section.

**Logo sizing:** All integration logos at consistent height (24-28px). Width varies by logo aspect ratio. Consistent height creates visual cohesion in the row.

---

### How testimonials appear

**Testimonial card anatomy:**
```
[Quote mark (decorative): gradient, large, 40-48px]
[Quote text: 16-18px, weight 400, 80% white, italic]
[Creator name: 14px, weight 600, white]
[Creator context: 13px, weight 400, 60% white — e.g., "Club Map Owner, Mutual Space Club"]
[Optional: small Roblox or Discord avatar]
```

**Testimonial grid:** 2 columns on desktop, 1 column on mobile. Maximum 3 testimonials on homepage — more than 3 creates a testimonials wall that feels curated rather than organic.

**Testimonial position:** Within the Social Proof section, which follows the Workflow section. Testimonials do not appear in the hero — too much cognitive load at first glance.

---

## Section 12 — CTA Presentation System

### How CTAs should look

**Primary CTA — "Open Creator Panel":**
- Background: Gradient fill (purple → accent, left-to-right or 135deg)
- Text: White, weight 600, 15-16px
- Border-radius: 8px (matches card system — consistent radius throughout)
- Padding: 12px 24px (generous but not oversized)
- Hover: Scale 1.02, brightness 1.1, optional subtle gradient glow behind button
- Icon: Arrow right (→) at end of label — indicates "going somewhere," not "doing something here"
- Width: Content-width (not full-width except on mobile where full-width is acceptable)

**Secondary CTA — "Explore Products," "See full comparison":**
- Background: Transparent
- Border: 1px solid `rgba(255,255,255,0.15)` — very subtle
- Text: White, weight 500, 14-15px
- Border-radius: 8px
- Padding: 11px 20px (1px less padding than primary to visually subordinate)
- Hover: Border opacity increases to 0.3, very slight background appearance
- Icon: Optional arrow right — lighter weight than primary CTA icon

**Tertiary CTA — text links:**
- No background, no border
- Text: `rgba(255,255,255,0.6)` with underline
- Hover: opacity increases to 1.0
- Font size: same as surrounding body copy
- Icon: Optional small arrow, 12px

---

### How primary CTA differs from secondary CTA

The visual difference must be unambiguous. A visitor who glances at a page section must be able to identify the primary CTA without reading the labels.

**The three-signal rule:** Primary CTAs differ from secondary CTAs on at least three visual signals simultaneously:
1. Background treatment (gradient fill vs. transparent)
2. Border treatment (no border vs. subtle border)
3. Visual weight (gradient text color vs. muted text color, or slightly larger padding)

If a visitor covers the text and cannot tell which button is primary from visual treatment alone, the CTA hierarchy has failed.

---

### How CTA density is controlled

**Per-section rule:** Maximum two CTAs in any single section. One primary, one secondary. No exceptions.

**Per-viewport rule:** At any scroll position, the sticky navigation's "Open Creator Panel" CTA is always visible. This is the universal primary CTA. Section-level CTAs are section-specific. The visitor always has access to the primary conversion action without requiring any section-level CTA.

**Section CTA requirement:** Not every section requires a CTA. Problem Statement has no CTA (it is a resonance section, not a conversion section). Workflow has no CTA. Social Proof has no CTA. CTAs appear in: Hero, Ecosystem overview (directional only: "Explore Products"), Product Spotlights, Creator Identity, Creator Plans, and Closing CTA.

---

## Section 13 — Navigation System

### Desktop navigation

**Structure:**
```
[Hibob Studio Logo]   Products   Plans   Docs   About   [Open Creator Panel →]
```

**Sticky behavior:** Navigation is sticky from page load. As the user scrolls past the hero, the navigation background transitions from fully transparent to a semi-opaque dark blur (backdrop-filter: blur(16px), background: rgba(3,1,15,0.85)). This prevents the navigation from visually clashing with section content while maintaining its sticky presence.

**Brand name display:** "Hibob Studio" — not "HibobTheDev." The logo (SVG) remains as-is, but any text instance of the personal brand name in navigation is replaced with the company brand.

**Active state:** The existing navigation pill active state (gradient border + semi-transparent background on current section) is preserved. This communicates reading position and provides visual feedback.

**"Open Creator Panel" button treatment:** Styled as a primary CTA button (gradient fill, same styling as page CTAs). Positioned at the far right of the navigation bar. This button never collapses into the hamburger menu on desktop — it remains visible at all times.

**Navigation link spacing:** 32-40px between each navigation item. Navigation items are 14px, weight 500. "Open Creator Panel" button is 14px, weight 600 (slightly heavier to match its CTA status).

---

### Mobile navigation

**Hamburger menu trigger:** Present on screens below 768px. The hamburger icon is 24px, positioned at the right of the mobile header. "Open Creator Panel" as a primary button appears beside the hamburger — not hidden behind it.

**Mobile menu structure (when open):**
```
[Close button (X)]
─────────────────
Products
Plans
Docs
About
─────────────────
[Open Creator Panel →]  ← Primary CTA, full-width, gradient fill
[Explore Products]  ← Secondary CTA, full-width, outline
```

**Mobile menu behavior:** Full-screen overlay (not a side drawer). Background: dark blurred overlay. Animation: opacity 0→1 + translateY -20px→0, 300ms. This already exists in the codebase as MobileMenu component.

**Mobile header behavior:** Logo on left, "Open Creator Panel" as a small button in center-right, hamburger on far right. The "Open Creator Panel" button on mobile header may be icon-only (panel icon) to save horizontal space, with a tooltip on press.

---

### Panel transition behavior

When the "Open Creator Panel" button is clicked from the navigation:
- Same-tab navigation (not new tab)
- No interstitial page or loading screen on the hibobstudio.com side
- If the creator is already logged into Creator Panel: redirect to panel dashboard
- If the creator is not logged in: redirect to panel's login/signup flow

**The mental model this creates:** "The panel is the same place as the website, I'm just going deeper." Same-tab navigation creates this continuity. New-tab navigation breaks it.

---

## Section 14 — Responsive Strategy

### Desktop (1440px and above)

The homepage is designed desktop-first — not because mobile doesn't matter, but because the ecosystem visualization and two-column product spotlights are the architecturally most important sections, and they require desktop-first layout design.

**Desktop priorities:**
- Two-column hero (text left, product visual right)
- Ecosystem diagram at full width, full hierarchy visible
- Two-column product spotlights (description left, visual right)
- Three-column pricing tiers
- Statistics row in single line

---

### Desktop (1024-1440px)

Same layout as 1440px+, with proportional scaling. Content max-width: 1200px with auto horizontal padding.

---

### Tablet (768-1024px)

**Layout adjustments:**
- Hero: Maintain two-column but reduce text size proportionally. Hero visual scales down or shifts to below text on narrow tablets.
- Ecosystem: Diagram may simplify — reduce to two visible layers with horizontal scroll for full view, or collapse to single-column layer stack.
- Product spotlights: May collapse to single-column (text above, visual below)
- Pricing: Two-column (2+1 or all three with narrower cards)
- Navigation: Full desktop navigation maintained down to 768px; hamburger triggered at 768px

---

### Mobile (below 768px)

Mobile is not a simplified version of desktop. It is a resequenced version of the same narrative.

**Mobile non-negotiables:**
- Hero headline and primary CTA above the fold on every device at standard browser chrome
- "Open Creator Panel" visible in the mobile header without requiring the hamburger
- Ecosystem: Vertical stack of layer groups — Identity Layer (foundation) at top, Creator Panel next, Content / Monetization / Developer layers below, with a single visual connector between layers
- Product spotlights: Single column, visual below text
- Pricing: Single-column, horizontally scrollable (swipe to see other tiers), recommended tier shown by default
- Statistics: 2×2 grid or single column

**Mobile typography adjustments:** 
- H1: 40-48px (never below 36px)
- H2: 28-34px
- Body: 15-16px (never below 14px)

**Mobile spacing:** XLarge section spacing (96-128px) reduces to 64-80px on mobile. The breathing room is still significant but not as generous as desktop.

---

### Responsive priority rule

When a design element must be compromised due to screen size, the priority of what to preserve:
1. Conversion elements (primary CTA, hero headline, pricing information)
2. Navigation (sticky, accessible "Open Creator Panel")
3. Section hierarchy (section order never changes between desktop and mobile)
4. Visual hierarchy within sections (most important element still most visually prominent)
5. Ecosystem diagram (simplifies but communicates connected structure, not isolated list)
6. Visual flourishes (de-prioritized on mobile — motion reduced, some hover states disabled)

---

## Section 15 — Design References Interpretation

### Nova Serverside aesthetic interpretation

**What to adopt:**
Nova Serverside represents the aesthetic of professional Roblox developer tools — dark environment, technical precision, creator-as-professional framing. The density of information (multiple products, system architecture shown) without being cluttered. The approach of presenting a tool as something used by serious people, not beginners.

From this reference, adopt: the willingness to show system complexity as a trust signal. A creator who sees a well-organized, technically sophisticated presentation of a product ecosystem feels that the product was built by someone who thinks in systems. This is the correct signal for Hibob Studio.

**What not to adopt:**
The visual identity is different. Nova Serverside's specific color treatment, component styles, and typography are not Hibob Studio's. Hibob Studio has its own established purple gradient system and dark matte palette. The reference is for the approach (serious, dense, technical) — not the aesthetic.

---

### Rick Waalders aesthetic interpretation

**What to adopt:**
Rick Waalders represents the aesthetic of a high-quality personal product brand — elevated typography, generous spacing, confidence in the visual presentation. The idea that a single person or small team can present work with the same visual authority as a large company. The use of typography as the primary visual element — letting words carry weight rather than relying on illustrations and decorations.

From this reference, adopt: typographic confidence. Large, weight-heavy headlines that take up space intentionally. The discipline to let white space (in this case, dark space) do work — not filling every pixel with content. The sense that the page was composed, not assembled.

**What not to adopt:**
Rick Waalders' work often centers on the personal brand of the individual behind the work. For Hibob Studio, the company and platform — not the individual — are the subject. The personal aesthetic approach cannot be adopted if it re-introduces the portfolio framing that the redesign is meant to eliminate.

---

### Creator tool aesthetic interpretation

**What to adopt:**
The creator tool aesthetic (Vercel, Linear, Supabase, Railway, etc.) represents the design language of platforms built for technical builders — dark backgrounds, gradient accents used sparingly, generous whitespace, flat but structured UI, typography that treats the reader as intelligent.

From this reference, adopt:
- The restraint. These platforms don't compete with their users' work — they provide infrastructure that recedes when not needed.
- The density that doesn't feel cluttered. Dense information is organized through hierarchy, not reduced to lowest-common-denominator simplicity.
- The trust that comes from looking like something people who do serious work would use.
- The use of product screenshots and interface previews as the primary visual — showing the tool, not describing it.

**What not to adopt:**
Generic SaaS visual patterns that have become so common they communicate nothing specific. The "floating app mockup on gradient background" hero composition is present on approximately 80% of SaaS homepages — using it communicates "another SaaS" not "creator infrastructure for Roblox." Hibob Studio's Roblox-specific visual language (the purple gradient, the dark matte, the creator-specific iconography) must be retained and developed, not replaced with generic SaaS visual vocabulary.

---

## Section 16 — Anti-Patterns

Everything listed here is prohibited from the redesigned website. No exceptions without explicit design-decision documentation explaining why the exception is justified.

---

### Portfolio anti-patterns

- Character or avatar illustration as the hero visual — this pattern places a person at the center; the redesign places a product
- "Hi, I'm [Name]" as a headline or copy pattern anywhere on the page
- First-person personal pronouns in any headline (subheadline may use "your" when addressing the creator directly)
- "Hire Me" in any location — button, nav, copy, tooltip, footer
- "Commission" as a noun in any copywriting context
- Project portfolio as a homepage section — 9 game cards are removed from the homepage
- Personal social links (personal Roblox profile, personal Twitter) in primary navigation
- "Open for Commission" or any variation in any section label
- "Why Me?" or "Kenapa Gua?" as section framing
- Services menu (World Building, Luau Scripting, GUI Design) as a primary section

---

### Agency anti-patterns

- "We handle everything for you" framing — the platform enables, it doesn't handle
- "Full-service" language anywhere
- Service package tiers (Basic/Standard/Premium that map to service scope, not platform access)
- "Our team" language that implies a service delivery team — Hibob Studio has an infrastructure team, not a delivery team
- "Dedicated support manager" framing (if a support mention is needed, frame it as "support resources" not as a person assigned to the creator)
- Quote request flows — if a creator needs a quote, the model is wrong

---

### Generic SaaS visual anti-patterns

- Floating app mockup on a gradient orb hero — this is the most common SaaS homepage visual and communicates nothing specific
- "Trusted by [logos of enterprise companies]" — Hibob Studio's trust signals are creator-community specific
- 3D isometric illustrations of product interfaces — they look impressive and communicate nothing about actual usage
- Purple-on-purple gradient overuse — the gradient is the brand's most powerful asset; used everywhere, it becomes visual noise
- "Feature wall" sections — 6-8 feature icons in a grid with one-line descriptions each — this is feature dumping in visual form
- Stock photography of people looking at screens — the audience builds tools, they are not the stock photo audience
- Animated hero video backgrounds — performance, accessibility, and attention fragmentation all argue against this
- Testimonial "wall" with 9+ testimonials — more than 3-4 testimonials on a page feels like quantity-as-substitute-for-quality

---

### Motion anti-patterns

- Particle systems or floating particle backgrounds — pure decoration, performance cost, accessibility issue
- Continuous rotation animations on any element — distracting, no informational value
- Parallax scrolling — accessibility issue, performance cost, no informational value
- Entrance animations on above-fold content — delays the most critical information
- Animations that trigger on load before the visitor has scrolled — forces the visitor to wait for content readiness
- Hover animations that take longer than 250ms — feels laggy
- Cascading entrance animations that make the visitor wait through a sequence before reading — if each element must appear before the next, the visitor is watching, not reading

---

### Copy anti-patterns (applied to visual system)

- Feature lists as the primary product card content — features tell the visitor what the product has; workflow descriptions tell them what changes
- "Learn More" as a CTA — this is a 2010-era web pattern; every CTA should describe its specific destination
- Pricing tables with more than 5 feature rows visible before expansion — pricing tables that require reading 20 rows create analysis paralysis
- Countdown timers or "Limited time offer" urgency patterns — Hibob Studio's authority comes from quality, not artificial scarcity
- Any form that asks for information the platform doesn't need to begin the relationship — email capture before value delivery reduces conversion

---

### Structural anti-patterns

- Navigation with more than 5 items (excluding the CTA button) — analysis paralysis applies to navigation as much as CTAs
- Footer with 3+ columns of links that all look equal in importance — footer navigation hierarchy matters
- Infinite scroll on the homepage — the homepage has a beginning, middle, and end; infinite scroll eliminates the ending and the closing CTA
- Pop-ups, modals, or overlays that appear unsolicited on page load — this is among the fastest ways to lose a creator's trust
- Cookie consent banners that block the hero — if legally required, they must be styled to minimally obstruct the hero and disappear after acknowledgment

---

## Section 17 — Implementation Priorities

These phases are ordered by business impact — the changes that most directly affect the platform positioning and conversion rate come first.

---

### Phase 1 — Immediate Positioning Fix (Highest Impact)

**Objective:** Eliminate all portfolio signals from the homepage. A creator landing on the site after Phase 1 should no longer form the mental model "freelancer."

**Phase 1 deliverables:**
1. **Hero section replacement** — New headline (platform category), new badge (category label not job title), new CTA ("Open Creator Panel" replaces "Hire Me"), hero visual updated from character illustration to Creator Panel representation
2. **Brand name correction** — All instances of "HibobTheDev" in the header, footer, and visible page content replaced with "Hibob Studio"
3. **Navigation update** — "Services" removed or renamed, "Projects" removed from primary nav, "Pricing" renamed to "Plans," "Open Creator Panel" added as primary nav CTA
4. **Contact section reframe** — "Open for Commission" section label removed, content reframed as platform onboarding CTA
5. **Pricing section reframe** — "Commission Pricing" label removed, tier names updated from service-types to creator-progression types

**Phase 1 success test:** A creator who lands on the homepage after Phase 1 does not believe they can hire Hibob Studio for commission work. This must be testable with a quick user question.

**Phase 1 does NOT include:** Full ecosystem section, product spotlight rewrites, social proof updates. These come in Phase 2.

---

### Phase 2 — Ecosystem and Product Presentation (High Impact)

**Objective:** Make Hibob Studio look like a platform by showing all eight products in connected hierarchy. A creator after Phase 2 should understand "there are multiple tools that work together."

**Phase 2 deliverables:**
1. **Ecosystem visualization section** — New section with all 8 products in connected hierarchy diagram. Creator Identity as foundation, Creator Panel as hub, functional layers (Content, Monetization, Developer). Coming Soon badges for unfinished products.
2. **Problem Statement section** — New section (currently absent) between hero and ecosystem. 3-5 specific creator pain points described in concrete, daily terms.
3. **Product spotlight expansion** — Audio Forge and License Manager spotlights replace or augment the current 3-product showcase. Before/after workflow structure for each.
4. **Creator Identity section** — New section introducing Creator Identity as the ecosystem backbone and first onboarding step.

**Phase 2 success test:** A creator who scrolls through the page after Phase 2 can name at least 2 products and describe how they connect to Creator Panel.

---

### Phase 3 — Trust and Conversion Optimization (Significant Impact)

**Objective:** Add evidence that the platform works and real creators use it. Optimize the conversion funnel from first visit to panel session.

**Phase 3 deliverables:**
1. **Social proof section** — Platform statistics (real, current numbers), 2-3 creator testimonials (product-specific, attributable), integration logos (Discord, Roblox, Parcel)
2. **Creator Plans section** — Summary pricing (3 tiers, not full feature matrix), access-framing language, CTAs per tier
3. **Closing CTA section** — Replaced with platform-appropriate closing: "Your creator infrastructure is ready. Open Creator Panel to begin."
4. **Workflow section** — Before/after creator week visualization
5. **Footer update** — Company footer structure replacing personal link list

**Phase 3 success test:** A creator who reaches the bottom of the page after Phase 3 has resolved the cost objection and takes action (opens panel, clicks plan CTA, or bookmarks for return).

---

### Phase 4 — Polish and Expansion (Growth Impact)

**Objective:** Expand the site architecture, refine motion system, launch individual product pages.

**Phase 4 deliverables:**
1. **Individual product pages** — `/products/audio-forge`, `/products/license-manager`, etc.
2. **Plans page** — Full feature matrix, FAQ, detailed comparison
3. **Docs section** — API documentation landing, getting started guides
4. **Changelog page** — Product update history
5. **Motion system refinement** — Ecosystem diagram hover reveals, product card transitions, panel preview animation
6. **Performance audit** — Core Web Vitals compliance, Lighthouse score optimization
7. **Bilingual content audit** — Ensure all Phase 1-3 new content has full ID/EN translations

**Phase 4 success test:** A creator can discover any product, understand it fully, and access it — without leaving the website until they are ready to open the panel.

---

## Section 18 — Design QA Checklist

Every page must pass this checklist before implementation begins (design QA) and before launch (launch QA).

---

### Positioning check

- [ ] The page communicates "platform," not "freelancer" — can be verified by showing the page to a creator with no context for 10 seconds and asking what kind of company it is
- [ ] "HibobTheDev" appears nowhere in the page in formal/brand contexts
- [ ] "Hire Me" appears nowhere on the page
- [ ] "Commission" (as a noun describing the business model) appears nowhere on the page
- [ ] "Open for Commission" or any variant appears nowhere on the page
- [ ] The primary CTA is "Open Creator Panel" or a functionally equivalent platform-entry label — not a contact or quote-request label
- [ ] Personal portfolio content (character illustration, first-person personal pronouns in headlines, games portfolio grid) is absent from primary homepage sections

---

### Visual hierarchy check

- [ ] The H1 headline is the largest text element on the first fold and has no competing element of equal visual size
- [ ] The primary CTA has a gradient fill; no secondary CTA on the same page section has a gradient fill
- [ ] Only one element per visible viewport has "Featured" visual treatment (gradient border or glow)
- [ ] The gradient appears in no more than 3-4 distinct locations on the entire page
- [ ] Background animations (particles, floating shapes) are absent
- [ ] All cards use consistent border-radius (12px) and consistent base surface color

---

### Content hierarchy check

- [ ] The hero headline communicates the category without requiring the subheadline to be read
- [ ] The Problem section appears before any product showcase
- [ ] Creator Identity section appears before the closing CTA (expectation is set for onboarding)
- [ ] The Plans section appears before the closing CTA (cost objection is resolved)

---

### CTA check

- [ ] No section contains more than two CTAs
- [ ] No two CTAs in the same section have equal visual weight
- [ ] Every CTA label describes the result of clicking, not the creator's attitude toward clicking
- [ ] "Learn More" does not appear as a CTA label anywhere on the page
- [ ] "Hire Me" does not appear anywhere on the page
- [ ] The sticky navigation's "Open Creator Panel" is visible at all scroll positions

---

### Typography check

- [ ] H1: 64px+ desktop, 40px+ mobile, weight 900
- [ ] H2: 36px+ desktop, 28px+ mobile, weight 700-800
- [ ] Body: 16px+ desktop, 15px+ mobile, weight 400, color at 75% white opacity (not pure white)
- [ ] All eyebrow/badge text is legible at small size (minimum 12px)
- [ ] Line height on headlines is 1.1-1.2; line height on body is 1.7-1.8
- [ ] No gradient treatment on body text

---

### Motion check

- [ ] All animations respect `prefers-reduced-motion` media query
- [ ] No animation above the fold runs on page load (hero content appears immediately)
- [ ] All hover animations complete in 250ms or less
- [ ] No background animations (particles, floating shapes)
- [ ] All scroll-triggered animations use only transform and opacity (no layout-triggering properties)

---

### Responsive check

- [ ] Hero headline and primary CTA are above the fold on iPhone 12/13 (390×844) at standard font size
- [ ] "Open Creator Panel" is accessible on mobile without opening the hamburger menu
- [ ] The ecosystem diagram communicates connected structure (not isolated list) on mobile
- [ ] No horizontal overflow on any mobile viewport width
- [ ] Text is readable without zooming on all tested mobile viewports

---

### Trust check

- [ ] All statistics on the page are real and current
- [ ] All testimonials are attributed to named, verifiable creators
- [ ] No testimonials reference commission work (old model)
- [ ] Coming Soon products are labeled as Coming Soon — not presented as available
- [ ] No product claims things it cannot reliably deliver

---

### Bilingual check (ID/EN)

- [ ] All new content has been translated and checked for tone consistency in both languages
- [ ] Language toggle is functional on all new sections
- [ ] Both language versions pass all checks in this checklist independently

---

## Section 19 — Redesign Success Test

A serious Roblox creator — a developer who has never visited hibobstudio.com before — lands on the redesigned homepage. They came from a Discord recommendation. They have no prior knowledge of the platform. They are on a desktop device with a normal internet connection.

---

### After 5 seconds (first fold only, no scroll)

**Expected thought:** "This is some kind of platform or tool for Roblox creators. It's not a freelancer. I don't know exactly what products it has yet, but it looks like something built for people who take their work seriously."

**What produces this thought:**
- The category label above the H1 names "Creator Infrastructure Platform" or equivalent
- The H1 declares the category and audience without first-person personal language
- The visual in the hero shows a product interface, not a person
- The primary CTA says "Open Creator Panel" — not "Hire Me"
- The navigation shows "Products | Plans | Docs | About" — the navigation of a platform company

**Success indicator:** The creator does not reach for the back button. They scroll.

---

### After 30 seconds (hero + problem section + beginning of ecosystem)

**Expected thought:** "This platform understands exactly what I waste time on. I've manually whitelisted buyers. I've uploaded audio one track at a time. I've verified community members across Discord and Roblox by hand. And they seem to have a lot of products that might address this — more than I expected."

**What produces this thought:**
- The Problem section names 3-5 specific, daily workflow frustrations in concrete language — not abstract "challenges"
- The ecosystem section is beginning to scroll into view — its scale communicates "multiple connected products"
- The creator has not yet encountered "Commission Pricing," "Services," or any portfolio-era signal

**Success indicator:** The creator slows their scroll at the problem section. They read it. They recognize something.

---

### After 2 minutes (through ecosystem + product spotlights + beginning of social proof)

**Expected thought:** "Audio Forge is what I need. I spend too long on audio every week and the before/after they're showing is exactly my experience. I want to see if this is actually what it says it is. How do I get into the panel?"

**What produces this thought:**
- Audio Forge spotlight leads with the before-state (uploading one track at a time) that matches the creator's experience
- The workflow change is concrete and specific (hours → minutes)
- The product CTA ("Try Audio Forge") leads to Creator Panel
- Social proof stats validate that real creators are using this

**Success indicator:** The creator clicks a CTA — either "Try Audio Forge," "Open Creator Panel," or "Start Creator Plan." If they don't click in 2 minutes, they are in deeper evaluation mode — which means they continue scrolling rather than bouncing.

**Alternative success:** The creator continues to scroll to pricing. This is evaluation behavior, not rejection behavior. Both outcomes (CTA click or continued scroll) indicate the 2-minute experience has succeeded.

---

## Section 20 — Final Experience Vision

The complete experience of the redesigned hibobstudio.com — from the moment the page loads to the moment the creator opens Creator Panel — should be described as a single, coherent feeling.

**What each section feels like, in order:**

The page loads. No splash screen. No loading animation. The hero is immediately present.

The creator sees the category in the headline before they've consciously decided to read. They haven't clicked yet. They haven't scrolled yet. But the frame has been set: this is a platform for people like them.

They scroll. The Problem section uses their own language — the specific, recognizable irritation of uploading audio one track at a time, of manually typing Roblox usernames into a whitelist, of switching between four tabs to manage one community. They feel described. Not sold to. Described.

They continue scrolling. The ecosystem diagram appears. They see eight products connected in a structure that communicates architecture — not a catalog, not a menu. They don't need to read every product name to understand that this is a system. The visual structure says it before the text does.

They slow at the Audio Forge spotlight. The before-state is familiar. The after-state is immediate. The CTA appears. They click.

Or they don't click yet. They want to see the pricing. The pricing section resolves the cost question without making cost the frame. They see access levels, not price points.

They reach the closing section. One message. One CTA. "Open Creator Panel." They click.

They arrive at the panel. It confirms what the website prepared them for: a command center for their creator operations, not a tool they need to configure. The first prompt is to connect their identity. They understand why — the website told them. They connect their Discord. They connect their Roblox account. Their identity is verified.

They are in.

---

**This website should feel like opening a professional tool that was built specifically for how you work — not like visiting a page that is trying to convince you of something.**

The experience is not impressive. It is not dazzling. It is not trying to win an award.

It is the experience of a creator discovering that someone built the infrastructure they needed before they knew they needed it, and made it immediately accessible.

That is what the redesign must deliver. Everything in this specification is in service of that.

---

*This document is the master specification for the hibobstudio.com redesign. All implementation decisions should be traceable to a principle, section, or rule in this document. When this document conflicts with a design preference not derived from positioning strategy, this document takes precedence.*

*Hibob Studio — Website Redesign Specification — 2026-05-30*
