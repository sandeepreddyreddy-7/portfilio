# Portfolio Implementation Plan
**sandeepreddy.dev** — Senior Software Engineer, IBM

> Goal: Make your value impossible to ignore. Every fix below serves one outcome — a recruiter or hiring manager who lands on this portfolio should feel compelled to reach out within 60 seconds.

---

## Phase 0 — Critical Fixes (Do These Today, < 2 Hours)

These are blocking issues. A hiring manager who sees any of these will second-guess the rest of the site.

### 0.1 Fix Name Sitewide
- [ ] Update display name from `Sandeep Reddy Reddy` → `Sandeep Reddy` in:
  - HTML `<title>` tag and meta tags
  - Hero heading
  - About section
  - Footer text
  - Copyright line (`© 2025 Sandeep Reddy Reddy` → `© 2026 Sandeep Reddy`)
  - `og:title` and `og:description` meta tags (social share preview)

### 0.2 Sync Contact Email
- [ ] Replace all instances of `asandeepreddy170@gmail.com` → `sandeep@sandeepreddy.dev`
  - Contact section email link
  - Footer email link
  - Contact form `reply-to` field (if configured)
  - Any mailto: links

### 0.3 Fix Copyright Year
- [ ] Footer: `© 2025` → `© 2026`

### 0.4 Resolve "Full Case Study" Buttons
**Option A (Recommended):** Replace with anchor links to expanded inline content (see Phase 2)
**Option B (Quick fix):** Remove buttons entirely until case studies are written
**Option C (Do not do):** Leave as dead links — this actively hurts credibility

- [ ] Decide on Option A or B
- [ ] Implement across all 4 project cards: VerifAI, SupplierIQ, AskTPSRM, SmartGate

---

## Phase 1 — Content Strengthening (This Week, 3–5 Hours)

No new pages needed. Improvements to existing content.

### 1.1 Update Hero Stats
Replace weak or outdated stats with stronger, more specific numbers.

| Current | Replace With |
|---|---|
| `6+ Services Led` | `10+ Distributed Services` |
| `Patent Inventor` (generic) | `2 IBM Patents Filed` |

Keep: `8+ Years @ IBM`, `94% AI Accuracy`, `4× Release Cadence` — these are strong.

**Stretch:** If you can calculate or estimate cost/effort savings (e.g., "$500K in manual effort automated"), add it as a sixth stat tile.

### 1.2 Punch Up the About Section
Current About reads like a resume. Add one sentence of engineering voice/philosophy.

**Add after the first paragraph:**
> "I approach every system as if I'll be the one on-call at 3am when it breaks — which means I design for observability, security, and failure from day one."

This signals Staff-level thinking in one sentence. Recruiters and EMs notice.

### 1.3 Add "Open to Work" Signal
Currently buried in the Contact section. Surface it higher.

- [ ] Add a subtle badge/pill in the hero area: `🟢 Open to Senior & Staff roles`
- [ ] Or add a top banner strip (1 line, dismissible): *"Currently exploring Senior SWE, Staff Engineer, and Technical Lead opportunities — Durham, NC / Remote"*

### 1.4 Resume PDF Consistency
- [ ] Verify `/Sandeep_Reddy_Resume.pdf` linked in the nav matches the latest resume version
- [ ] Rename file to `Sandeep_Reddy_Resume_2026.pdf` or use a versioned path to avoid browser caching issues
- [ ] Confirm PDF opens correctly and is not the old "Sandeep Reddy Reddy" version

---

## Phase 2 — Project Case Studies (Next 2 Weeks, Highest ROI)

This is the single highest-impact thing you can do. Right now your project cards show what was built. Case studies show *how you think*. That's what gets Staff-level offers.

Each case study should follow this structure (500–800 words per project):

```
## [Project Name]
### The Problem
[2–3 sentences: what was broken, what was the business pain, what would happen if nothing was done]

### My Approach
[3–4 sentences: how you thought about the architecture, what tradeoffs you considered, why you made the choices you made]

### What I Built
[Technical detail: stack, key components, architectural decisions]

### The Hard Parts
[1–2 specific challenges — a bug you had to reason through, a design decision that was non-obvious, a constraint that forced a creative solution. This is what separates senior from junior narrative.]

### Results
[Quantified impact — use the same metrics from the resume]
```

