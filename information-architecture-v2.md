# Hibob Studio — Information Architecture V2

**Version:** 1.0  
**Date:** 2026-05-30  
**Prerequisite:** positioning.md v1.0  
**Status:** Blueprint — Use Before Any Design or Development Begins

> This document translates positioning strategy into website structure. It defines what exists, where it lives, how it connects, and why. It is the blueprint that copywriting, design, and development will follow — not a design spec, not a content doc, not an implementation guide.

---

## Section 1 — Website Purpose

### What job does hibobstudio.com perform?

hibobstudio.com is the primary acquisition and category-establishment surface for Hibob Studio. It performs three jobs simultaneously:

**Job 1 — Category declaration.** The moment a visitor lands, the website must communicate that Hibob Studio is a Creator Infrastructure Platform — not a freelancer, not a commission service, not a portfolio. Every element on the page is either reinforcing or undermining this declaration.

**Job 2 — Ecosystem introduction.** hibobstudio.com is the only place where all eight products exist in one view. The website must introduce the ecosystem as a connected system, not as a product catalog. A visitor who leaves without understanding that these products work together has not been served by the website.

**Job 3 — Conversion to panel.** The terminal action of hibobstudio.com is not purchase — it is access to `panel.hibobstudio.com`. The website exists to convince creators to open the panel. Products may be discovered on hibobstudio.com, but they are used in the panel. The website must funnel qualified creators to that transition.

---

### What should visitors understand after 30 seconds?

One thing, stated clearly: **Hibob Studio is a platform built for Roblox creators, and it contains multiple tools that work together.**

Nothing else is required at 30 seconds. If a visitor at 30 seconds can say "this is some kind of platform for Roblox creators, not a freelancer" — the website has succeeded at its first job.

Failure state: Visitor at 30 seconds still thinks this is a portfolio or a commission service.

---

### What should visitors do after 2 minutes?

After 2 minutes, a visitor should have:
- Identified which product(s) are most relevant to their situation
- Understood that Creator Panel is where they access the platform
- Made a decision to continue (click to panel, explore a product page, or check pricing)

At 2 minutes, the website has either captured the visitor's intent or lost them. The homepage must provide enough signal in 2 minutes for a creator to self-select into their most relevant path.

---

### What should visitors do after 5 minutes?

After 5 minutes, a creator who is a fit for the platform should have:
- Either landed in Creator Panel (signed in or signed up)
- Or explored a specific product page deeply enough to understand the workflow change it enables
- Or decided on a Creator Plan and begun the subscription process

A creator who has spent 5 minutes on the website and not taken an action has encountered a conversion failure. The architecture must ensure that every path through the website leads to a clear next step — not a dead end.

---

## Section 2 — Site Map

The sitemap is designed around three principles from positioning.md:
1. Platform identity must be immediately apparent
2. Products must be discoverable but always referenced back to the ecosystem
3. Creator Panel (`panel.hibobstudio.com`) is the true destination — the website is the on-ramp

```
hibobstudio.com
│
├── / (Homepage)
│   ├── Hero — Platform declaration
│   ├── Problem — Why creators need this
│   ├── Ecosystem — All products, connected view
│   ├── Product Spotlight — Featured product deep-dive
│   ├── Creator Identity — Foundation section
│   ├── Social Proof — Stats + testimonials
│   ├── Creator Plans — Pricing overview
│   └── CTA — Get started / Open panel
│
├── /products (Product Catalog)
│   ├── Overview — All products grid, ecosystem map
│   ├── /products/creator-panel
│   ├── /products/audio-forge
│   ├── /products/asset-manager
│   ├── /products/license-manager
│   └── /products/donation-platform
│
├── /plans (Creator Plans)
│   ├── Plan comparison table
│   ├── Feature matrix
│   └── FAQ
│
├── /docs (Resources & API)
│   ├── Getting Started
│   ├── API Reference
│   ├── Product Guides
│   │   ├── Audio Forge Guide
│   │   ├── License Manager Guide
│   │   └── Donation Platform Guide
│   └── Integrations
│       ├── Discord Integration
│       └── Roblox Integration
│
├── /about (Company)
│   ├── What is Hibob Studio
│   ├── Mission & Vision
│   └── Contact
│
└── /changelog (Product Updates)
    └── Version history, new features, roadmap hints

External destination: panel.hibobstudio.com
```

### Sitemap design decisions explained:

**Why /products as a dedicated section:**
The homepage shows the ecosystem overview. Individual product pages carry the depth — workflow explanation, use cases, feature lists. A creator who comes directly looking for "audio Roblox tool" should land on `/products/audio-forge`, not the homepage.

**Why /plans is a top-level page:**
Pricing is a decision page. It should be reachable directly from navigation without requiring a journey through the homepage. Creators who know they want Hibob Studio and just need to understand tiers should not have to scroll an entire homepage to find pricing.

**Why /docs is included:**
The API Infrastructure and technical credibility of the platform are strategic moats (positioning.md §15). Docs are also a trust signal — a platform with documentation feels more serious than a platform without. /docs also serves the Future Audience (developers building on the API).

**Why /changelog:**
Creator Infrastructure Platforms ship product updates. Showing that the platform is actively maintained is a trust signal. A changelog signals "this is a living product, not a side project."

**What is not in the sitemap:**
- No `/services` — this is not a service business
- No `/projects` — portfolio content belongs in About, not in primary navigation
- No `/commission` — this model has been retired
- No `/blog` — this is a V2 architecture; content marketing is phase 3 growth

---

## Section 3 — Navigation Architecture

### Primary Navigation

The primary navigation is the persistent header — visible on every page of the website.

```
[Hibob Studio Logo]   Products   Plans   Docs   About   [Open Panel →]
```

