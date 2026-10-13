import {defineType, defineField} from 'sanity'

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'technologies', title: 'Technologies', type: 'array', of: [{type: 'string'}], options: {layout: 'tags'}}),
    defineField({name: 'description', title: 'Description', type: 'text', rows: 5, validation: (rule) => rule.required()}),
    defineField({name: 'githubUrl', title: 'GitHub URL', type: 'url'}),
    defineField({name: 'liveUrl', title: 'Live project URL', type: 'url'}),
    defineField({name: 'videoUrl', title: 'Demo video URL', type: 'url', description: 'YouTube, Vimeo, or a direct .mp4 URL — shown as "Watch Demo"'}),
    defineField({name: 'videoFile', title: 'Demo video file', type: 'file', description: 'Upload an .mp4 — shown as "Watch Demo"'}),
    defineField({name: 'featured', title: 'Featured', type: 'boolean', initialValue: true}),
    defineField({name: 'order', title: 'Display order', type: 'number', initialValue: 100}),
  ],
  orderings: [{title: 'Display order', name: 'displayOrder', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'title', subtitle: 'description'}},
})