### Priority Order

**1. VerifAI (Patent Pending) — Do This First**
Most differentiated. Dual-LLM validation is a novel architecture choice. Walk through *why* you chose two models instead of one, how you designed the evaluation loop, and what you learned from the double-blind testing methodology. This is Staff-level writing.

**2. SupplierIQ**
100% automation is a big number. Explain what "100% automation" actually means technically — what did the agents do, how did you orchestrate them, what failure modes did you design for.

**3. SmartGate**
4× release cadence is easy to understand and impressive to any EM. Lead with that. Then explain the SAST/DAST architecture decisions.

**4. AskTPSRM**
Solid enterprise automation story. Good for rounding out the portfolio but write the others first.

### Implementation Options
- **Inline expandable:** "Full case study" button expands a panel below the project card (no new route needed, good UX)
- **Separate page:** `/projects/verifai` — better for SEO and sharing individual links with hiring managers

Recommended: **Separate pages** for VerifAI and SupplierIQ (your two strongest), inline for the other two.

---



## Phase 5 — SEO & Discoverability (Ongoing, Low Effort)

Helps recruiters find you on Google, not just through the resume link.

### Meta Tags (1 hour)
- [ ] Set `<title>`: `Sandeep Reddy — Senior Software Engineer | AI, Security & Cloud`
- [ ] Set `meta description`: `Senior Software Engineer with 8+ years at IBM. Named inventor on 2 IBM patents. Production GenAI systems, enterprise security platforms, and DevSecOps pipelines.`
- [ ] Set `og:image`: a clean headshot or a branded card (1200×630px)
- [ ] Set `og:title` and `og:description` for social sharing

### Google Search Console
- [ ] Submit `sandeepreddy.dev` to Google Search Console
- [ ] Submit sitemap (Next.js generates one automatically or use `next-sitemap`)

### Structured Data (Optional, High Value)
- [ ] Add `Person` schema with `name`, `jobTitle`, `url`, `sameAs` (LinkedIn, GitHub)
- [ ] Add `BreadcrumbList` for project pages

---

## Phase 6 — Social Proof (4–6 Weeks)

The hardest to add but the most trust-building.

### LinkedIn Recommendations
- [ ] Request 2–3 recommendations from IBM colleagues, ideally:
  - One from a manager or tech lead (seniority signal)
  - One from a peer who worked on a shipped system with you
  - One from a stakeholder (Security, Compliance, Product)
- [ ] Embed or quote one recommendation in the portfolio About section

### Add a "Featured In" or "Recognition" Row (If Applicable)
- IBM internal awards, presentations, or publications
- Any external talks, blog posts, or conference participation
- If none yet, this row can wait — don't fake it

---

## Summary: Phase Priority Matrix

| Phase | Effort | Impact | Timeline |
|---|---|---|---|
| Phase 0 — Critical Fixes | Low | Critical | Today |
| Phase 1 — Content Strengthening | Low | High | This week |
| Phase 2 — Case Studies | High | Very High | 2 weeks |
| Phase 3 — SEO | Low | Medium | Ongoing |
| Phase 4 — Social Proof | High | High | 4–6 weeks |

---

## Consistency Checklist (Verify Across Resume + Portfolio + LinkedIn)

Before sharing with any recruiter or hiring manager, confirm these match everywhere:

- [ ] Name: `Sandeep Reddy` (not "Reddy Reddy")
- [ ] Email: `sandeep@sandeepreddy.dev`
- [ ] LinkedIn URL: `linkedin.com/in/sandeepreddy170`
- [ ] GitHub: `github.com/sandeepreddyreddy-7`
- [ ] Portfolio URL: `sandeepreddy.dev`
- [ ] Job title: `Senior Software Engineer`
- [ ] Patent language: "named inventor on 2 IBM patent filings"
- [ ] Service count: "10+ distributed services"
- [ ] Copyright year: 2026

---

*Last updated: April 2026*
