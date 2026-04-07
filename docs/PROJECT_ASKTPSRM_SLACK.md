# AskTPSRM Slack Bot

## 1. Project Name
**AskTPSRM Slack Bot** - AI-Powered Chatbot for TPSRM Request Status & Automated Notifications

## 2. Problem Statement

### What problem were you solving?
TPSRM stakeholders faced challenges accessing information about their requests:
- **Limited Availability**: Support only available during business hours
- **Long Wait Times**: Delays in getting status updates on assessments and requests
- **Manual Status Checks**: Users had to contact TPSRM team directly for updates
- **Missed Critical Updates**: No proactive notifications about findings in supplier requests
- **Inefficient Support Process**: TPSRM team overwhelmed with repetitive status inquiries

### Who was impacted?
- **Requestors**: IBM employees submitting supplier risk questionnaires (SRQs)
- **Business Units**: Teams waiting for assessment completion to onboard vendors
- **TPSRM Support Team**: Spent significant time answering routine status questions
- **Security Teams**: Needed timely alerts about security findings

### What was the pain point?
Users lacked self-service access to request status information and weren't proactively notified of critical findings, creating support bottlenecks and delayed responses to security issues.

## 3. Your Role
**Role**: Led and owned the project end-to-end

**Responsibilities**:
- Designed chatbot architecture and conversation flows
- Integrated watsonx Assistant for natural language processing
- Built Slack integration for seamless user experience
- Implemented automated notification system for findings
- Deployed and maintained production bot
- Planned incremental feature releases

## 4. What You Built

### System Overview
Built an **AI-powered Slack chatbot** that provides 24/7 self-service access to TPSRM request statuses and sends automated notifications for security findings.

### Key Features
- **Instant Status Lookup**: Users query request/assessment status by SRQ ID
- **Natural Language Interface**: Conversational AI understands user intent
- **24/7 Availability**: Self-service access anytime, anywhere
- **Automated Slack Notifications**: Proactive alerts when findings are detected in supplier requests
- **Multi-Channel Support**: 
  - Direct Slack messages
  - Channel integrations
  - Web-based chat widget on TPSRM w3 page
- **Incremental Q&A Features**: Expanding knowledge base with additional capabilities

### Integration Points
- **Slack Workspace**: Native Slack bot integration
- **TPSRM w3 Page**: Chat icon in bottom-right corner for web access
- **ProcessUnity**: Real-time data sync for request statuses
- **Finding Detection System**: Automated monitoring of supplier assessments

## 5. Tech Stack

### Languages
- Python

### Frameworks & Libraries
- FastAPI (API backend)
- watsonx Assistant (Conversational AI platform)
- Slack SDK (Slack integration)

### Cloud & Infrastructure
- IBM Cloud
- Docker (containerization)

### Integrations
- watsonx Assistant API
- Slack API
- ProcessUnity (TPSRM platform)
- Keyword Detection Service (for findings)
- AI Categorization Service

## 6. Scale

### Usage Metrics
- **Users**: All IBM employees submitting TPSRM requests (organization-wide)
- **Availability**: 24/7 self-service access
- **Channels**: Slack + Web widget
- **Scope**: Internal IBM TPSRM stakeholders
- **Notifications**: Automated alerts for all supplier requests with findings

## 7. Impact

### Quantified Results
- **24/7 Availability**: Eliminated wait times for status inquiries
- **Reduced Support Load**: Deflected routine status questions from TPSRM team
- **Instant Responses**: Status information provided in seconds vs. hours/days
- **Proactive Alerting**: Automated notifications ensure timely awareness of findings
- **Improved User Experience**: Self-service empowerment for requestors

### Business Value
- Faster decision-making with instant status access
- Enhanced security posture through proactive finding notifications
- Improved TPSRM team productivity (focus on complex tasks)
- Better stakeholder satisfaction with self-service capabilities
- Reduced time-to-resolution for security issues

## 8. Key Engineering Decisions

