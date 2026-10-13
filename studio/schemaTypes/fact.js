import {defineType, defineField} from 'sanity'

export const fact = defineType({
  name: 'fact',
  title: 'Fact Card',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'items', title: 'Items', type: 'array', of: [{type: 'string'}], options: {layout: 'list'}}),
    defineField({name: 'order', title: 'Display order', type: 'number', initialValue: 100}),
  ],
  orderings: [{title: 'Display order', name: 'displayOrder', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'title'}},
})
