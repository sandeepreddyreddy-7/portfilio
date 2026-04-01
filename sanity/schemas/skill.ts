import { defineField, defineType } from 'sanity'

export const skill = defineType({
  name: 'skill',
  title: 'Skill Category',
  type: 'document',
  fields: [
    defineField({
      name: 'label',
      title: 'Category Label (e.g., AI / GenAI)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Emoji Icon',
      type: 'string',
    }),
    defineField({
      name: 'color',
      title: 'Background Gradient Tailwind Class',
      type: 'string',
    }),
    defineField({
      name: 'accent',
      title: 'Accent Hex Color',
      type: 'string',
    }),
    defineField({
      name: 'tags',
      title: 'Technologies',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
    }),
  ],
  preview: {
    select: {
      title: 'label',
      subtitle: 'icon',
    },
  },
})
