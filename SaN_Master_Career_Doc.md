# SaN — Master Career Documentation
> Source of truth for Resume, LinkedIn, and Portfolio. Update here first, then propagate everywhere.

---

## Contact & Links
- **Email**: sandeep@sandeepreddy.dev
- **Portfolio**: sandeepreddy.dev
- **LinkedIn**: linkedin.com/in/sandeepreddy170
- **GitHub**: github.com/sandeepreddyreddy-7
- **Location**: Durham, NC
- **Status**: Open to Senior Engineer, Staff Engineer, Solutions Architect, Technical Lead roles

---

## Professional Summary

Senior Software Engineer and 2× Patent Inventor with 8+ years building production-grade systems at IBM. Founding technical implementer of IBM's Third-Party Security Risk Management platform — built the entire system from scratch, taking it from Excel sheets to a full enterprise GRC platform serving IBM's global workforce. Specializes in Generative AI, distributed systems, and enterprise security automation. Python-first engineer with deep expertise in FastAPI, multi-agent LLM frameworks, and DevSecOps. Ships end-to-end — from architecture through production.

---

## Education

**M.S. Computer Science** — Texas A&M University | College Station, TX | Dec 2017

**B.E. Computer Science** — SRM University | India | Apr 2016

---

## Patents

### Patent 1 — SmartGate (ServiceTrace)
- **Title**: Detection and Management of Anomalies in Assessment Data
- **Number**: U.S. Patent Application No. 19/008667
- **Status**: Filed
- **Entity**: IBM
- **Covers**: Automated anomaly detection and management within third-party security assessment data pipelines
- **Related Tech**: watsonx.ai, LLaMA 3-70B, FastAPI, ProcessUnity, AppScan, Contrast Security

### Patent 2 — TC Scout
- **Title**: System and Method for Automated Verification of Supplier Risk Questionnaire Data Using Multi-Model Language Understanding
- **Number**: IBM Invention Disclosure P202501766
- **Status**: Review Completed
- **Entity**: IBM
- **Covers**: Multi-model LLM-based automated verification of supplier risk questionnaire submissions
- **Related Tech**: watsonx Orchestrate, watsonx.ai, FastAPI, ProcessUnity

---

## Work Experience

---

### IBM | Senior Software Engineer — TPSRM
**May 2021 – Present | Durham, NC**

#### Context
IBM's Third-Party Security Risk Management (TPSRM) organization manages vendor/supplier security assessments at enterprise scale. SaN joined when the team ran on Excel sheets and led all technical implementation to transform it into a full GRC platform — two portals (IBM users + vendor-facing), end-to-end workflow automation, and a suite of AI systems.

#### The Platform (TPSRM Core)
Led all technical implementation of IBM's TPSRM platform from inception — translating business requirements into a full production system:

- **IRQ Request Forms**: Built intake forms used by IBM employees to submit supplier risk requests; integrated automated risk scoring based on form inputs
- **Risk Scoring Engine**: Implemented calculation logic that assigns risk ratings and routes requests to the correct workflow state automatically
- **Assessment Records & SIG Questionnaires**: Automated creation of vendor-side assessment records; built and configured Standard Information Gathering (SIG) questionnaire workflows sent to vendors
- **Vendor Portal**: Built external-facing supplier portal where vendors log in, answer questionnaires, and upload security documentation (SOC 2, ISO 27001, etc.)
- **IBM User Portal**: Built internal portal with SSO/SAML integration per IBM enterprise standards
- **Dashboards & Reports**: Built real-time operational dashboards and reporting for the TPSRM team
- **Workflow Automations**: Configured end-to-end automation rules throughout the assessment lifecycle (status transitions, notifications, escalations)
- **RBAC**: Implemented roles and team management across the platform
- **Continuous Monitoring Integration**: Connected platform to external threat intelligence tools for ongoing vendor security monitoring

#### External Tool Integrations Built
- Black Kite (cyber risk intelligence)
- CyberGRX (third-party risk exchange)
- Recorded Future (threat intelligence)
- Risk Recon (continuous monitoring)
- Mend / WhiteSource (SBOM scanning)
- Monday.com (workflow management)
- IBM ERP (enterprise spending data — collaborated with ERP team)
- Access Hub (IBM identity/access)
- Ariba (procurement)
- Decision Focus (IBM internal tool)
- Dun & Bradstreet (vendor risk scoring)
- Collaborated with: IBM Internal Audit, NIE, and Acquisitions teams

