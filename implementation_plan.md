
# Consolidated Portfolio Implementation Plan

This implementation plan merges the 7-phase structural rebuild strategy with the exact resume-sourced content. This ensures every phase delivers both technical improvements and highly accurate, data-driven content to produce a production-grade senior engineering portfolio.

---

## Phase 1: Foundation & Critical Fixes
**Focus:** Essential setup, broken link fixes, and immediate professional baseline.

- [ ] **Deploy to Vercel:** Ensure live domain setup.
- [ ] **Contact Form Wiring:** Replace fake delay with a real email API (e.g., Resend via Next.js API routes) or Formspree/EmailJS.
- [ ] **Resume PDF:** Add `SaN_Resume_2026.pdf` to `/public/resume.pdf` and wire the download button.
- [ ] **OG Meta Tags:** Add primary title, description, and image metadata in `app/layout.tsx`.
- [ ] **Fix Social Links:**
  - GitHub: https://github.com/sandeepreddyreddy-7
  - LinkedIn: https://linkedin.com/in/sandeepreddy170
  - Email: asandeepreddy170@gmail.com (mailto)

---

## Phase 2: Design System & UI Overhaul
**Focus:** Establishing a cohesive design language and replacing amateur patterns with senior-level UI components.

- [ ] **Design Tokens:** Create `lib/design-tokens.ts` for uniform colors, typography scale, spacing, and Framer Motion animation presets.
- [ ] **Hero Section Updates:**
  - Title: `Senior Software Engineer | AI / Security / GRC | Full Stack & Cloud Engineering`
  - Stats: `8+ Years @ IBM`, `2× Patent Inventor`, `6+ Distributed Services Led`, `94% AI Accuracy Achieved`, `4× Release Cadence Increase`
  - Location Badge: `📍 Durham, NC · Open to Senior Engineering, Staff, and Technical Lead roles · Remote-friendly`
  - Typewriter terms: `Generative AI Systems`, `Security Engineering`, `Enterprise Cloud Architecture`, `Multi-Agent AI`, `DevSecOps Pipelines`, `GRC Automation`.
- [ ] **Skills Section Overhaul:** Remove percentage progress bars entirely. Convert to chips/tags using exact categories (AI / GenAI, Languages, Backend & APIs, Frontend, Cloud & DevOps, Security & GRC, Databases & Tools).
- [ ] **Scroll UX & Polish:** Add scroll progress indicator and back-to-top button. Test contrast and dividers format.

---

## Phase 3: Content Depth & Credibility
**Focus:** Elevating project impact, adding new highly-technical projects, and expanding professional history.

- [ ] **Projects Upgrade:**
  - **AskTPSRM:** Rename, add 10-second response metric.
  - **[NEW] SupplierIQ (Multi-Agent):** Add metrics (100% automation, 7+ day cycle compression).
  - **[NEW] VerifAI (Dual-LLM):** Add metrics (77% quality, 70% reduction, 94% accuracy, Patent U.S. App. No. 19/008667).
  - **SmartGate (DevSecOps):** Rename, 4x release cadence.
- [ ] **Experience Timeline Upgrade:** Expand the IBM role with metrics and separate the Inteliroute contractor timeline clearly.
- [ ] **Patents Section:** Add a dedicated section highlighting App No. 19/008667 and Invention Disclosure P202501766.
- [ ] **About Bio:** Paste the curated 3 paragraphs along with the four Value Cards (Systems Thinking, Ownership Mindset, Secure by Default, AI-Native Builder).

---

## Phase 4: Performance, SEO & Analytics
**Focus:** Technical optimization and discoverability.

- [ ] **Image Optimization:** Migrate all `<img>` tags to `next/image`.
- [ ] **SEO Basics:** Add `app/robots.ts` and `app/sitemap.ts`.
- [ ] **Customization:** Add a branded `app/not-found.tsx` and implement `@vercel/og` for dynamic Open Graph image generation.
- [ ] **Analytics:** Add Plausible Analytics (or Google Analytics) and target Lighthouse 95+.

---

## Phase 5: CMS Integration (Sanity.io)
**Focus:** Decoupling content from code so the site is maintainable from a browser.

- [ ] **Schema Definition:** Create `project.ts`, `experience.ts`, `skill.ts`, `about.ts`, and `patent.ts` schemas aligned with our content structure.
- [ ] **Data Migration & Fetching:** Migrate data into Sanity Studio and replace static arrays with GROQ fetches in Next.js Server Components.
- [ ] **Image Pipeline:** Wire up @sanity/image-url for cloud image optimization.

---

## Phase 6: Admin Portal — On-Site Studio
**Focus:** Making the Sanity Studio accessible natively via `/studio`.

- [ ] **Embedded Studio:** Integrate `next-sanity` at the `/studio` route.
- [ ] **Auth & Branding:** Require Google OAuth and brand the studio.
- [ ] **Sanity Webhooks:** Setup Sanity Webhooks to trigger Vercel deployments upon CMS publish.

---

## Phase 7: Pre-Launch QA & Rollout
**Focus:** Final polish, rendering pass, and deployment checks.

- [ ] **Cross Browser & Mobile Testing:** Validate layout across iPhone, Android, Safari, Chrome, Firefox.
- [ ] **Accessibility:** Perform a final Lighthouse accessibility pass.
- [ ] **Proofreading:** Verify all metrics and titles match the content guide exactly.
