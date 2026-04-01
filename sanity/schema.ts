import { type SchemaTypeDefinition } from 'sanity'
import { project } from './schemas/project'
import { experience } from './schemas/experience'
import { skill } from './schemas/skill'
import { about } from './schemas/about'
import { patent } from './schemas/patent'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [project, experience, skill, about, patent],
}