#### SmartGate — AI Automation Platform
Built SmartGate, a Python/FastAPI microservices platform with 6 production AI systems:

**1. SmartGate / ServiceTrace — AI Service Validation** *(Patent Filed)*
- Built dual-LLM validation system using watsonx.ai and LLaMA 3-70B
- Model 1 evaluates supplier service description quality in real-time; Model 2 generates improvement recommendations
- Conducted double-blind testing on 200+ submissions to validate performance
- **Impact**: 94% AI accuracy, 77% improvement in request quality, 70% reduction in manual validation effort, 7-day cycle time reduction
- Tech: Python, FastAPI, watsonx.ai, LLaMA 3-70B, Docker, IBM Cloud

**2. TC Scout — Trust Center Discovery** *(Patent — Review Completed)*
- Built autonomous multi-AI agent framework using watsonx Orchestrate
- Agents autonomously discover, extract, and evaluate supplier trust centers across the web (SOC 2, ISO certifications, security whitepapers)
- Enables contactless security assessments without requiring supplier engagement
- **Impact**: 100% automation of trust center discovery, eliminated supplier dependency for initial documentation
- Tech: Python, FastAPI, watsonx Orchestrate, watsonx.ai, Docker, IBM Cloud

**3. AskTPSRM — AI Slack Chatbot**
- Built 24/7 AI-powered chatbot for TPSRM status queries and proactive security finding notifications
- Deployed on Slack (primary) and as web widget on internal IBM w3 page
- Integrated watsonx Assistant for NLP; connected to ProcessUnity for real-time data
- **Impact**: Reduced status inquiry response time from hours to seconds; deflected routine support load from TPSRM team; automated Slack notifications for security findings
- Tech: Python, FastAPI, watsonx Assistant, Slack API, Docker, IBM Cloud

**4. Mend Scanner — SBOM Vulnerability Scanning**
- Built automated SBOM scanning system using Mend (WhiteSource)
- Processes CycloneDX and SPDX format SBOM files; identifies critical and high-severity CVEs
- **Impact**: 100% SBOM coverage (previously zero), eliminated manual vulnerability research, immediate detection upon SBOM submission
- Tech: Python, FastAPI, Mend API, Docker, IBM Cloud

**5. Monday Mend Integration — Workflow Orchestration**
- Built end-to-end automation orchestrating ProcessUnity → Monday.com → Mend
- Assessor validates data and marks "Ready to Load"; system handles all downstream operations automatically
- **Impact**: 90%+ time reduction per assessment (30+ minutes → 2-3 minutes), 100% data accuracy, eliminated all manual Mend operations
- Tech: Python, FastAPI, Monday.com SDK, Mend API, ProcessUnity API, Docker

**6. CI/CD Pipeline — DevSecOps**
- Built fully automated deployment pipeline: commit → build → test → multi-layer security scan → Docker → deploy to OpenShift → verify
- Security gates: Gitleaks (secrets), SAST, DAST, SonarQube, AppScan, container scanning, dependency scanning
- **Impact**: 90%+ deployment time reduction, release cadence from monthly to weekly, zero-downtime rolling deployments
- Tech: Python, Bash, YAML, GitHub Actions / GitLab CI, Docker, Kubernetes/OpenShift, IBM Cloud

**Cat Trap** *(details to be added)*
- AI agent for automated vendor risk categorization (low/high risk)
- Uses domain data, Dun & Bradstreet data, and website scraping
- Patent-related work

#### Tech Stack (Senior Role)
Python, FastAPI, Flask, watsonx.ai, watsonx Orchestrate, watsonx Assistant, LLaMA 3-70B, React, Next.js, Docker, IBM Cloud, OpenShift, Kubernetes, ProcessUnity, SSO/SAML, GitHub Actions, Gitleaks, SAST/DAST, SonarQube, AppScan, Mend, SBOM, Monday.com API, Slack API

---

### IBM via Inteliroute Technologies LLC | Software Engineer — ARM Tool
**April 2018 – May 2021 | Durham, NC**
*(Vendor/contractor engagement; converted to IBM full-time May 2021)*