| Item | Why it exists | Business goal | User goal |
|------|--------------|---------------|-----------|
| **Logo** | Brand anchor, always returns to homepage | Reinforce "Hibob Studio" as company brand (not personal) | Go back to start |
| **Products** | Entry to ecosystem product catalog | Drive product discovery; show depth of platform | Find the specific tool I need |
| **Plans** | Direct path to pricing/subscription | Convert browsing to subscription intent | Understand what each plan includes and costs |
| **Docs** | Credibility signal + developer entry point | Establish platform seriousness; capture technical creators | Learn how to use the product, access API |
| **About** | Company context | Establish trust; communicate mission | Understand who built this and why |
| **Open Panel →** | Primary conversion CTA | Drive traffic to `panel.hibobstudio.com` | Access my creator workspace |

**Notes on "Open Panel →":**
This is not a standard nav link — it is a CTA-styled button at the far right of the navigation, visually distinct from the text links. It performs the primary conversion action of the entire website. It should remain in fixed position on scroll. On mobile it should appear as the primary action in the mobile menu, above all other links.

**What is NOT in primary navigation:**
- No "Services" — retired
- No "Projects" — not relevant to platform positioning
- No "Hire Me" — retired
- No "Contact" — available in footer and About; not a primary navigation concern

---

### Secondary Navigation

Secondary navigation refers to utility elements in the header or subnavigation within sections.

```
[Language Toggle: ID | EN]   [Status: All systems operational]
```

| Item | Why it exists | Business goal | User goal |
|------|--------------|---------------|-----------|
| **Language Toggle (ID/EN)** | Audience is primarily Indonesian-speaking; bilingual already exists in codebase | Reduce friction for Indonesian creators; signal local market commitment | Read in preferred language |
| **System Status** | Transparency signal for a platform | Establish operational credibility; reduce support load | Know if platform is working before I try to use it |

**When to add Sign In / Sign Up to navigation:**
Once Creator Panel has a proper authentication system, a "Sign In" link should be added to the right side of the header, adjacent to or replacing "Open Panel →". Until then, "Open Panel →" serves as the combined destination.

---

### Footer Navigation

The footer serves two purposes: navigation for visitors who scrolled to the bottom without converting, and trust/credibility signals for the platform.

```
Footer structure:

[Hibob Studio Logo]                              © 2026 Hibob Studio
Infrastructure for serious Roblox creators.

Products          Resources         Company           Community
─────────         ─────────         ───────           ─────────
Creator Panel     Docs              About             Discord
Audio Forge       API Reference     Changelog         Roblox Group
Asset Manager     Getting Started   Contact
License Manager   Integrations
Donation Platform

Legal: Privacy Policy · Terms of Service
```

| Section | Why it exists | Business goal | User goal |
|---------|--------------|---------------|-----------|
| **Products** | Secondary product discovery | Capture visitors who reached footer without finding their product | Find a specific product without returning to top |
| **Resources** | Docs/API as conversion path | Convert technical creators who need docs before committing | Access documentation or integration guides |
| **Company** | Trust and transparency | Establish legitimacy; provide contact path | Understand who runs this and how to reach them |
| **Community** | Social proof and retention | Keep creators connected after conversion | Join the creator community, stay updated |
| **Legal** | Compliance and trust | Required for any platform handling payments | Understand data and terms policies |

**Footer brand statement:**
The footer reinforces brand positioning in one line: "Infrastructure for serious Roblox creators." This is the company-level message from positioning.md §11. It should appear below the logo as a consistent reminder — every page, every footer.

---

## Section 4 — Homepage Architecture

The homepage sections are ordered to follow a specific cognitive journey: from confusion (who is Hibob Studio?) to clarity (what problem does it solve?) to desire (these products solve my problems) to action (I want to start).

Sections are ordered exactly as they should appear on the page.

---

### SECTION 1: HERO
**Objective:** Declare the category. Answer "What is Hibob Studio?" in under 3 seconds.  
**Key message:** Hibob Studio is a Creator Infrastructure Platform for serious Roblox creators.  
**CTA:** Primary: "Explore Products" / Secondary: "Open Creator Panel"  
**Priority:** Critical — this section cannot be compromised.  

---

### SECTION 2: PROBLEM STATEMENT
**Objective:** Make the creator feel understood before presenting any solution.  
**Key message:** Serious Roblox creators are losing hours every week to manual, disconnected workflows that have nothing to do with actual creative work.  
**CTA:** None — this section asks for no action. It creates desire by establishing the cost of the current situation.  
**Priority:** High — without this section, the product ecosystem has no context.  

Design note: This section should not feel like a product pitch. It should feel like someone who has lived the same experience putting words to a problem the creator already feels. The goal is recognition, not persuasion.

---

### SECTION 3: ECOSYSTEM OVERVIEW
**Objective:** Introduce all eight products as a connected system, not a menu.  
**Key message:** One platform. Eight interconnected tools. Built to work together.  
**CTA:** "See all products →" leading to /products  
**Priority:** High — this is the section that makes Hibob Studio feel like a platform company.  

This section must visually convey connection and hierarchy, not just list products. The relationship between Creator Identity (backbone), Creator Panel (hub), and the product layers must be communicated structurally. See Section 6 for detailed narrative flow.

---

### SECTION 4: PRODUCT SPOTLIGHT
**Objective:** Go deep on one or two flagship products to demonstrate concrete workflow improvement.  
**Key message:** Here is exactly what changes in your workflow when you use [Product X].  
**CTA:** "Try [Product]" or "Learn more" linking to individual product page  
**Priority:** High — abstract ecosystem claims need to be grounded in concrete product behavior.  

