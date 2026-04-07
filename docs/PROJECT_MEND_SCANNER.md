# Mend Scanner

## 1. Project Name
**Mend Scanner** - Automated SBOM Vulnerability Scanning System

## 2. Problem Statement

### What problem were you solving?
TPSRM lacked automated vulnerability scanning capabilities for supplier software:
- **No Security Scanning**: No systematic process to scan Software Bill of Materials (SBOM) files
- **Manual Vulnerability Assessment**: Security teams manually reviewed supplier dependencies
- **Blind Spots**: Critical and high-severity vulnerabilities went undetected
- **Delayed Risk Identification**: Security issues discovered late in assessment process
- **Inconsistent Coverage**: Ad-hoc scanning led to gaps in vulnerability detection

### Who was impacted?
- **TPSRM Security Team**: Lacked tools to systematically assess supplier software security
- **SBOM Assessors**: Needed automated scanning to validate supplier security posture
- **IBM Business Units**: Exposed to risk from vulnerable third-party software
- **Compliance Teams**: Required evidence of vulnerability scanning for audits

### What was the pain point?
Without automated scanning, TPSRM couldn't efficiently identify critical vulnerabilities in supplier software, creating security blind spots and compliance gaps.

## 3. Your Role
**Role**: Led and owned the project end-to-end

**Responsibilities**:
- Designed automated SBOM scanning architecture
- Integrated Mend (formerly WhiteSource) vulnerability scanning platform
- Implemented critical/high severity vulnerability detection
- Built SBOM file processing pipeline
- Deployed and maintained production scanning system
- Established scanning workflows and reporting

## 4. What You Built

### System Overview
Built an **automated vulnerability scanning system** that processes SBOM files and identifies critical and high-severity vulnerabilities in supplier software dependencies.

### Key Features
- **Automated SBOM Processing**: Ingests and parses Software Bill of Materials files
- **Vulnerability Detection**: Scans for known CVEs in dependencies
- **Severity Filtering**: Focuses on critical and high-severity vulnerabilities
- **Mend Integration**: Leverages Mend's comprehensive vulnerability database
- **Batch Processing**: Handles multiple SBOM files efficiently
- **Detailed Reporting**: Generates vulnerability reports with remediation guidance
- **API-Driven**: RESTful API for integration with other TPSRM tools

### Scanning Capabilities
- Dependency vulnerability analysis
- License compliance checking
- Outdated package detection
- Security advisory matching
- CVE database correlation

## 5. Tech Stack

### Languages
- Python

### Frameworks & Libraries
- FastAPI (API framework)
- Mend API SDK (vulnerability scanning)
- SBOM parsing libraries (CycloneDX, SPDX)

### Cloud & Infrastructure
- IBM Cloud
- Docker (containerization)

### Integrations
- Mend (WhiteSource) Platform
- ProcessUnity (TPSRM platform)
- Monday.com (workflow management)
- CVE databases (NVD, etc.)

## 6. Scale

### Usage Metrics
- **Scope**: All supplier SBOM files submitted to TPSRM
- **Users**: SBOM assessors and security team
- **Processing**: Automated scanning for every supplier assessment requiring SBOM review
- **Coverage**: 100% of SBOM files scanned for vulnerabilities
- **Focus**: Critical and high-severity vulnerabilities prioritized

## 7. Impact

### Quantified Results
- **100% SBOM Coverage**: Every submitted SBOM automatically scanned
- **Zero Manual Scanning**: Eliminated manual vulnerability research
- **Immediate Detection**: Critical vulnerabilities identified within minutes of SBOM submission
- **Comprehensive Database**: Access to Mend's extensive vulnerability intelligence
- **Consistent Standards**: Uniform vulnerability assessment across all suppliers

### Business Value
- Enhanced security posture through systematic vulnerability detection
- Faster risk identification in supplier software
- Compliance evidence for security audits
- Reduced exposure to vulnerable third-party dependencies
- Data-driven security decision-making

## 8. Key Engineering Decisions

### Mend Platform Selection
**Decision**: Chose Mend (WhiteSource) over building custom scanning solution
**Rationale**:
- Industry-leading vulnerability database
- Continuous updates with latest CVEs
- Proven accuracy and coverage
- Enterprise support and SLAs
- Reduced development and maintenance burden
- Faster time-to-value