### watsonx Assistant Platform
**Decision**: Built on watsonx Assistant instead of custom NLP solution
**Rationale**:
- Enterprise-grade conversational AI capabilities
- Pre-built NLP models reduce development time
- Easy integration with IBM ecosystem
- Scalable and maintainable platform
- Built-in analytics and monitoring

### Slack-First Approach
**Decision**: Prioritized Slack integration over other channels
**Rationale**:
- Slack is primary communication platform at IBM
- Users already in Slack workflow (no context switching)
- Rich notification capabilities
- Easy bot discovery and adoption
- Native threading and conversation management

### Dual-Access Model
**Decision**: Provided both Slack bot and web widget access
**Rationale**:
- Slack for internal users in workspace
- Web widget for broader accessibility
- Consistent experience across channels
- Flexibility for different user preferences

### Automated Notification System
**Decision**: Integrated proactive notifications alongside reactive Q&A
**Rationale**:
- Push critical information rather than waiting for users to ask
- Reduce time-to-awareness for security findings
- Complement self-service with proactive engagement
- Leverage existing finding detection infrastructure

### Incremental Feature Rollout
**Decision**: Launched with core status lookup, planned additional Q&A features
**Rationale**:
- Deliver immediate value with MVP
- Gather user feedback before expanding
- Reduce initial complexity and risk
- Iterate based on actual usage patterns

## 9. Challenges

### Technical Challenges
- **Intent Recognition**: Training AI to understand diverse ways users ask about status
- **Data Synchronization**: Ensuring real-time accuracy of status information
- **Notification Timing**: Determining optimal timing for automated alerts
- **Error Handling**: Gracefully handling invalid SRQ IDs or system errors
- **Performance**: Maintaining fast response times under load

### Organizational Challenges
- **User Adoption**: Encouraging users to try chatbot instead of contacting support
- **Trust Building**: Establishing confidence in AI-provided information
- **Change Management**: Shifting from human support to self-service model
- **Privacy Concerns**: Ensuring appropriate access controls for sensitive data

### Integration Challenges
- **ProcessUnity API**: Working with existing TPSRM platform APIs
- **Slack Permissions**: Navigating enterprise Slack workspace policies
- **Multi-System Coordination**: Synchronizing data across multiple backend systems

## 10. Outcome / Adoption

### Results
- **Successful Launch**: Deployed to production with positive user feedback
- **Growing Adoption**: Increasing usage as users discover self-service capabilities
- **Support Deflection**: Measurable reduction in status inquiry tickets
- **Proactive Engagement**: Automated notifications reaching all relevant stakeholders
- **Platform for Expansion**: Foundation for additional TPSRM automation features

### Expansion Beyond Initial Scope
- Initial focus on status lookup expanded to include:
  - Additional Q&A capabilities (incrementally released)
  - Integration with other TPSRM tools (SmartGate, TC Scout)
  - Enhanced notification types (not just findings)
  - Analytics and reporting on common questions
  - Potential for workflow automation triggers

### Future Roadmap
- Expand Q&A knowledge base
- Add assessment guidance and best practices
- Enable workflow actions (not just information retrieval)
- Integrate with additional TPSRM systems
- Provide personalized recommendations

## 11. Before vs After

### Before
- **Limited Access**: Support only during business hours
- **Manual Inquiries**: Users emailed or called TPSRM team for status updates
- **Long Wait Times**: Hours or days to get simple status information
- **Reactive Notifications**: Users had to check for findings manually
- **Support Overload**: TPSRM team spent significant time on repetitive questions
- **No Self-Service**: Complete dependency on human support

### After
- **24/7 Availability**: Instant access to status information anytime
- **Self-Service**: Users query chatbot directly via Slack or web
- **Instant Responses**: Status information provided in seconds
- **Proactive Notifications**: Automated Slack alerts for findings in supplier requests
- **Support Efficiency**: TPSRM team freed from routine status inquiries
- **Empowered Users**: Self-service capabilities with conversational AI interface
- **Scalable Support**: Bot handles unlimited concurrent users without degradation

---

**Project Status**: Production | **Team**: IBM TPSRM | **Platform**: Slack + Web Widget