Recommended spotlight products for V2: Audio Forge (solves the most universal pain point — every Roblox game uses audio) and License Manager (solves the most financially painful problem for developers who sell products). These two represent the Content Layer and Monetization Layer respectively.

---

### SECTION 5: CREATOR IDENTITY
**Objective:** Introduce Creator Identity as the backbone of the entire ecosystem.  
**Key message:** Everything in Hibob Studio is built on top of your verified creator identity — one account that connects Discord and Roblox.  
**CTA:** "Connect your identity" → leading to Creator Panel onboarding  
**Priority:** Medium-High — this section sets up the concept of Creator Identity being the prerequisite for full platform access.  

This section is not about Creator Identity as a standalone product. It is about why identity matters: all other products work better — and some only work at all — because of the unified identity layer. This is the architectural explanation that makes the ecosystem feel like a system, not a collection.

---

### SECTION 6: SOCIAL PROOF
**Objective:** Validate the platform with evidence from real creators.  
**Key message:** Creators are already using this — and it works.  
**CTA:** None primary — social proof sections should not compete with product CTAs.  
**Priority:** Medium — required for credibility, but only effective after the product has been understood.  

See Section 9 for full Trust Architecture ranking and design.

---

### SECTION 7: CREATOR PLANS
**Objective:** Present pricing in a way that feels like access to a platform, not a commission price list.  
**Key message:** Choose the plan that matches where you are as a creator.  
**CTA:** "Start Free" (if free tier exists) or "Choose Plan" per tier  
**Priority:** Medium — conversion from browse to commitment happens here.  

See Section 10 for full Pricing Architecture.

---

### SECTION 8: CLOSING CTA
**Objective:** Give visitors who reached the bottom of the page one clear action.  
**Key message:** Everything you need to run your Roblox presence professionally is ready.  
**CTA:** Primary: "Open Creator Panel" / Secondary: "Explore Products"  
**Priority:** High — this is the last chance to convert a visitor who scrolled through the entire page.  

Design note: This section should feel like a resolved conclusion, not desperation. The tone should be confident: "You've seen what we do. Here's where to start."

---

## Section 5 — Hero Architecture

The hero is the most critical piece of real estate on the entire website. Every decision here has outsized impact on whether the positioning transition succeeds or fails.

### Headline Strategy

The headline performs one job: declare the category and the audience in a single, scannable phrase.

**Structure:** [What we are] + [Who we are for] / [What changes for you]

The headline must not begin with "I" or "We" in first-person personal form. The headline is about what the platform does, not about who built it.

**Two-level headline approach:**
- **Level 1 (eyebrow / badge above headline):** Category label — short, declarative. Examples: "Creator Infrastructure Platform" or "Built for Roblox Creators"
- **Level 2 (primary H1):** Value statement — what the platform enables. This is what gets read first.

The headline must be answerable to the question: "If a creator reads only this line and nothing else, do they understand what category this company is in?" If yes, the headline is working.

**What the headline must NOT do:**
- Reference the founder by name
- Begin with "Hi, I'm..."
- Use the word "commission"
- Describe services being sold
- Make claims that require context to understand (e.g., "The future of Roblox" without explanation)

---

### Supporting Copy Strategy

Supporting copy (the paragraph below the headline) performs the "bridge" function: connecting the category claim to a concrete problem the creator already feels.

**Structure:** [Acknowledge the wasted time/friction] → [State the solution] → [Invite action]

Length: 2-3 sentences maximum. This is not an explanation — it is a resonance check. The creator should read this and think "they know exactly what I'm dealing with."

Supporting copy should reference the specific types of work creators currently do manually (audio publishing, whitelist management, asset organization) — not abstract claims about "efficiency" or "professional workflows."

---

### CTA Strategy

The hero CTA architecture is a two-CTA system:

**Primary CTA:** The action that begins the platform journey. This should lead directly to Creator Panel or to the first step of onboarding.

**Secondary CTA:** For visitors who want to understand before committing. This leads to either the Products section (anchor scroll) or to /products.

**CTA hierarchy principles:**
- Primary CTA must be visually dominant — color, weight, position
- Secondary CTA must be present but clearly subordinate — outline, muted, smaller
- No third CTA in the hero — adding a third CTA creates decision paralysis
- Both CTAs must imply forward momentum — no "Learn more" without a destination modifier (e.g., "See how it works")

**What the primary CTA must NOT say:**
- "Hire Me"
- "Contact Us"
- "Get a Quote"
- "Start a Project"

---

### Trust Strategy

The hero needs micro-trust signals — elements that give a first-time visitor reason to continue without requiring them to scroll past the fold.

**Ranked trust elements for the hero (choose 2-3):**

1. **Platform statistics** — quantified evidence ("X active creators", "Y products deployed") positioned near the CTA
2. **Ecosystem badge** — visual representation that this is a multi-product platform, not a single tool
3. **Integration logos** — Discord and Roblox logos as recognizable trust anchors for the audience
4. **Creator Panel preview** — a screenshot or mockup of the panel reinforces "this is real, this exists"

**What to avoid in hero trust signals:**
- Generic star ratings without context
- Client count that references commission clients (this contradicts the new positioning)
- Testimonials in the hero — too much cognitive load at first glance

---

## Section 6 — Platform Section

### Purpose

The Platform section (Ecosystem Overview, Section 3 of homepage) is where Hibob Studio makes its most important structural argument: **these products are not independent tools — they are components of a single system.**

This distinction is critical to the positioning. A "tool collection" communicates commodity. A "connected ecosystem" communicates infrastructure.

---

### Narrative Flow

The section must be experienced as a story in four beats:

