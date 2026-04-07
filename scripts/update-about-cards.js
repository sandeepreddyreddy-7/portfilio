import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const token = process.env.SANITY_API_WRITE_TOKEN
const apiVersion = '2024-03-31'

const valueCards = [
  {
    title: 'Systems Thinking',
    desc: 'Designed 10+ distributed TPSRM services at IBM — owned architecture decisions end-to-end across security, cloud, GRC, and AI layers.',
    iconName: 'Layers',
    color: 'text-blue-400',
  },
  {
    title: 'Secure by Design',
    desc: 'OWASP Top 10 enforcement, SAST/DAST pipelines, SBOM scanning, Gitleaks secrets detection, Zero Trust IAM — security is not a phase, it\'s woven into every architectural decision from the first sketch.',
    iconName: 'Shield',
    color: 'text-red-400',
  },
  {
    title: 'AI-Native Builder',
    desc: 'Shipped production Generative AI systems: multi-agent frameworks, RAG pipelines, conversational assistants, and LLM validation engines — at enterprise scale, not just prototypes.',
    iconName: 'Zap',
    color: 'text-yellow-400',
  },
  {
    title: 'Ownership Mindset',
    desc: 'From initial system design to production deployment to compliance review — I own outcomes, not just tickets.',
    iconName: 'Target',
    color: 'text-purple-400',
  },
  {
    title: 'Enterprise Design Thinking',
    desc: 'Balance scalability, compliance, and security across distributed systems. Every decision accounts for regulatory constraints, operational excellence, and team velocity — designed for Fortune 500 scale.',
    iconName: 'Building2',
    color: 'text-cyan-400',
  },
  {
    title: 'Growth Through Systems',
    desc: 'Drive continuous improvement by learning from failures, scaling successful patterns, and building systems that enable teams to move faster without compromising security or reliability.',
    iconName: 'TrendingUp',
    color: 'text-green-400',
  },
]

async function updateAboutCards() {
  try {
    console.log('Updating value cards in Sanity...')
    const updateUrl = `https://${projectId}.api.sanity.io/v${apiVersion}/data/mutate/${dataset}`

    const updateResponse = await fetch(updateUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        mutations: [
          {
            patch: {
              id: 'site-about',
              set: {
                valueCards,
              },
            },
          },
        ],
      }),
    })

    const updateData = await updateResponse.json()

    if (!updateResponse.ok) {
      throw new Error(`Update failed: ${JSON.stringify(updateData)}`)
    }

    console.log('✅ Successfully updated About cards!')
    console.log(`Updated ${valueCards.length} cards`)
    console.log('\nCards:')
    valueCards.forEach((card, i) => {
      console.log(`${i + 1}. ${card.title}`)
    })
    process.exit(0)
  } catch (error) {
    console.error('❌ Error updating cards:', error.message)
    process.exit(1)
  }
}

updateAboutCards()
