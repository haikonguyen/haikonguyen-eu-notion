import { collection, config, fields, singleton } from '@keystatic/core';

const markdocOptions = {
  bold: true,
  italic: true,
  link: true,
  heading: [1, 2, 3, 4] as const,
  blockquote: true,
  code: true,
  codeBlock: true,
  orderedList: true,
  unorderedList: true,
  divider: true,
  image: false,
} as const;

export default config({
  storage: {
    kind: 'local',
  },
  collections: {
    posts: collection({
      label: 'Posts',
      slugField: 'title',
      path: 'content/posts/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        publishedDate: fields.date({ label: 'Published date' }),
        excerpt: fields.text({
          label: 'Excerpt',
          multiline: true,
        }),
        tags: fields.array(fields.text({ label: 'Tag' }), {
          label: 'Tags',
          itemLabel: (props) => props.value || 'Tag',
        }),
        authorName: fields.text({
          label: 'Author name',
          defaultValue: 'Haiko Nguyen',
        }),
        coverImage: fields.text({
          label: 'Cover image (R2 URL or object key)',
          description:
            'Paste a public R2 URL or object key (e.g. blog/covers/my-cover.jpg). Do not commit image binaries.',
        }),
        content: fields.markdoc({
          label: 'Content',
          options: markdocOptions,
        }),
      },
    }),
  },
  singletons: {
    aboutStory: singleton({
      label: 'About Story',
      path: 'content/about-story',
      format: { contentField: 'content' },
      schema: {
        content: fields.markdoc({
          label: 'Story',
          options: markdocOptions,
        }),
      },
    }),
  },
});
