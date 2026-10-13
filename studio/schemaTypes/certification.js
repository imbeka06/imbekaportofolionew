import {defineType, defineField} from 'sanity'

export const certification = defineType({
  name: 'certification',
  title: 'Certification',
  type: 'document',
  fields: [
    defineField({name: 'name', title: 'Certification name', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'issuer', title: 'Issuing organisation', type: 'string'}),
    defineField({name: 'date', title: 'Date awarded', type: 'string', description: 'e.g. March 2024'}),
    defineField({name: 'credentialUrl', title: 'Credential URL', type: 'url'}),
    defineField({name: 'order', title: 'Display order', type: 'number', initialValue: 100}),
  ],
  orderings: [{title: 'Display order', name: 'displayOrder', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'name', subtitle: 'issuer'}},
})