**Beat 1 — The fragmented status quo**
Open with a brief, resonant description of what managing a serious Roblox presence currently looks like: multiple tabs, manual verification, scattered assets, audio uploaded one by one. This is one sentence or a short visual representation — not a lecture.

**Beat 2 — The platform as the answer**
Transition: "Hibob Studio is one connected ecosystem that replaces all of that." This is the moment where the ecosystem is introduced as a whole, before any individual product is named.

**Beat 3 — The ecosystem architecture**
Present all eight products in a visual structure that communicates their relationships:
- Creator Panel at the center (Hub)
- Creator Identity as the foundation layer
- Content Layer (Audio Forge, Asset Manager)
- Monetization Layer (License Manager, Donation Platform, Creator Plans)
- Developer Layer (API)

The visual must communicate hierarchy and connection, not just adjacency. A grid of eight equal-sized icons does not communicate an ecosystem. A layered diagram with Creator Identity at the base and Creator Panel at the center does.

**Beat 4 — The invitation**
End with a single directional action: "All of this is accessible from your Creator Panel." The section closes by pointing back to the terminal action of the website.

---

### Products in the Ecosystem Section

Individual products in the ecosystem overview should be represented at summary level only:
- Product name
- One-line description (functional, not marketing)
- Status badge: "Available" / "Coming Soon"

Do not show feature lists in the ecosystem section. Feature lists belong on individual product pages. In the ecosystem section, creators need to understand scope and relationship — not features.

---

## Section 7 — Products Architecture

### Creator Panel

**Positioning:** Not a product — the entry point to the platform.  
**Value:** Eliminates tab fragmentation. Gives creators a single view of their entire operational status.  
**Relationship to ecosystem:** Creator Panel is the UI layer that makes all other products accessible and coherent. It is where products become a platform.

Every product page on hibobstudio.com should end with a path to Creator Panel — not to a product-specific checkout or standalone installation. The purchase funnel for any product passes through the panel.

Individual product page structure:
1. Problem headline (what the creator currently suffers without this product)
2. What changes (how the workflow looks after using this product)
3. Key capabilities (3-5, not exhaustive)
4. How it connects to the ecosystem (what other products it works with)
5. Status (Available / Coming Soon) + CTA to access via Creator Panel

---

### Audio Forge

**Positioning:** The content layer tool that solves the most universal creator pain point.  
**Value:** Transforms multi-hour audio publishing processes into minutes. Replaces manual, one-by-one upload with a managed pipeline.  
**Relationship to ecosystem:** Content Layer. Output (published audio asset IDs) can be referenced by other products. Works within Creator Panel. Relies on Creator Identity for account-level publishing permissions.

**Audience fit:** Primary Audience — builders who run music-heavy games or club maps. Any creator who deals with audio volume will feel this product's value immediately.

**Conversion trigger:** The moment a creator understands what "batching" audio publishing means — that they can upload a full playlist in one session instead of individual tracks across multiple Roblox uploads — the value proposition becomes self-evident.

---

### Donation Platform

**Positioning:** The monetization layer tool for community-facing creators — specifically club owners and community managers.  
**Value:** Replaces Sociabuzz/Saweria with a donation experience that is native to the Roblox creator context: donor identity is verified, rewards can be automated, and the entire system is connected to Creator Identity.  
**Relationship to ecosystem:** Monetization Layer. Deeply dependent on Creator Identity — donor verification only works if the platform knows who the donor is in both Discord and Roblox. In-game reward integration is the key differentiator versus generic donation platforms.

**Audience fit:** Secondary Audience — club owners and community managers who currently accept donations through platforms that have no connection to their game.

**Conversion trigger:** Understanding that Donation Platform can automatically give a donor a reward inside a game the moment a donation is confirmed — without any manual action from the club owner.

---

### Asset Manager

**Positioning:** The content layer tool for creators who manage significant asset libraries.  
**Value:** Replaces the combination of Google Drive + Roblox toolbox + local storage with a single, versioned, searchable asset repository that connects directly to Roblox.  
**Relationship to ecosystem:** Content Layer. Assets managed here can be referenced or deployed by other tools. Works within Creator Panel.

**Audience fit:** Primary Audience — serious builders who have accumulated assets across multiple projects and currently lose time re-finding, re-uploading, or re-using assets.

**Conversion trigger:** The recognition that "all my assets are in five different places right now" is a solved problem with Asset Manager.

---

### License Manager

**Positioning:** The monetization layer tool for developers who create and sell products.  
**Value:** Transforms product distribution from a manual whitelist process into an automated pipeline. Buyer pays → license is issued → access is granted. No manual step.  
**Relationship to ecosystem:** Monetization Layer. Requires Creator Identity to verify buyer identity. Connected to Creator Plans to tier product access. License data visible in Creator Panel.

**Audience fit:** Primary Audience — developers who sell scripts, systems, or modules to other creators and currently manage buyers manually.

**Conversion trigger:** Understanding that the current process (receive payment → verify identity → add to whitelist manually → confirm → follow up) becomes: (payment received → access granted automatically).

---

## Section 8 — Conversion Architecture

The conversion architecture maps the full visitor journey from first contact to committed platform user. Each stage has specific needs, specific obstacles, and specific transitions.

---

### Stage 1: Cold Visitor

**Who they are:** A creator who arrived via Discord link, search, word of mouth, or social media. They have no prior knowledge of Hibob Studio. Their first question is "what is this?"

**What they need:**
- Category clarity within 3 seconds (hero does this job)
- Recognition that this is relevant to them (Problem section does this job)
- Enough scope to understand the platform is serious (Ecosystem section does this job)

**Obstacle at this stage:** If the website still looks like a freelancer portfolio, cold visitors will leave before the problem section. The hero is the only thing standing between a cold visitor and a bounce.

