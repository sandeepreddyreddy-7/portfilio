#!/usr/bin/env node

/**
 * Script to import portfolio projects into Sanity CMS
 * Usage: npx tsx scripts/import-projects.ts
 */

import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

// Setup environment
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "kh1ktlp0";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN || "";

// Use Sanity REST API directly
const sanityURL = `https://${projectId}.api.sanity.io/v2024-03-31/data/mutate/${dataset}`;

interface Project {
  _type: string;
  title: string;
  slug: { current: string };
  status: string;
  category: string;
  subtitle: string;
  problem: string;
  solution: string;
  architecture: string[];
  impact: string[];
  techStack: string[];
  accentColor: string;
  order: number;
  caseStudy: string;
}

const projects: Project[] = [
  {
    _type: "project",
    title: "ValidationAI",
    slug: { current: "validation-ai" },
    status: "Patent Pending",
    category: "Generative AI",
    subtitle: "Multi-Model LLM Service Quality Verification Engine",
    problem:
      "Supplier service descriptions were frequently inaccurate or incomplete, causing assessment delays and manual verification cycles. Traditional validation was labor-intensive and prone to human error, resulting in week-long assessment cycles for service updates.",
    solution:
      "Built a multi-model LLM approach leveraging advanced AI models to autonomously validate and standardize supplier service descriptions. The system uses advanced prompt engineering and multi-step reasoning to analyze service submissions against known patterns, generating high-confidence validation scores and automated corrections.",
    architecture: [
      "FastAPI backend with real-time validation endpoints",
      "Multi-model LLM orchestration with fallback strategies",
      "Redis caching for submission analysis",
      "PostgreSQL for historical validation data and audit trails",
      "Docker containerization with OpenShift deployment",
      "Integration with third-party risk management platform",
      "CI/CD pipeline with automated security scanning",
    ],
    impact: [
      "Reduced assessment cycle time from 7+ days to same-day validation",
      "77% improvement in overall request submission quality",
      "94% AI accuracy in service validation without human intervention",
      "70% reduction in manual assessment effort",
      "Enabled real-time supplier feedback on submission quality",
      "Processes 100+ daily submissions with consistent accuracy",
    ],
    techStack: [
      "Python",
      "FastAPI",
      "LLM (Generative AI)",
      "PostgreSQL",
      "Redis",
      "Docker",
      "OpenShift",
    ],
    accentColor: "#8B5CF6",
    order: 1,
    caseStudy:
      "ValidationAI transformed the third-party risk assessment workflow by introducing AI-driven validation at submission time. The system analyzes service descriptions against historical patterns, compliance requirements, and industry standards using multi-model LLM orchestration, providing immediate feedback to suppliers. This real-time validation loop dramatically accelerated assessment cycles while improving data quality. The solution handles 100+ daily submissions with consistent 94% accuracy, reducing the assessment team's manual review workload by 70%.",
  },
  {
    _type: "project",
    title: "InsightBot",
    slug: { current: "insight-bot" },
    status: "Production",
    category: "Generative AI",
    subtitle: "Conversational AI Assistant for Real-Time Risk Assessment Status & Alerts",
    problem:
      "Security engineers and assessment managers spent significant time fielding repetitive requests about assessment status, security findings, and compliance updates. These inquiries were constant across time zones, creating support burden and context-switching overhead. Critical security findings often went unnoticed until routine reviews.",
    solution:
      "Deployed a conversational AI-powered chatbot providing instant, 24/7 status responses and proactive security finding notifications. The bot integrates directly with risk management platforms and databases, enabling natural language queries about assessments, findings, and compliance status. Automated alerts notify relevant stakeholders of high-severity security issues in real-time.",
    architecture: [
      "Conversational AI for natural language understanding and intent classification",
      "Slack API integration for bidirectional communication",
      "REST API connectors for real-time data access",
      "Python backend service for message orchestration and data retrieval",
      "PostgreSQL for finding cache and notification preferences",
      "Event-driven notification system with topic-based subscriptions",
      "Hosted on cloud infrastructure with high availability configuration",
    ],
    impact: [
      "24/7 availability eliminating support timezone constraints",
      "Instant status responses with sub-second latency",
      "Automated proactive security finding notifications",
      "Reduced support team response time by 80%",
      "Improved finding visibility and faster response to security issues",
      "Handles 300+ daily active queries with 98% accuracy",
    ],
    techStack: [
      "Python",
      "FastAPI",
      "Conversational AI",
      "Slack API",
      "PostgreSQL",
      "Event-Driven Architecture",
    ],
    accentColor: "#3B82F6",
    order: 2,
    caseStudy:
      "InsightBot became the primary interface for risk assessment status across the team. Engineers and managers can ask natural language questions like 'Show me all critical findings from last month' or 'What's the status of supplier compliance assessments?' and receive instant answers. The bot handles 300+ queries daily with 98% accuracy, eliminating most support tickets. Automated security alerts have reduced time-to-response for critical issues from 24 hours to minutes, improving overall risk visibility across the organization.",
  },
  {
    _type: "project",
    title: "ComplianceDiscovery",
    slug: { current: "compliance-discovery" },
    status: "Production",
    category: "Generative AI",
    subtitle: "Autonomous Multi-Agent Security Documentation Discovery & Analysis",
    problem:
      "Security assessments heavily relied on suppliers to provide security documentation and compliance certifications. This created dependency on slow supplier responses, delayed assessments, and incomplete security visibility. Suppliers often didn't respond, forcing manual research and assessment delays that could span weeks.",
    solution:
      "Developed a multi-agent AI framework that autonomously discovers supplier security documentation and compliance information. The system orchestrates multiple specialized agents: a web discovery agent that identifies relevant security pages, a documentation analyzer that extracts compliance certifications and controls, and an evaluation agent that rates documentation comprehensiveness.",
    architecture: [
      "Multi-agent AI framework with specialized agents for different tasks",
      "Web scraping with intelligent link discovery and validation",
      "Document parsing and OCR for security documentation",
      "Natural language analysis for control extraction and mapping",
      "PostgreSQL for storing discovered documentation URLs and metadata",
      "API endpoints for triggering autonomous discovery scans",
      "Integration with risk management platform for supplier enrichment",
      "Scheduled discovery runs for periodic updates",
    ],
    impact: [
      "Eliminated supplier dependency for security documentation discovery",
      "Contactless security assessments possible without supplier communication",
      "Accelerated due diligence throughput (2-3 days vs. 7-10 days)",
      "Discovered security documentation for 95%+ of assessed suppliers",
      "Reduced assessment delays by 60%",
      "Early risk visibility through autonomous compliance document analysis",
    ],
    techStack: [
      "Python",
      "FastAPI",
      "Multi-Agent AI",
      "Web Scraping",
      "OCR",
      "PostgreSQL",
      "Docker",
    ],
    accentColor: "#14B8A6",
    order: 3,
    caseStudy:
      "ComplianceDiscovery eliminated the critical path dependency on supplier responses. For each assessment, the system autonomously discovers the supplier's website, locates security and compliance documentation, extracts certifications, and identifies relevant policies. This contactless approach reduced assessment time by 60% and enabled the team to proceed with evaluations even when suppliers were unresponsive. The system has successfully discovered and analyzed documentation for over 500 suppliers with 95% accuracy, providing critical early-stage risk visibility.",
  },
  {
    _type: "project",
    title: "VulnerabilityOrchestrator",
    slug: { current: "vulnerability-orchestrator" },
    status: "Production",
    category: "Enterprise Automation",
    subtitle: "Automated SBOM Analysis & Security Finding Integration Pipeline",
    problem:
      "Security assessments required manual coordination between multiple platforms. Assessment teams spent 30+ minutes per supplier manually downloading, uploading, analyzing, and tracking SBOM (Software Bill of Materials) vulnerability results. This manual process was error-prone, time-consuming, and created bottlenecks during peak assessment cycles.",
    solution:
      "Built end-to-end automation orchestrating all assessment platforms. The system automatically processes SBOM files, submits them for comprehensive vulnerability scanning, retrieves results, enriches them with severity mapping, and updates assessment tracking systems with automated status updates and findings summaries. The workflow runs on event triggers and scheduled intervals.",
    architecture: [
      "FastAPI orchestration service managing workflow state and transitions",
      "Platform API integrations for SBOM retrieval and result submission",
      "Scanner SDK for automated vulnerability analysis",
      "Workflow tracking API for assessment status updates",
      "PostgreSQL for workflow history and audit logs",
      "Error handling and retry logic with exponential backoff",
      "Real-time status webhooks for team notifications",
      "Data enrichment pipeline for severity classification and deduplication",
    ],
    impact: [
      "90%+ time reduction per supplier (30+ min → 2-3 min automated)",
      "100% data accuracy (eliminated manual transcription errors)",
      "Zero manual scanning operations required",
      "Enables 3-4x assessment throughput during peak cycles",
      "Real-time vulnerability visibility in assessment workflows",
      "Fully compliant audit trail of all scanning activities",
    ],
    techStack: [
      "Python",
      "FastAPI",
      "SBOM Scanning Integration",
      "Workflow Orchestration",
      "PostgreSQL",
      "Docker",
    ],
    accentColor: "#F59E0B",
    order: 4,
    caseStudy:
      "VulnerabilityOrchestrator became the backbone of SBOM vulnerability assessment. Instead of 30+ minutes of manual work per supplier, the entire workflow is now fully automated and integrated. When an SBOM is submitted for assessment, the system automatically validates and normalizes the file, submits for comprehensive vulnerability scanning, waits for scan completion and data aggregation, enriches results with severity classification and deduplication, and updates assessment workflow with findings summary. The team can now assess 3-4x more suppliers in the same timeframe, with zero manual errors and complete audit trails. The system has processed 500+ SBOMs with 100% accuracy.",
  },
  {
    _type: "project",
    title: "SecureDeployment",
    slug: { current: "secure-deployment" },
    status: "Production",
    category: "Security / DevSecOps",
    subtitle: "Zero-Downtime Deployment Pipeline with Automated Security & Compliance Scanning",
    problem:
      "Manual deployment processes were slow, inconsistent, and lacked security rigor. Deployments took 2-3 hours, required manual testing, and had no systematic security scanning. Code could reach production with undetected vulnerabilities, secrets could be accidentally committed, and deployment failures required manual investigation.",
    solution:
      "Implemented a fully automated deployment pipeline that includes automated security scanning (secrets detection, SAST, dependency scanning), containerization with image scanning, automated testing with coverage thresholds, infrastructure validation, and zero-downtime blue-green deployments with automated rollback capability on failure.",
    architecture: [
      "GitHub Actions workflow orchestration",
      "Secrets detection at pre-commit stage",
      "Static analysis and code quality scanning",
      "Dependency vulnerability scanning with CVE alerts",
      "Container image security scanning",
      "Infrastructure-as-code validation",
      "Blue-green deployment strategy for zero-downtime updates",
      "Comprehensive monitoring and alerting",
      "Complete audit logging and deployment history",
    ],
    impact: [
      "90%+ deployment time reduction (2-3 hours → 10-15 minutes)",
      "100% automation (zero manual deployment steps)",
      "Zero-downtime deployments with instant rollback capability",
      "100% security scanning coverage before production",
      "Prevented 15+ potential security vulnerabilities",
      "Enabled 4x release cadence (daily vs. weekly)",
      "Reduced post-deployment incidents by 85%",
    ],
    techStack: [
      "Python",
      "GitHub Actions",
      "Docker",
      "Container Security Scanning",
      "SAST",
      "Secret Detection",
      "Terraform",
      "OpenShift",
    ],
    accentColor: "#EF4444",
    order: 5,
    caseStudy:
      "SecureDeployment transformed deployment from a manual, risky 2-3 hour process to a fully automated 10-15 minute workflow with zero-downtime capability. Every commit triggers an automated pipeline: secrets & credential scanning before commit acceptance, static code analysis and code quality checks, comprehensive dependency vulnerability scanning, automated unit and integration test suite, container image build with security scanning, infrastructure-as-code validation, blue-green deployment to production environment, automated smoke tests and health checks, and instant rollback capability if issues detected. The pipeline has executed 1,000+ successful deployments with 99.9% success rate. Zero security vulnerabilities have reached production. The team now deploys critical fixes in 10 minutes instead of 2-3 hours, enabling 4x faster release cycles.",
  },
  {
    _type: "project",
    title: "DataVerityAI",
    slug: { current: "data-verity-ai" },
    status: "Patent Pending",
    category: "Generative AI",
    subtitle: "Intelligent Data Verification & Fraud Detection Using Web Intelligence & Fine-Tuned LLM",
    problem:
      "Suppliers often submitted incomplete or inaccurate assessment requests with missing or misleading information about their services, coverage, and capabilities. Assessment teams couldn't trust submitted data and had to perform manual verification by researching suppliers, analyzing public data, and cross-referencing multiple sources. This manual verification consumed 1-2 hours per supplier and delayed assessments.",
    solution:
      "Developed an intelligent verification system that autonomously discovers and analyzes public information, cross-references with third-party data sources, and uses a trained, fine-tuned LLM to compare submitted data against discovered information. The system generates accuracy scores, identifies discrepancies, flags suspicious submissions, and provides detailed verification reports with confidence metrics. The system learns from historical verification data, improving accuracy over time.",
    architecture: [
      "Web intelligence agents for autonomous data discovery",
      "Third-party data source API integrations",
      "Fine-tuned LLM for intelligent data comparison and analysis",
      "Training pipeline for continuous model improvement",
      "PostgreSQL for storing verification results and audit logs",
      "Scoring engine for generating confidence metrics",
      "API endpoints for on-demand and batch verification",
      "Integration with risk management platform",
      "Comprehensive audit trail and decision logging",
    ],
    impact: [
      "Eliminated 1-2 hours of manual verification work per supplier",
      "96% accuracy in detecting misleading or incomplete submissions",
      "Automated verification enabled teams to focus on actual analysis",
      "Prevented fraudulent submissions from entering assessment workflow",
      "Early risk detection through data discrepancy analysis",
      "Improved overall data quality by 40%",
    ],
    techStack: [
      "Python",
      "FastAPI",
      "Fine-Tuned LLM",
      "Web Intelligence",
      "Third-Party Data APIs",
      "PostgreSQL",
      "Docker",
    ],
    accentColor: "#EC4899",
    order: 6,
    caseStudy:
      "DataVerityAI became the critical gatekeeper for data validation and fraud detection. When a request is submitted, the system autonomously discovers and analyzes relevant public data sources, extracts key information, certifications, service descriptions, and compliance details, and cross-references submitted data against discovered information using fine-tuned LLM analysis. It identifies discrepancies and inconsistencies with confidence scoring, and generates detailed verification reports with data accuracy score (0-100), identified discrepancies and their severity, risk flags for suspicious or fraudulent submissions, and supporting evidence. The system has verified 300+ submissions with 96% accuracy and has detected 25+ fraudulent or highly misleading submissions before they could impact downstream processes. Risk assessment teams now confidently proceed with evaluations knowing data quality is pre-verified and anomalies are flagged automatically.",
  },
];

async function importProjects() {
  try {
    if (!token) {
      throw new Error("Missing SANITY_API_TOKEN environment variable");
    }

    console.log(`📦 Importing ${projects.length} projects into Sanity...`);
    console.log(`Project ID: ${projectId}`);
    console.log(`Dataset: ${dataset}\n`);

    let created = 0;
    let failed = 0;

    for (const project of projects) {
      try {
        // Create mutation
        const mutations = [
          {
            createIfNotExists: {
              ...project,
              _id: `project.${project.slug.current}`,
            },
          },
        ];

        const response = await fetch(sanityURL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ mutations }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            `HTTP ${response.status}: ${errorText}`
          );
        }

        const result = await response.json();
        if (result.error) {
          throw new Error(result.error.message);
        }

        console.log(`✅ Created "${project.title}"`);
        created++;
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.error(`❌ Failed to create "${project.title}": ${errorMessage}`);
        failed++;
      }
    }

    console.log(`\n✨ Import complete!`);
    console.log(`   Created: ${created}`);
    console.log(`   Failed:  ${failed}`);

    if (failed === 0) {
      console.log(`\n🎉 All projects imported successfully!`);
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(`Fatal error: ${errorMessage}`);
    process.exit(1);
  }
}

importProjects();
