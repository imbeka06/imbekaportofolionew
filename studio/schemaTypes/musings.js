import {defineType, defineField} from 'sanity'

export const musings = defineType({
  name: 'musings',
  title: 'Philosophy / Musing',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'body', title: 'Body', type: 'array', of: [{type: 'block'}]}),
    defineField({name: 'order', title: 'Display order', type: 'number', initialValue: 100}),
  ],
  orderings: [{title: 'Display order', name: 'displayOrder', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'title'}},
})
