# Monday Mend Integration

## 1. Project Name
**Monday Mend Integration** - Automated SBOM Workflow Orchestration System

## 2. Problem Statement

### What problem were you solving?
SBOM assessment workflow was entirely manual and error-prone:
- **Manual Data Entry**: SBOM assessors manually copied data from ProcessUnity to Monday.com board
- **Duplicate Work**: Information already in ProcessUnity had to be re-entered manually
- **Manual Mend Operations**: Assessors manually created applications, projects, uploaded SBOM files, and triggered scans
- **Time-Consuming Process**: Each SBOM assessment required 30+ minutes of manual setup
- **Error-Prone**: Manual data entry led to inconsistencies and mistakes
- **Multi-System Juggling**: Assessors switched between ProcessUnity, Monday.com, and Mend platforms
- **No Automation**: Every step from validation to scan results required manual intervention

### Who was impacted?
- **SBOM Assessors**: Spent majority of time on manual data entry instead of analysis
- **TPSRM Team**: Workflow bottlenecks delayed overall assessment completion
- **Suppliers**: Longer assessment times due to manual processing delays
- **Security Team**: Delayed vulnerability scan results impacted risk decisions

### What was the pain point?
SBOM assessors were overwhelmed with manual administrative tasks, preventing them from focusing on actual security analysis and assessment work.

## 3. Your Role
**Role**: Led and owned the project end-to-end

**Responsibilities**:
- Designed end-to-end automation architecture
- Built integrations with ProcessUnity, Monday.com, and Mend platforms
- Implemented automated workflow orchestration
- Created validation checkpoints for assessor oversight
- Deployed and maintained production automation system
- Established monitoring and error handling

## 4. What You Built

### System Overview
Built a **comprehensive workflow automation system** that orchestrates the entire SBOM assessment process from validation to scan completion with minimal human intervention.

### Key Features
- **Automated Data Sync**: Pulls supplier and assessment data from ProcessUnity
- **Monday.com Integration**: Automatically creates/updates Monday board items with assessment details
- **Mend Orchestration**: 
  - Creates applications if new
  - Adds projects to applications
  - Uploads SBOM files
  - Triggers vulnerability scans
  - Fetches and processes scan results
- **Validation Checkpoints**: Assessor validates details and attaches correct SBOM file
- **One-Click Automation**: Single "Ready to Load" action triggers entire workflow
- **Error Handling**: Comprehensive error detection and recovery mechanisms
- **Status Tracking**: Real-time status updates across all integrated systems
- **Result Processing**: Automated vulnerability report generation and distribution

### Workflow Automation
1. **Data Validation**: Assessor reviews ProcessUnity data
2. **SBOM Attachment**: Assessor attaches correct SBOM file
3. **Ready Signal**: Assessor marks field as "Ready to Load"
4. **Automated Execution**:
   - Create/update Monday.com board item
   - Create Mend application (if new)
   - Add project to application
   - Upload SBOM file to Mend
   - Trigger vulnerability scan
   - Monitor scan progress
   - Fetch and process results
   - Update all systems with findings

## 5. Tech Stack

### Languages
- Python

### Frameworks & Libraries
- FastAPI (API framework)
- Monday.com SDK (board management)
- Mend API SDK (vulnerability scanning)
- ProcessUnity API client

### Cloud & Infrastructure
- IBM Cloud
- Docker (containerization)
- Scheduled job processing

### Integrations
- **ProcessUnity**: TPSRM platform data source
- **Monday.com**: Workflow management and tracking
- **Mend Platform**: Vulnerability scanning and analysis
- **Internal APIs**: SmartGate ecosystem integration

## 6. Scale

### Usage Metrics
- **Users**: SBOM assessors (5-10 team members)
- **Scope**: All SBOM assessments requiring vulnerability scanning
- **Processing**: 100% automation of manual workflow steps
- **Volume**: Handles all supplier SBOM submissions
- **Time Savings**: 30+ minutes per assessment reduced to 2-3 minutes

## 7. Impact

### Quantified Results
- **90%+ Time Reduction**: Assessment setup time reduced from 30+ minutes to 2-3 minutes
- **100% Data Accuracy**: Eliminated manual data entry errors
- **Zero Manual Mend Operations**: Complete automation of Mend platform interactions
- **Instant Status Updates**: Real-time synchronization across all platforms
- **Enhanced Productivity**: Assessors focus on analysis instead of administrative tasks

### Business Value
- Faster SBOM assessment completion
- Improved data consistency across systems
- Enhanced assessor job satisfaction (focus on value-add work)
- Reduced operational overhead
- Scalable process for increasing SBOM volume
- Better audit trail and tracking

## 8. Key Engineering Decisions

