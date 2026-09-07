import { collection, fields } from '@keystatic/core';

const imageUrlDescription =
  'Paste a public ImageKit/R2/Unsplash URL or R2 object key. Do not commit image binaries.';

export const softwareProjectsCollection = collection({
  label: 'Software projects',
  slugField: 'title',
  path: 'content/portfolio/software/*',
  columns: ['sortOrder'],
  schema: {
    title: fields.slug({ name: { label: 'Title' } }),
    summary: fields.text({
      label: 'Summary',
      multiline: true,
    }),
    longDescription: fields.text({
      label: 'Long description',
      multiline: true,
    }),
    coverImage: fields.text({
      label: 'Cover image URL or R2 key',
      description: imageUrlDescription,
    }),
    tags: fields.array(fields.text({ label: 'Tag' }), {
      label: 'Tags',
      itemLabel: (props) => props.value || 'Tag',
    }),
    tech: fields.array(fields.text({ label: 'Tech' }), {
      label: 'Tech stack',
      itemLabel: (props) => props.value || 'Tech',
    }),
    githubUrl: fields.text({
      label: 'GitHub URL',
      description: 'Optional',
    }),
    demoUrl: fields.text({
      label: 'Demo URL',
      description: 'Optional',
    }),
    sortOrder: fields.integer({
      label: 'Sort order',
      defaultValue: 0,
    }),
    featured: fields.checkbox({
      label: 'Featured',
      defaultValue: false,
    }),
  },
});

export const photographyItemsCollection = collection({
  label: 'Photography',
  slugField: 'title',
  path: 'content/portfolio/photography/*',
  columns: ['sortOrder'],
  schema: {
    title: fields.slug({ name: { label: 'Title' } }),
    alt: fields.text({ label: 'Alt text' }),
    image: fields.text({
      label: 'Image URL or R2 key',
      description: imageUrlDescription,
    }),
    width: fields.integer({
      label: 'Width (px)',
      defaultValue: 2070,
    }),
    height: fields.integer({
      label: 'Height (px)',
      defaultValue: 1380,
    }),
    sortOrder: fields.integer({
      label: 'Sort order',
      defaultValue: 0,
    }),
    featured: fields.checkbox({
      label: 'Featured',
      defaultValue: false,
    }),
  },
});

export const portfolioVlogsCollection = collection({
  label: 'Portfolio vlogs',
  slugField: 'title',
  path: 'content/portfolio/vlogs/*',
  columns: ['sortOrder'],
  schema: {
    title: fields.slug({ name: { label: 'Title' } }),
    description: fields.text({
      label: 'Description',
      multiline: true,
    }),
    youtubeUrl: fields.text({
      label: 'YouTube URL',
      description:
        'Full watch / youtu.be / embed / shorts URL (from youtube.com/@haikonguyen).',
    }),
    duration: fields.text({
      label: 'Duration',
      description: 'Optional display badge, e.g. 14:32',
    }),
    thumbnail: fields.text({
      label: 'Thumbnail URL or R2 key',
      description: `Optional override. Empty = YouTube thumbnail. ${imageUrlDescription}`,
    }),
    sortOrder: fields.integer({
      label: 'Sort order',
      defaultValue: 0,
    }),
    featured: fields.checkbox({
      label: 'Featured',
      defaultValue: false,
    }),
  },
});