**Transition trigger:** Cold visitor becomes Interested Visitor when they recognize at least one of their problems in the website's framing.

---

### Stage 2: Interested Visitor

**Who they are:** A creator who has recognized that Hibob Studio addresses something they currently struggle with. They are now in product discovery mode — trying to understand which specific product is most relevant to them.

**What they need:**
- Clear product differentiation (individual product pages or product spotlights)
- Enough detail to understand the workflow change, not just the feature list
- Social proof that other creators have used this successfully
- Understanding of what getting started requires

**Obstacle at this stage:** Generic product descriptions that don't map to concrete workflow changes. If the creator can't visualize what changes in their daily process, they remain interested but don't advance.

**Transition trigger:** Interested Visitor becomes Creator when they decide to try Creator Panel or explore the product actively.

---

### Stage 3: Creator

**Who they are:** A creator who has arrived at Creator Panel — they are in the onboarding process. They may or may not have completed Creator Identity setup.

**What they need:**
- Clear onboarding path (Creator Identity first, then products)
- Quick time-to-value — they should be able to experience one product's value within the first session
- Enough explanation of the ecosystem to understand why Creator Identity is the required first step

**Obstacle at this stage:** Confusing onboarding that doesn't explain the dependency structure (Creator Identity is required before most products work fully). If the creator can't get a product working in the first session, they may not return.

**Transition trigger:** Creator becomes Customer when they make their first subscription or product purchase decision.

---

### Stage 4: Customer

**Who they are:** A creator who has made a financial commitment — either subscribed to a Creator Plan or purchased a product.

**What they need:**
- Confidence that the purchase decision was correct (immediate product functionality)
- Visibility into the rest of the ecosystem from within the panel
- Pathways to discover and adopt additional products

**Obstacle at this stage:** Buyer's remorse if the purchased product doesn't deliver on the website's promise in the first week. First-use experience is critical.

**Transition trigger:** Customer becomes Platform User when they have integrated at least one product into their regular workflow — using it weekly or more frequently.

---

### Stage 5: Platform User

**Who they are:** A creator who uses Hibob Studio products as part of their regular creative workflow. They don't think of themselves as "using Hibob Studio" — they think of themselves as using Audio Forge, or managing their panel. The platform has become invisible infrastructure.

**What they need:**
- Reliability (uptime, product stability)
- Continued improvement (changelog, new features)
- Community (other creators using the same platform)
- Pathways to adopt additional products as their needs grow

**Retention mechanisms:**
- Creator Panel as daily driver (habit formation)
- Changelog showing active development
- Community (Discord) showing other creators using the platform
- Cross-product discovery through the panel's sidebar visibility

**The platform user is the strategic goal.** A Platform User has high switching cost (positioning.md §15), provides word of mouth, and represents the compounding unit of Hibob Studio's long-term growth.

---

## Section 9 — Trust Architecture

Trust is not built by any single element — it is accumulated across the visitor's journey through multiple reinforcing signals. Below is the complete trust inventory, ranked by impact on a first-time visitor's willingness to proceed.

### Ranked Trust Elements

**1. Working products (Highest impact)**
The single strongest trust signal is a product that demonstrably exists and functions. A creator who can access Creator Panel, connect their identity, and use one product in their first session trusts Hibob Studio more than any testimonial or statistic can convey. Product availability — and its visibility on the website — is trust signal #1.

Implication: For products not yet launched (Coming Soon), showing a preview, a demo, or a waitlist still carries trust weight. Absence carries negative weight.

**2. Platform statistics**
Quantified evidence of adoption: number of active creators, number of licenses issued, audio tracks published, etc. These numbers must be real — fabricated or rounded statistics from a platform early in growth can backfire if scrutinized.

Early-stage strategy: Emphasize quality over quantity. "30+ creators in active daily use" is more credible than a vague "thousands of users." As numbers grow, update them.

**3. Creator Identity as community signal**
When a visitor sees that Creator Identity connects Discord + Roblox in a verified way, and that there is a visible creator community using this system, it signals that the platform has real adoption. The Discord server and Roblox group are trust anchors — they exist, they are active, they are real.

**4. Product testimonials from identifiable creators**
Testimonials from real creators with verifiable Roblox or Discord presence are significantly more valuable than anonymous testimonials. Even one testimonial from a creator with a recognizable name in the Roblox community is worth more than ten anonymous cards.

Current state: The three existing testimonials are commission-focused. They should be supplemented (not replaced) with product-specific testimonials from creators who have used the actual products.

**5. Integration visibility**
Showing logos of integrated systems (Discord, Roblox, Parcel) signals that Hibob Studio operates within a known ecosystem rather than in isolation. These are recognizable trust anchors for the primary audience.

**6. Project history (supporting role only)**
The portfolio of 9 Roblox games built under the previous model is a legitimate credibility signal — it demonstrates that the people behind Hibob Studio have real experience building serious Roblox projects. However, this content must be reframed: it is evidence of creator experience, not a freelancer portfolio. It belongs in the About section, not in primary navigation.

**7. Changelog / active development signal**
A visible changelog that shows recent activity communicates that the platform is being actively maintained. For a creator deciding whether to commit to a platform, evidence of continued development reduces risk.

**8. Transparent pricing**
Publishing clear pricing without requiring contact or negotiation signals confidence in the product's value. The shift from "Everything is negotiable" (commission model) to published Creator Plans is itself a trust signal — it communicates maturity.

---

## Section 10 — Pricing Architecture

### Where pricing appears

Pricing appears in three contexts, each serving a different function:

**1. Creator Plans page (/plans)**
The primary pricing destination. Full plan comparison table with feature matrix. This is where creators come specifically to make a subscription decision. Design must support comparison, not persuade into a specific tier.

