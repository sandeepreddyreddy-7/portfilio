import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const token = process.env.SANITY_API_WRITE_TOKEN
const apiVersion = '2024-03-31'

async function checkDocuments() {
  try {
    const url = `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?query=*[_type == "about"]`

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const data = await response.json()
    console.log('About documents found:', data.result.length)
    console.log(JSON.stringify(data.result, null, 2))

    if (data.result.length === 0) {
      console.log('\nNo About documents. Listing all document types:')
      const allUrl = `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?query=*[] | {_type, _id} | unique()`
      const allResponse = await fetch(allUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const allData = await allResponse.json()
      console.log(JSON.stringify(allData.result, null, 2))
    }

    process.exit(0)
  } catch (error) {
    console.error('Error:', error.message)
    process.exit(1)
  }
}

checkDocuments()
