import {defineType, defineField} from 'sanity'

export const photo = defineType({
  name: 'photo',
  title: 'Photo',
  type: 'document',
  fields: [
    defineField({name: 'image', title: 'Image', type: 'image', options: {hotspot: true}, validation: (rule) => rule.required()}),
    defineField({name: 'caption', title: 'Caption', type: 'string'}),
    defineField({name: 'alt', title: 'Alt text', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'order', title: 'Display order', type: 'number', initialValue: 100}),
  ],
  orderings: [{title: 'Display order', name: 'displayOrder', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'caption', media: 'image'}},
})
