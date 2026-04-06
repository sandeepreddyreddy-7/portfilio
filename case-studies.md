# Case Studies — For Sanity Content

These case studies are written for the portfolio. Copy the content into Sanity CMS under each Project document's `caseStudy` field.

---

## VerifAI (SmartGate / ServiceTrace) — Dual-LLM Validation Engine

**Status:** Patent Pending  
**Category:** Generative AI  
**Year:** 2023–2025

### The Problem

IBM's Third-Party Security Risk Management team was drowning in low-quality vendor submissions. When suppliers responded to security questionnaires, the data came back chaotic — inconsistent formats, vague descriptions, missing critical details. Security assessors spent hours manually parsing these submissions, asking clarifying questions, and validating whether the supplied information was actually useful.

The bottleneck was brutal: a single assessment cycle took 7–14 days, mostly waiting for vendors to clarify submissions. More importantly, **70% of the manual effort was spent on validation and quality control**, not on security analysis. The team needed a way to *pre-validate* submissions in real time before they hit the assessment queue — catching quality issues before they became human work.

If nothing changed, assessment cycles would remain slow as the vendor base grew, and manual effort would scale linearly forever.

### My Approach

Instead of building a single generic LLM validator, I designed a **dual-LLM validation pipeline** — treating it like a peer-review system where two models with different strengths work together.

The key insight: **Model 1 evaluates; Model 2 improves.** Model 1 (watsonx.ai) scores submission quality on multiple dimensions. Model 2 (LLaMA 3-70B) doesn't just flag problems — it *generates concrete improvement recommendations* vendors can immediately act on. This creates a feedback loop: vendors see exactly what's missing and can submit a corrected version within the same session.

I validated this architecture through **double-blind testing on 200+ real submissions**, measuring both model accuracy against human assessor judgments and measuring the business impact on vendor resubmission rates and cycle time. The testing wasn't hypothetical — it was against actual TPSRM assessment records.

### What I Built

**Architecture:**
- **Intake Layer**: FastAPI microservice exposed as web form and Slack integration
- **Model 1 (Evaluator)**: watsonx.ai fine-tuned on TPSRM assessment criteria; scores quality on dimensions like clarity, completeness, technical depth, compliance relevance
- **Model 2 (Recommender)**: LLaMA 3-70B with custom prompt engineering; generates specific improvement suggestions vendor can implement
- **Dual-Validation Loop**: Both models run synchronously; results synthesized into single quality report
- **Feedback Integration**: Vendor sees report and can resubmit; system tracks resubmission quality trends
- **Storage & Analytics**: All validation results logged to Cloudant for trend analysis and model performance monitoring
- **Tech Stack**: Python, FastAPI, watsonx.ai, LLaMA 3-70B, Docker, IBM Cloud (Code Engine, Container Registry)

### The Hard Parts

**1. Model Alignment** — Getting two different LLM architectures (closed-source watsonx.ai + open LLaMA 3) to produce *consistent, non-contradictory* scores was non-trivial. If Model 1 said "this is good" and Model 2 said "this is bad," vendors would lose trust. I solved this by:
   - Creating a "consensus scoring" layer that weighted both models' outputs
   - Running extensive calibration on a validation dataset to identify disagreement patterns
   - Tuning prompts so both models used the same evaluation rubric

**2. Quality Definition** — What even *is* "quality" for a security questionnaire submission? It's not a binary pass/fail. I worked cross-functionally with assessors to define scoring rubric:
   - Technical depth (does it show system knowledge?)
   - Completeness (are all critical fields addressed?)
   - Clarity (can a non-expert security analyst understand this?)
   - Compliance relevance (does it address the actual risk?)
   
   Encoding these subjective judgments into LLM prompts required iterative refinement with actual assessor feedback.

**3. Double-Blind Testing** — Standard ML testing doesn't work here because the "ground truth" is human judgment, which is subjective. I designed a double-blind study where:
   - 200+ real vendor submissions were independently scored by two human assessors and both AI models
   - Cohen's kappa measured inter-rater agreement (human-to-human, model-to-human)
   - Results showed model agreement with human assessors within the range of human-to-human agreement (94% accuracy)

### Results

- **94% AI accuracy** — Model predictions aligned with human assessor judgments within normal human variance
- **77% improvement in request quality** — Vendors who received AI recommendations and resubmitted showed 77% higher quality on second submission
- **70% reduction in manual effort** — Assessors spending 70% less time on validation per submission
- **7-day cycle time reduction** — Assessment cycles compressed from 10–14 days to 3–7 days
- **2 Patents Filed** — Patent 1 (U.S. 19/008667): Anomaly detection in assessment data; Patent 2 (P202501766): Multi-model verification system

**Staff-Level Signal:** This project demonstrates the kind of thinking that separates senior engineers from staff. Rather than building "a better validator," I designed a system where two models have different epistemic strengths and built the orchestration to make them work together. The double-blind validation wasn't just good practice — it was the *only way* to ship something hiring managers would trust. That's the difference between shipping features and shipping *credible* systems.

---

## SupplierIQ (TC Scout) — Autonomous Trust Center Discovery

**Status:** Production  
**Category:** Enterprise Automation  
**Year:** 2023–2025

### The Problem

Vendor security assessments require documentation: SOC 2 reports, ISO 27001 certificates, security whitepapers, architecture diagrams. Traditionally, assessors would email vendors asking them to send all relevant security artifacts. Vendors would scramble to find these documents (often stored across multiple teams), package them, and send back. Assessment would halt waiting for the response.

