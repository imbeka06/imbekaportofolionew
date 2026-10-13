import {defineType, defineField} from 'sanity'

export const post = defineType({
  name: 'post',
  title: 'Post / Writing',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'slug', title: 'Slug', type: 'slug', options: {source: 'title'}, validation: (rule) => rule.required()}),
    defineField({name: 'excerpt', title: 'Excerpt', type: 'text', rows: 3}),
    defineField({name: 'publishedAt', title: 'Published at', type: 'datetime', initialValue: () => new Date().toISOString()}),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Blog', value: 'blog'},
          {title: 'Writing', value: 'writing'},
        ],
        layout: 'radio',
      },
      initialValue: 'blog',
    }),
    defineField({name: 'externalUrl', title: 'External link (e.g. OneNote)', type: 'url', description: 'If set, the card opens this link instead of the in-page reader'}),
    defineField({name: 'body', title: 'Body', type: 'array', of: [{type: 'block'}]}),
  ],
  preview: {select: {title: 'title', subtitle: 'publishedAt'}},
})
