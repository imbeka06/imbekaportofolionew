import {defineType, defineField} from 'sanity'

export const skillCategory = defineType({
  name: 'skillCategory',
  title: 'Skill Category',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Category title', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'skills', title: 'Skills', type: 'array', of: [{type: 'string'}], options: {layout: 'tags'}}),
    defineField({
      name: 'group',
      title: 'Group',
      type: 'string',
      options: {
        list: [
          {title: 'Recruiter (Technical Skills)', value: 'recruiter'},
          {title: 'Developer (Tech Stack)', value: 'developer'},
        ],
        layout: 'radio',
      },
      initialValue: 'recruiter',
    }),
    defineField({name: 'order', title: 'Display order', type: 'number', initialValue: 100}),
  ],
  orderings: [{title: 'Display order', name: 'displayOrder', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'title', subtitle: 'group'}},
})