IBM's assessment team faced a choice: **either wait for vendor responsiveness, or do detective work on the web.** Both were terrible. Waiting added days to each assessment cycle. But having your security team do Google-fu on competitors' websites wasn't scalable or repeatable.

The bottleneck: **Assessment cycles were vendor-dependent.** Teams couldn't move forward until suppliers engaged. And growing the vendor base meant exponential growth in the manual engagement overhead.

### My Approach

I designed a **fully autonomous multi-agent AI system** (using watsonx Orchestrate) that could search the web for vendor security artifacts *without any human intervention*. The system needed to:
1. **Discover** where a vendor publishes trust center docs (URL patterns vary wildly)
2. **Extract** relevant documents (SOC 2, ISO certs, whitepapers, architecture diagrams)
3. **Validate** that extracted docs are current and authentic (not outdated or spoofed)
4. **Report** findings back to assessors in structured format

The key insight: **Contactless assessment.** If we could autonomously gather 80% of the documentation, vendors would only need to engage for the remaining 20% — the specific, internal security details that can't be found publicly. This flips the dynamic from "vendor engagement gates assessment" to "autonomous discovery accelerates vendor engagement."

### What I Built

**Architecture:**
- **Agent 1 (Discovery)**: Searches public trust centers, security whitepapers, vulnerability disclosures; identifies vendor documentation URLs using web scraping and public data sources
- **Agent 2 (Extraction)**: Downloads and parses SOC 2 Type II reports (PDF), ISO certificates, architecture documentation; extracts key metadata (certification dates, scope, audit firm, assessed controls)
- **Agent 3 (Validation)**: Cross-validates extracted data against vendor domain WHOIS records, certificate authorities, audit firm databases to ensure authenticity; flags outdated or suspicious documents
- **Agent 4 (Reporting)**: Synthesizes findings into structured JSON; maps extracted artifacts to assessment questionnaire requirements
- **Orchestration**: watsonx Orchestrate manages agent lifecycle and inter-agent communication; built circuit breakers for graceful degradation if individual agents fail
- **Storage**: All discovered artifacts logged to Cloudant; assessors can review and override if needed
- **Tech Stack**: Python, FastAPI, watsonx Orchestrate, watsonx.ai, Docker, IBM Cloud, Cloudant, web scraping libraries (BeautifulSoup, Playwright)

### The Hard Parts

**1. Autonomous Agent Reliability** — Multi-agent systems fail in subtle ways. Agent 1 might find a fake trust center. Agent 2 might misparse a PDF. Agent 3 might over-validate and reject legitimate documents. The system needs to be *obviously wrong* if it fails, not *subtly wrong.*

   I solved this by:
   - Building extensive logging and audit trails (every agent decision is traceable)
   - Creating a "confidence score" for each finding (low confidence = assessor review required)
   - Implementing manual override workflows so assessors can correct agent mistakes and feed corrections back to improve accuracy

**2. Trustworthiness of Autonomous Decisions** — You can't just tell assessors "here's what the agents found; trust it." I had to earn trust by:
   - Making agent reasoning transparent (agents output *why* they made each decision)
   - Flagging high-uncertainty findings for human review
   - Running the system in "shadow mode" for 3 months where agents made recommendations but humans made final decisions
   - Only after 95%+ accuracy on shadow data did we flip to autonomous decision-making

**3. Web Data Quality** — The internet is noisy. Vendors publish outdated docs, marketing copy gets confused with technical specs, fake security certifications exist. I built validation layers:
   - Cross-reference extraction results against authoritative sources (AICPA SOC 2 registry, ISO certificate database)
   - Detect document staleness (is this SOC 2 from 2019 or 2024?)
   - Flag docs that don't match vendor's claimed infrastructure (if vendor claims they're AWS-only, why does their SOC 2 mention on-prem datacenters?)

### Results

- **100% automation of trust center discovery** — Assessors no longer need to ask vendors for basic documentation
- **7+ day cycle time reduction** — Eliminated the "wait for vendor to send docs" phase entirely
- **Zero vendor engagement required for initial assessment** — Vendors only engage if assessors have questions after reviewing autonomous findings
- **6+ production AI systems deployed** as part of SmartGate platform (TC Scout + VerifAI + AskTPSRM chatbot + Mend scanner + Monday automation + CI/CD pipeline)
- **Patent Filed** — System and Method for Automated Verification (P202501766)

**Why This Matters:** This is the difference between automation and *intelligent* automation. Bots can scrape websites. But designing a system where multiple independent AI agents collaborate, validate each other's work, and surface their own uncertainty to humans — that's Staff-level thinking. It's about building systems that can operate unsupervised but know when to defer to humans. That's what enterprise-grade AI looks like.

---

## Key Metrics (Cross-Project)

| Metric | Origin |
|---|---|
| **94%** AI accuracy | VerifAI dual-LLM validation |
| **77%** improvement in submission quality | VerifAI vendor resubmissions |
| **70%** reduction in manual assessment effort | VerifAI validation workload |
| **7+ days** cycle time reduction | TC Scout (eliminated vendor wait time) |
| **100%** end-to-end automation | TC Scout trust center discovery |
| **2 Patents filed** | VerifAI + TC Scout combined |
| **6+ production AI systems** | SmartGate platform (including both + 4 others) |
| **4× release cadence** | CI/CD pipeline (monthly → weekly) |
| **100% SBOM coverage** | Mend scanner (previously zero) |
| **Hours → seconds** | AskTPSRM Slack chatbot response time |
