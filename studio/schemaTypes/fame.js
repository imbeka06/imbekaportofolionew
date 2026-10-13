import {defineType, defineField} from 'sanity'

export const fame = defineType({
  name: 'fame',
  title: 'Hall of Fame',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'description', title: 'Description', type: 'text', rows: 4}),
    defineField({name: 'order', title: 'Display order', type: 'number', initialValue: 100}),
  ],
  orderings: [{title: 'Display order', name: 'displayOrder', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'title'}},
})
