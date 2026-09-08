import { collection, config, fields, singleton } from '@keystatic/core';
import {
  aboutCvSingleton,
  homeAboutSingleton,
  servicesCollection,
} from './src/lib/keystatic/marketing-collections';
import {
  photographyItemsCollection,
  portfolioVlogsCollection,
  softwareProjectsCollection,
} from './src/lib/keystatic/portfolio-collections';
import { r2ImageMarkdocComponent } from './src/lib/keystatic/r2-image-component';
import { youtubeEmbedMarkdocComponent } from './src/lib/keystatic/youtube-embed-component';

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

const markdocComponents = {
  R2Image: r2ImageMarkdocComponent,
  YouTubeEmbed: youtubeEmbedMarkdocComponent,
};

export default config({
  storage: {
    kind: 'local',
  },
  collections: {
    posts: collection({
      label: 'Posts',
      slugField: 'title',
      path: 'content/posts/*',
      columns: ['publishedDate'],
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
          components: markdocComponents,
        }),
      },
    }),
    softwareProjects: softwareProjectsCollection,
    photographyItems: photographyItemsCollection,
    portfolioVlogs: portfolioVlogsCollection,
    services: servicesCollection,
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
          components: markdocComponents,
        }),
      },
    }),
    homeAbout: homeAboutSingleton,
    aboutCv: aboutCvSingleton,
  },
});
