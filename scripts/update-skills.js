import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const token = process.env.SANITY_API_WRITE_TOKEN
const apiVersion = '2024-03-31'

const skillCategories = [
  {
    label: 'Languages',
    icon: '💻',
    color: 'from-blue-500 to-blue-600',
    accent: '#3B82F6',
    tags: ['Python', 'JavaScript', 'TypeScript', 'Java', 'Bash', 'SQL'],
    order: 1,
  },
  {
    label: 'AI / GenAI',
    icon: '🤖',
    color: 'from-purple-500 to-purple-600',
    accent: '#A855F7',
    tags: [
      'LLMs (Open-Source & Proprietary)',
      'Multi-Agent Systems',
      'RAG',
      'Prompt Engineering',
      'Agentic AI',
      'watsonx Assistant',
      'watsonx.ai',
      'watsonx Orchestrate',
      'Watson Discovery',
    ],
    order: 4,
  },
  {
    label: 'Backend',
    icon: '⚙️',
    color: 'from-green-500 to-green-600',
    accent: '#10B981',
    tags: [
      'FastAPI',
      'Flask',
      'REST APIs',
      'Spring Boot',
      'Node.js',
      'GraphQL',
      'gRPC',
      'Microservices',
      'Event-Driven Architecture',
    ],
    order: 3,
  },
  {
    label: 'Frontend',
    icon: '🎨',
    color: 'from-pink-500 to-pink-600',
    accent: '#EC4899',
    tags: ['React', 'Next.js', 'Angular', 'TypeScript', 'HTML5', 'CSS3', 'Bootstrap'],
    order: 2,
  },
  {
    label: 'Cloud & DevOps',
    icon: '☁️',
    color: 'from-cyan-500 to-cyan-600',
    accent: '#06B6D4',
    tags: [
      'IBM Cloud',
      'Docker',
      'OpenShift',
      'Kubernetes',
      'Serverless',
      'CI/CD (Jenkins, GitHub Actions)',
      'Infrastructure as Code',
      'NGINX',
      'Container Registry',
    ],
    order: 5,
  },
  {
    label: 'Security',
    icon: '🔒',
    color: 'from-red-500 to-red-600',
    accent: '#EF4444',
    tags: [
      'OWASP Top 10',
      'DevSecOps',
      'SAST',
      'DAST',
      'Software Bill of Materials (SBOM)',
      'Secrets Detection',
      'Zero Trust',
      'Vulnerability Management',
    ],
    order: 6,
  },
  {
    label: 'GRC & Risk',
    icon: '📋',
    color: 'from-amber-500 to-amber-600',
    accent: '#F59E0B',
    tags: [
      'Third-Party Risk Management (TPRM)',
      'GRC (ProcessUnity)',
      'Vendor Risk Assessment',
      'SOX',
      'PCI-DSS',
      'FFIEC',
      'SSO/SAML',
      'Secure SDLC',
    ],
    order: 7,
  },
  {
    label: 'Databases',
    icon: '🗄️',
    color: 'from-indigo-500 to-indigo-600',
    accent: '#6366F1',
    tags: [
      'NoSQL (Cloudant, MongoDB)',
      'SQL (PostgreSQL, MySQL)',
      'Object Storage (S3/B2)',
      'Redis / In-Memory Caching',
    ],
    order: 8,
  },
  {
    label: 'Tools & Testing',
    icon: '🧪',
    color: 'from-orange-500 to-orange-600',
    accent: '#F97316',
    tags: [
      'SonarQube',
      'JUnit',
      'Postman',
      'Swagger/OpenAPI',
      'Maven',
      'Gradle',
      'Git',
      'Slack SDK',
      'ZenHub',
      'Monday',
      'Mend',
      'Twistlock',
    ],
    order: 9,
  },
]

async function updateSkills() {
  try {
    console.log('Fetching existing skills...')
    const queryUrl = `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?query=*[_type == "skill"] | order(order asc)`

    const queryResponse = await fetch(queryUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const queryData = await queryResponse.json()
    const existingSkills = queryData.result

    console.log(`Found ${existingSkills.length} existing skill categories`)

    const updateUrl = `https://${projectId}.api.sanity.io/v${apiVersion}/data/mutate/${dataset}`

    const mutations = skillCategories.map((skill, idx) => {
      const existing = existingSkills[idx]
      if (existing) {
        return {
          patch: {
            id: existing._id,
            set: skill,
          },
        }
      } else {
        return {
          create: {
            _type: 'skill',
            ...skill,
          },
        }
      }
    })

    console.log(`Preparing to update/create ${mutations.length} skill categories...`)

    const updateResponse = await fetch(updateUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ mutations }),
    })

    const updateData = await updateResponse.json()

    if (!updateResponse.ok) {
      throw new Error(`Update failed: ${JSON.stringify(updateData)}`)
    }

    console.log('✅ Successfully updated skills!')
    console.log('\nSkill Categories:')
    skillCategories.forEach((skill, i) => {
      console.log(`${i + 1}. ${skill.icon} ${skill.label} (${skill.tags.length} skills)`)
    })

    process.exit(0)
  } catch (error) {
    console.error('❌ Error updating skills:', error.message)
    process.exit(1)
  }
}

updateSkills()