### Critical/High Severity Focus
**Decision**: Prioritized critical and high-severity vulnerabilities
**Rationale**:
- Focus on highest-impact security issues
- Reduce noise from low-severity findings
- Enable faster assessment decisions
- Align with risk-based approach
- Manageable remediation scope for suppliers

### SBOM-First Approach
**Decision**: Built system around SBOM file processing
**Rationale**:
- SBOM files provide complete dependency inventory
- Standardized format (CycloneDX, SPDX)
- Supplier-provided data (no need for source code access)
- Fits existing TPSRM workflow
- Industry best practice for supply chain security

### API-Driven Architecture
**Decision**: Exposed scanning capabilities via RESTful API
**Rationale**:
- Enable integration with other TPSRM tools
- Support automated workflows (Monday Mend Integration)
- Flexible consumption by different clients
- Scalable and maintainable
- Future-proof for additional integrations

## 9. Challenges

### Technical Challenges
- **SBOM Format Variations**: Supporting multiple SBOM formats and versions
- **Parsing Complexity**: Handling malformed or incomplete SBOM files
- **API Rate Limits**: Managing Mend API quotas and throttling
- **Performance**: Optimizing scan time for large SBOM files
- **False Positives**: Filtering and validating vulnerability matches

### Integration Challenges
- **Mend API Learning Curve**: Understanding platform capabilities and limitations
- **Data Mapping**: Translating SBOM data to Mend's expected format
- **Error Handling**: Gracefully managing scan failures and timeouts
- **Result Interpretation**: Presenting vulnerability data in actionable format

### Organizational Challenges
- **Process Integration**: Incorporating scanning into existing SBOM assessment workflow
- **Assessor Training**: Educating team on interpreting scan results
- **Supplier Communication**: Explaining vulnerability findings to suppliers
- **Remediation Guidance**: Providing actionable recommendations

## 10. Outcome / Adoption

### Results
- **Full Production Deployment**: Scanning system operational for all SBOM assessments
- **Team Adoption**: SBOM assessors rely on automated scanning for every assessment
- **Improved Security Visibility**: Systematic detection of supplier software vulnerabilities
- **Faster Assessments**: Automated scanning accelerates SBOM review process
- **Enhanced Risk Management**: Data-driven decisions on supplier software security

### Expansion Beyond Initial Scope
- Initial vulnerability scanning expanded to include:
  - Integration with Monday Mend Integration for automated workflow
  - Historical vulnerability tracking and trending
  - Supplier comparison and benchmarking
  - License compliance scanning
  - Continuous monitoring capabilities

### Integration with Other Tools
- **Monday Mend Integration**: Automated SBOM upload and scan triggering
- **ProcessUnity**: Vulnerability findings stored in assessment records
- **AskTPSRM Slack Bot**: Notifications for critical findings

## 11. Before vs After

### Before
- **No Automated Scanning**: SBOM files reviewed manually without systematic vulnerability checks
- **Manual Research**: Assessors manually looked up CVEs for dependencies
- **Incomplete Coverage**: Only obvious or known vulnerabilities identified
- **Time-Consuming**: Hours spent researching individual dependencies
- **Inconsistent Standards**: Varying levels of thoroughness across assessors
- **Delayed Detection**: Vulnerabilities discovered late or missed entirely
- **No Historical Data**: No tracking of vulnerability trends over time

### After
- **100% Automated Scanning**: Every SBOM automatically scanned for vulnerabilities
- **Comprehensive Detection**: Mend's database identifies all known CVEs
- **Complete Coverage**: Critical and high-severity vulnerabilities systematically detected
- **Instant Results**: Scan results available within minutes
- **Consistent Standards**: Uniform vulnerability assessment across all suppliers
- **Immediate Detection**: Critical issues identified as soon as SBOM submitted
- **Historical Tracking**: Vulnerability trends and patterns analyzed over time
- **Data-Driven Decisions**: Objective security metrics inform risk assessments

---

**Project Status**: Production | **Team**: IBM TPSRM | **Platform**: Mend (WhiteSource)