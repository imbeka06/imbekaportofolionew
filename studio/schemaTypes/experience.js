import {defineType, defineField} from 'sanity'

export const experience = defineType({
  name: 'experience',
  title: 'Professional Experience',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Job title', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'company', title: 'Company / Organisation', type: 'string'}),
    defineField({name: 'startDate', title: 'Start date', type: 'string', description: 'e.g. June 2025'}),
    defineField({name: 'endDate', title: 'End date', type: 'string', description: 'Leave empty if current — will show "Present"'}),
    defineField({name: 'highlights', title: 'Highlights / responsibilities', type: 'array', of: [{type: 'string'}], options: {layout: 'list'}}),
    defineField({name: 'order', title: 'Display order', type: 'number', initialValue: 100}),
  ],
  orderings: [{title: 'Display order', name: 'displayOrder', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'title', subtitle: 'company'}},
})
