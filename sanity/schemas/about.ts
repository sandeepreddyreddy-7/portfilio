import { defineField, defineType } from 'sanity'

export const about = defineType({
  name: 'about',
  title: 'About Page Content',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'About Content singleton',
      readOnly: true,
    }),
    defineField({
      name: 'paragraphs',
      title: 'Bio Paragraphs',
      type: 'array',
      of: [{ type: 'text' }],
      description: 'Each text block renders as a new paragraph.',
    }),
    defineField({
      name: 'valueCards',
      title: 'Value Cards',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Card Title' },
            { name: 'desc', type: 'text', title: 'Description' },
            { name: 'iconName', type: 'string', title: 'Lucide Icon Name (e.g. Layers, Zap)' },
            { name: 'color', type: 'string', title: 'Tailwind Color Class' },
          ],
        },
      ],
    }),
  ],
})