### Validation-First Approach
**Decision**: Required assessor validation before triggering automation
**Rationale**:
- Maintain human oversight for critical decisions
- Ensure correct SBOM file attachment
- Validate ProcessUnity data accuracy
- Provide control point for assessor expertise
- Reduce risk of automated errors

### Multi-Platform Integration
**Decision**: Built native integrations with ProcessUnity, Monday.com, and Mend
**Rationale**:
- Eliminate manual system switching
- Ensure data consistency across platforms
- Enable end-to-end automation
- Provide single source of truth
- Reduce integration complexity for users

### Event-Driven Architecture
**Decision**: Trigger automation based on "Ready to Load" field status
**Rationale**:
- Clear signal for automation initiation
- Assessor maintains control over timing
- Simple and intuitive trigger mechanism
- Easy to monitor and debug
- Flexible for future workflow changes

### Comprehensive Error Handling
**Decision**: Built robust error detection and recovery mechanisms
**Rationale**:
- Handle API failures gracefully
- Provide clear error messages to assessors
- Enable manual intervention when needed
- Maintain system reliability
- Reduce support burden

### Atomic Operations
**Decision**: Designed workflow as series of atomic, recoverable operations
**Rationale**:
- Enable partial failure recovery
- Provide clear progress tracking
- Allow manual intervention at any step
- Simplify debugging and troubleshooting
- Maintain data integrity

## 9. Challenges

### Technical Challenges
- **API Rate Limits**: Managing quotas across multiple platforms (Monday.com, Mend)
- **Error Handling**: Gracefully handling failures in multi-step workflow
- **Data Mapping**: Translating data formats between ProcessUnity, Monday.com, and Mend
- **File Handling**: Reliable SBOM file upload and processing
- **State Management**: Tracking workflow progress across multiple systems

### Integration Challenges
- **API Differences**: Each platform had different authentication, rate limits, and data models
- **Timing Issues**: Coordinating operations across systems with different response times
- **Data Validation**: Ensuring data quality before automation execution
- **Version Compatibility**: Managing API changes across integrated platforms

### Organizational Challenges
- **Change Management**: Transitioning assessors from manual to automated workflow
- **Trust Building**: Establishing confidence in automated system reliability
- **Training**: Educating team on new validation-focused role
- **Process Refinement**: Iterating on workflow based on user feedback

## 10. Outcome / Adoption

### Results
- **Full Team Adoption**: All SBOM assessors use automated workflow
- **Dramatic Efficiency Gains**: 90%+ reduction in manual administrative time
- **Improved Job Satisfaction**: Assessors focus on security analysis instead of data entry
- **Enhanced Accuracy**: Eliminated manual data entry errors
- **Scalable Process**: System handles increasing SBOM assessment volume
- **Reliable Operation**: Consistent performance with minimal manual intervention

### Expansion Beyond Initial Scope
- Initial automation expanded to include:
  - Integration with AskTPSRM Slack Bot for notifications
  - Historical tracking and analytics
  - Bulk processing capabilities
  - Custom reporting and dashboards
  - Integration with other TPSRM automation tools

### Process Transformation
- **Role Evolution**: SBOM assessors transformed from data entry clerks to security analysts
- **Quality Improvement**: More time for thorough security analysis
- **Consistency**: Standardized process across all assessments
- **Scalability**: Prepared for increased SBOM assessment volume

## 11. Before vs After

### Before
- **Manual Data Entry**: Assessors spent 20+ minutes copying data from ProcessUnity to Monday.com
- **Manual Mend Operations**: 
  - Manually created applications in Mend
  - Manually added projects
  - Manually uploaded SBOM files
  - Manually triggered scans
  - Manually checked scan status
  - Manually retrieved results
- **System Switching**: Constant switching between ProcessUnity, Monday.com, and Mend
- **Error-Prone Process**: Manual data entry led to inconsistencies and mistakes
- **Time-Consuming**: 30+ minutes per assessment for administrative tasks
- **Limited Analysis Time**: Majority of time spent on manual tasks vs. security analysis

### After
- **Automated Data Sync**: System automatically pulls and synchronizes data across platforms
- **One-Click Automation**: Single "Ready to Load" action triggers entire workflow
- **Seamless Integration**: All systems updated automatically without manual intervention
- **Error-Free Processing**: Eliminated manual data entry errors
- **2-3 Minute Setup**: Reduced from 30+ minutes to validation and SBOM attachment only
- **Focus on Analysis**: 90%+ of time available for actual security assessment work
- **Consistent Process**: Standardized workflow across all assessments
- **Real-Time Tracking**: Automatic status updates and progress monitoring

---

**Project Status**: Production | **Team**: IBM TPSRM | **Integrations**: ProcessUnity + Monday.com + Mend