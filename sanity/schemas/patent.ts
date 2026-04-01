import { defineField, defineType } from 'sanity'

export const patent = defineType({
  name: 'patent',
  title: 'Patent',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Patent Title / Description',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'number',
      title: 'Application / Disclosure Number',
      type: 'string',
    }),
    defineField({
      name: 'status',
      title: 'Current Status (e.g. Filed, Review Completed)',
      type: 'string',
    }),
    defineField({
      name: 'date',
      title: 'Filing Date',
      type: 'string',
    }),
    defineField({
      name: 'entity',
      title: 'Entity (e.g. IBM)',
      type: 'string',
    }),
    defineField({
      name: 'desc',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'tech',
      title: 'Related Technology Tags',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'accent',
      title: 'Accent Hex Color',
      type: 'string',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
    }),
  ],
})