**2. Homepage Creator Plans section (Section 7)**
A summary representation of plans — not the full table, but enough to communicate tiers and the entry price point. This section exists to show that the platform is affordable and accessible before asking for a panel commitment. Resolves "how much does this cost?" without requiring a navigation click.

**3. Individual product pages**
Product-level pricing context — either "Included in Creator Plans" or specific product purchase pricing for one-time products. This is contextual pricing — it answers "does this product cost extra?" not "how much does a plan cost?"

---

### When pricing appears

**Too early:** Showing pricing before the creator understands the product value leads to sticker shock without context. Pricing before the Problem section or Ecosystem section is premature.

**Right moment:** Pricing appears after the creator has understood (a) what problem the platform solves, (b) what products are available, and (c) what changes in their workflow. At this point, the creator is asking "can I afford this?" — and the pricing section answers that question.

**Homepage timing:** Pricing is Section 7 of 8 on the homepage — late in the journey, after value has been established.

**Reachable at any time:** Despite its position in the homepage narrative, pricing must also be reachable via direct navigation (Plans in the primary nav). Creators who already know they want the platform should not have to scroll through the homepage to find pricing.

---

### How pricing supports conversion

**Pricing must signal access, not cost.**
The current commission pricing model signals "this costs money to hire someone." Creator Plans pricing must signal "this is a subscription to access professional infrastructure" — the frame is access, not cost.

**Tier naming must reflect creator journey:**
Tier names should map to creator progression — a creator who is starting out, a creator who is serious/active, a creator running a studio. Names like "Starter / Creator / Studio" are more resonant than "Basic / Pro / Enterprise" for this audience.

**Free entry point reduces friction:**
If a free tier or free trial exists, it must be the most prominent entry point in the pricing section. The creator's first barrier to the platform should be their willingness to try it, not their willingness to pay. Monetization happens after they experience value.

**The pricing section must answer:**
- What does each tier include?
- Which tier is right for me?
- What happens if I upgrade later?
- Are there products not included in any plan (one-time purchases)?

---

## Section 11 — Panel Integration

### Relationship between hibobstudio.com and panel.hibobstudio.com

These two domains have different jobs that must be clearly defined:

| | hibobstudio.com | panel.hibobstudio.com |
|---|---|---|
| **Job** | Acquisition & category education | Product usage & daily operations |
| **Audience** | Cold visitors, curious creators, potential users | Active users, paying customers |
| **Primary action** | Transition to panel | Use the platform |
| **Content type** | Marketing, positioning, ecosystem overview | Functional product interface |
| **Success metric** | Visitors who click "Open Panel" | Sessions per week per creator |

The relationship is one-directional from a first-visit perspective: hibobstudio.com → panel.hibobstudio.com. But for returning users, the panel is the primary destination — they rarely need to return to the marketing site.

---

### When users should transition

The transition from website to panel should happen:

**Primary trigger:** When a creator has decided to try the platform — they click "Open Panel" or "Get Started." This is the conversion event.

**Secondary trigger:** When a creator clicks a product CTA from a product page — "Start using Audio Forge" should lead to the panel's Audio Forge section, not a standalone install or standalone checkout.

**Never:** The website should not keep creators on the marketing site when they are ready to use the product. Any path that delays the panel transition (extra information pages, long form fills before access, etc.) is conversion friction.

---

### How users should transition

**The experience of transition must feel like entry, not departure.**

When a creator clicks "Open Creator Panel" from hibobstudio.com, they should arrive at a Creator Panel that:
- Immediately presents Creator Identity setup if not yet connected
- Shows the full ecosystem in the sidebar (all products, even Coming Soon ones)
- Clearly directs toward the first product to use

The website should set expectations before the transition:
- The panel requires Creator Identity setup to unlock full functionality
- The first step is connecting Discord + Roblox identity
- After that, all products become accessible

Setting this expectation on the website reduces confusion inside the panel. A creator who arrives in the panel knowing "I need to connect my identity first" will not be confused by the onboarding flow.

---

### What expectation should be set

Before the panel transition (on the website), creators should understand:

1. **What they will find:** A dashboard showing their creator status, connected products, and operational overview — not just a login page.
2. **What the first step is:** Connect your Discord + Roblox identity via Creator Identity.
3. **What comes after:** Access to all platform products through a unified interface.

The website's job is to make the panel feel familiar before the creator arrives — so the first panel session confirms expectations rather than surprises them.

---

## Section 12 — Content Hierarchy

Content hierarchy defines the order of information that should be communicated to move a visitor toward conversion. This is not section order — it is information priority.

### Information that must come first

**1. Category:** "What kind of thing is this?"
Every other piece of information is irrelevant if the visitor has misidentified what Hibob Studio is. If they think it's a freelancer service, all product information is received through that incorrect frame.

**2. Audience relevance:** "Is this for me?"
A creator who builds serious Roblox games must immediately recognize that this platform is designed for their situation. If they feel like the platform is built for someone else, they will not engage further.

**3. Problem recognition:** "Do they understand my situation?"
The moment a creator reads something that articulates a specific frustration they have felt — uploading audio one by one, manually whitelisting buyers — they shift from "evaluating a product" to "reading about my own experience." This is the trust-building moment.

---

### Information that comes second

**4. Platform scope:** "How complete is this solution?"
After the creator recognizes the problem, they need to understand the full scope of what's being offered. Showing all eight products in connected hierarchy communicates "this is comprehensive" — which is important for justifying platform adoption over point solutions.

**5. Product specificity:** "Which of these is most immediately useful to me?"
After seeing the full ecosystem, the creator narrows to the one or two products that address their most acute pain. Product Spotlight and individual product pages serve this function.

