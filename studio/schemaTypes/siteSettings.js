import {defineType, defineField} from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  fields: [
    defineField({name: 'name', title: 'Display name', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'professionalTagline', title: 'Professional tagline', type: 'string'}),
    defineField({name: 'developerTagline', title: 'Developer tagline', type: 'string'}),
    defineField({name: 'about', title: 'About me / adventure introduction', type: 'text', rows: 5}),
    defineField({name: 'email', title: 'Email', type: 'string'}),
    defineField({name: 'phone', title: 'Phone', type: 'string'}),
    defineField({name: 'githubUrl', title: 'GitHub URL', type: 'url'}),
    defineField({name: 'linkedinUrl', title: 'LinkedIn URL', type: 'url'}),
    defineField({name: 'instagramUrl', title: 'Instagram URL', type: 'url'}),
  ],
  preview: {prepare: () => ({title: 'Portfolio settings'})},
})
