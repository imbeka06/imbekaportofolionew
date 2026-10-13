import {defineType, defineField} from 'sanity'

export const education = defineType({
  name: 'education',
  title: 'Education',
  type: 'document',
  fields: [
    defineField({name: 'degree', title: 'Degree / Qualification', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'institution', title: 'Institution', type: 'string'}),
    defineField({name: 'startDate', title: 'Start date', type: 'string', description: 'e.g. 2022'}),
    defineField({name: 'endDate', title: 'End date', type: 'string', description: 'Leave empty if current — will show "Present"'}),
    defineField({name: 'notes', title: 'Activities / notes', type: 'text', rows: 3}),
    defineField({name: 'order', title: 'Display order', type: 'number', initialValue: 100}),
  ],
  orderings: [{title: 'Display order', name: 'displayOrder', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'degree', subtitle: 'institution'}},
})