**6. Social proof:** "Have other creators validated this?"
Evidence that the platform works — real creators, real results, verifiable identity — reduces the risk perception of adoption.

---

### Information that comes third

**7. Pricing:** "Can I afford this?"
Pricing is not the creator's first question. Their first question is "does this solve my problem?" Pricing comes after the value is understood.

**8. Onboarding path:** "How do I start?"
Once the creator has decided to try the platform, they need a clear, low-friction path to first use. This is the Creator Panel CTA, the Creator Identity setup flow, and the first product experience.

**9. Community:** "Am I joining something bigger?"
The Discord community, the Roblox group, and the visible creator identity system communicate that Hibob Studio has an active ecosystem — not just a product suite. This is the final retention seed.

---

## Section 13 — Remove / Keep / Revise

Audit of current website content against V2 information architecture requirements. Based on positioning.md §18 findings.

### KEEP

| Element | Location | Reasoning |
|---------|----------|-----------|
| Dark purple visual design system | Entire site | Consistent with platform aesthetic. Visually differentiated from generic SaaS. No change needed. |
| Stats bar (30+ Clients, 2+ Years, 100% Satisfied) | Hero | Credibility signal. Reframe copy from "clients served" to platform-appropriate language as real product stats grow. Keep the format. |
| Scroll reveal animations | Entire site | UI polish. No impact on positioning. Keep as is. |
| Bilingual support (ID/EN toggle) | Entire site | Core to primary audience (Indonesian creators). Must remain. |
| Product cards for Hibob Club Kit, Music System, Visual System | Products section | These are real, purchasable products. Keep but reposition within the new product catalog architecture — they are products within the ecosystem, not the entirety of the catalog. |
| Checkout system (multi-payment: Bank, E-Wallet, QRIS, Robux) | CheckoutPage | Functional and locally relevant. Keep, potentially enhance to reflect Creator Plans subscription model. |
| Parcel integration for whitelist | Backend/checkout | Real infrastructure. Keep as the mechanism behind License Manager functionality. |
| Footer social links (Discord, Email) | Footer | Keep Discord and Email. Replace Roblox Profile link with Roblox Community/Group link. |

---

### REVISE