#### Context
Agile Risk Management (ARM) — internal IBM tool for tracking and managing deviation risks. Full stack development on Java + Angular stack.

#### What Was Built
- **Backend**: Java REST APIs with Lambda expressions and Streams
- **Frontend**: Angular components, Bootstrap, ChartJS — built dashboards and reports
- **Cloud Migration**: Migrated ARM to IBM Hybrid Cloud Cirrus (OpenShift); connected frontend/backend with NGINX
- **GRC Foundation**: Built ProcessUnity GRC workflows and SSO/SAML integrations
- **Identity Infrastructure**: Federated identity system + SendGrid email integration
- **DevOps**: Containerized microservices with Docker; built Jenkins CI/CD pipelines
- **Libraries**: Built Angular component libraries; Python data processing tools

#### Tech Stack (Early Role)
Java, Spring Boot, Angular, Python, Docker, OpenShift, NGINX, Jenkins, ProcessUnity, SSO/SAML, Bootstrap, ChartJS, SendGrid

---

## Skills

### Languages
Python (5yr, primary), Java (3yr), TypeScript, JavaScript, Bash, SQL

### AI / GenAI
watsonx.ai, watsonx Orchestrate, watsonx Assistant, LLaMA 3-70B, Multi-Agent Systems, RAG, Prompt Engineering, Dual-LLM Architecture

### Frameworks & APIs
FastAPI (primary), Flask, Spring Boot, REST APIs, gRPC, Microservices, Event-Driven Architecture

### Frontend
React, Next.js, Angular, TypeScript, HTML5, Tailwind CSS

### Cloud & DevOps
IBM Cloud, Docker, OpenShift, Kubernetes, GitHub Actions, GitLab CI, Jenkins, CI/CD Pipelines

### Security & GRC
OWASP Top 10, DevSecOps, SAST/DAST, SBOM (CycloneDX/SPDX), Gitleaks, SonarQube, AppScan, Mend/WhiteSource, Zero Trust IAM, SSO/SAML, ProcessUnity GRC

### External Integrations
Black Kite, CyberGRX, Recorded Future, Risk Recon, Monday.com, Slack API, Mend, D&B, IBM ERP, Access Hub, Ariba

### Databases & Tools
Cloudant, MongoDB, PostgreSQL, Redis, S3 Object Storage, Postman, Git

---

## Personal Projects

### Fotryx *(Personal Project — Public GitHub)*
- Microsite platform for photographer couples — dual-branding, shared galleries, contact routing
- Built and shipped end-to-end independently
- *H1B note: no revenue, framed as personal project*

### JobRadar *(Personal Project — Public GitHub)*
- Job search intelligence tool to aggregate listings, surface visa-sponsorship-friendly roles, and track application pipeline
- Built to solve own job search workflow
- *H1B note: no revenue, framed as personal project*

---

## Key Metrics (Master List)
| Metric | Source |
|---|---|
| 94% AI accuracy | SmartGate dual-LLM validation |
| 77% improvement in request quality | SmartGate submissions |
| 70% reduction in manual effort | SmartGate validation |
| 7-day cycle time reduction | SmartGate / assessment pipeline |
| 90%+ deployment time reduction | CI/CD pipeline |
| Monthly → weekly release cadence (4×) | CI/CD pipeline |
| 30+ min → 2-3 min per SBOM assessment | Monday Mend Integration |
| 100% SBOM coverage | Mend Scanner |
| 100% automation of trust center discovery | TC Scout |
| Hours → seconds response time | AskTPSRM Slack Bot |
| 200+ submissions validated in testing | SmartGate double-blind test |
| 2 Patents | SmartGate + TC Scout |
| 6 production AI systems shipped | SmartGate platform |
| 10+ enterprise tool integrations | TPSRM platform |

---

## Notes & To-Do
- [ ] Add Cat Trap project details when ready
- [ ] Confirm Fotryx and JobRadar tech stacks for portfolio project pages
- [ ] Verify H1B side project status with immigration attorney before featuring publicly
- [ ] Connect sandeepreddy.dev domain to Vercel (DNS records)
- [ ] Update portfolio copyright from 2025 → 2026
- [ ] Add GitHub links to all portfolio projects
- [ ] Add live demos or architecture diagrams to at least 2 projects