| Element | Location | Current State | Required Change | Reasoning |
|---------|----------|---------------|----------------|-----------|
| Brand name display | Header, Footer | "HibobTheDev" | "Hibob Studio" | Personal brand vs. company brand. Core to positioning transition. |
| Hero H1 headline | Hero | "Hi, I'm HibobTheDev. I Build Roblox Experiences." | Platform-category headline | First impression sets the entire frame. This is the highest-priority change. |
| Hero badge | Hero | "Full-Stack Roblox Developer" | Platform category label | Job title vs. platform category. Cannot coexist with new positioning. |
| Hero CTA (primary) | Hero | "Hire Me" | "Explore Products" or "Open Creator Panel" | Commission CTA vs. platform onboarding CTA. |
| Hero CTA (sticky header) | Header | "Hire Me" | "Open Panel" | Same issue — visible on every page in every scroll state. |
| Hero subheadline | Hero | "2 years developing... mid-range price, premium results." | Platform value proposition | Current copy describes the developer, not the platform. |
| About / Why Me section | About (#about) | "Why Me?" / "Kenapa Gua?" — personal differentiators | Platform value propositions | Entire frame is wrong. The section concept can remain (explain why this platform) but every line of content needs replacement. |
| Services section framing | Services (#services) | "What I Can Build" — commission menu | If retained: "What You Can Build With" | If this section is kept (see Remove section), it must reframe from "services for hire" to "capabilities the platform enables." |
| Products section | Products (#products) | 3 standalone products | Ecosystem catalog of 8 products + ecosystem map | Expand, don't just reframe. The section concept is correct; the scope is wrong. |
| Pricing section | Pricing (#pricing) | "Commission Pricing" — 3 commission tiers | "Creator Plans" — subscription tiers | Commission model vs. platform subscription. Every element of this section changes. |
| Pricing copy | Pricing (#pricing) | "Everything is negotiable. Robux payment also available." | Plan-specific feature access explanation | Negotiability signals freelancer. Fixed plans signal platform. |
| Contact section | Contact (#contact) | "Open for Commission" — "Have a Project?" | Platform onboarding CTA | The entire frame is wrong. Section concept stays (closing CTA), all content changes. |
| Testimonials | Testimonials (#testimonials) | Commission client testimonials | Product user testimonials (supplement, not replace) | Testimonials about commission work reinforce old positioning. Add product user testimonials alongside. |
| Footer copyright | Footer | "© 2026 HibobTheDev" | "© 2026 Hibob Studio" | Personal vs. company. |
| Footer links | Footer | Discord / Roblox Profile / Email | Product links + Company links + Community | Portfolio footer vs. platform footer. |

---

### REMOVE

| Element | Location | Reasoning |
|---------|----------|-----------|
| Projects section (#projects) | Homepage | 9 Roblox game cards with "Play Now" CTAs. This is a freelancer portfolio section. Has no place in platform homepage. Move project context (if desired for credibility) to About page as background, not primary homepage real estate. |
| Services section (#services) | Homepage | "What I Can Build" — World Building, Luau Scripting, GUI Design. These are commission services. The platform does not sell these. If evidence of technical capability is needed, it belongs in About, not in primary navigation or homepage sections. |
| "Hire Me" from all instances | Header, Hero, Mobile Menu | Every occurrence of "Hire Me" actively contradicts the platform positioning. Remove from header, hero, mobile menu. Zero occurrences in V2. |
| "Open for Commission" label | Contact section | The label itself is the problem. Remove. The CTA section concept stays, but this specific label must not appear. |
| Commission pricing tiers | Pricing section | GUI Design / Scripting / Building / Full Game Dev as commission tiers. Remove. Replace with Creator Plan subscription tiers. |
| "Everything is negotiable" | Pricing section | Signals freelancer flexibility. Platform pricing is not negotiable — plans are defined. Remove. |
| Roblox developer profile link (as primary nav) | Footer/Hero | The personal Roblox profile of the developer is not a platform link. If a Roblox Group link exists for the community, replace with that. If not, remove. |

---

## Section 14 — Future Expansion

The V2 architecture must accommodate growth without requiring structural rebuilding. The products currently in scope (8 products) are the foundation. Future products and categories will expand on this foundation.

### Architecture principles for future-proofing

**1. The ecosystem model scales indefinitely.**
The hierarchy structure (Hub → Identity Layer → Content Layer → Monetization Layer → Developer Layer) can absorb new products without breaking. A new product joins an existing layer or creates a new layer. The visual representation of the ecosystem on the website is designed to add nodes, not be rebuilt.

**2. The panel is the future expansion surface.**
New products do not require new website architecture to launch — they appear in the Creator Panel and get a product page under /products. The homepage ecosystem section and the /products catalog are the two surfaces that need updating. The navigation, the hero, and the pricing architecture remain stable.

**3. The category claim can absorb expansion.**
"Creator Infrastructure Platform" is broad enough to encompass any tool that helps creators operate more professionally. This category label does not need revision as products are added.

---

### Future product scenarios and architectural fit

**Marketplace**
A marketplace where creators sell and buy products (systems, assets, tools) is a natural extension of the License Manager and Asset Manager. Architecturally, it becomes a new section within /products or a top-level destination (/marketplace). Creator Identity handles seller/buyer verification. Creator Plans handle seller tiers or marketplace fees.

Navigation impact: Add "Marketplace" to primary navigation, either standalone or nested under Products.

**Analytics**
Usage analytics for creator products — how many times a product was accessed, how many active buyers, revenue over time — fits within Creator Panel as a dashboard feature, not a separate product. Could be a tier-gated feature of Creator Plans.

Navigation impact: None — analytics is a panel feature, not a website section.

**Team Workspace**
Multi-user access, permission management, collaborative panel — this is the Future Audience scenario (small Roblox game studios). Architecturally it becomes a tier in Creator Plans (Studio tier) and a feature set within the panel.

Navigation impact: Plans page gets a "Studio" tier column. No new navigation items.

**API Products**
Third-party products built on the Hibob Studio API. This is the developer ecosystem expansion. Architecturally it fits within /docs (API documentation, developer guides) and potentially a /marketplace-like destination for community-built integrations.

Navigation impact: Docs section expands to include community integrations directory.

---

### What the architecture must never do as it scales

- Add so many navigation items that the primary nav becomes a megamenu on the first version
- Create separate brand identities for new products that compete with the Hibob Studio master brand
- Add new homepage sections for every new product — the homepage ecosystem section is designed to represent all products in one view
- Create pricing complexity that requires multiple pricing pages or comparison between product-specific pricing and plan pricing without a clear resolution

---

## Section 15 — Final Recommendation

### The architecture that best serves Hibob Studio over the next 3-5 years

The architecture defined in this document is designed for a 3-5 year horizon, not a 3-5 month sprint. The decisions made here will be most durable if they are made from first principles — not adapted from the current state, and not over-engineered for capabilities that don't yet exist.

---

### Architecture recommendation summary

**For the website:** A multi-page architecture with Homepage as the acquisition surface, individual product pages for depth, a dedicated Plans page for pricing decisions, and a Docs section for technical credibility and developer onboarding. The homepage is a narrative, not a feature list. Each subsequent page is a commitment to one specific creator decision.

**For navigation:** Four primary navigation items (Products, Plans, Docs, About) plus one primary CTA (Open Panel). This is the minimum viable platform navigation. It does not need to change as products are added — only the content within Products expands.

**For the homepage:** Eight sections ordered to follow the cognitive journey from category recognition to conversion. The Problem section is the most underinvested part of the current site and the highest return opportunity — creators who feel understood convert at significantly higher rates than creators who feel marketed to.

**For conversion:** One terminal action — `panel.hibobstudio.com`. Every path through the website, from any section, should eventually offer a path to the panel. The website's conversion success is measured not by page views or time on site, but by the ratio of visits that become panel sessions.

**For trust:** Build trust through products that exist and work, not through testimonials or statistics alone. The fastest trust-building action Hibob Studio can take is having Creator Panel publicly accessible with Creator Identity fully functional. A creator who connects their Discord + Roblox identity in their first session and sees their profile appear in the panel has experienced more trust-building in 5 minutes than any marketing page can create.

---

### The three constraints this architecture will never violate

**1. Platform clarity before product detail.**
No product feature list should appear before the category and ecosystem have been established. Creators who are confused about what Hibob Studio is will not correctly evaluate any product feature.

**2. Panel as the destination, not the website.**
The website exists to earn the right to send creators to the panel. If the website becomes a substitute for the panel — if creators try to use products from the website instead of from the panel — the architecture has failed.

**3. The ecosystem is always shown as a system, never as a menu.**
The moment Hibob Studio's products are presented as independent items that happen to share a brand, the platform positioning is lost. Every presentation of the product catalog — on the website, in the panel, in any communication — must communicate connection, not just adjacency.

---

*This document is the blueprint. Copywriting follows from it. Design follows from it. Development follows from it. When in doubt, return to positioning.md and this document before making any structural decision about the website or panel.*

*Hibob Studio — Information Architecture V2 — 2026-05-30*
