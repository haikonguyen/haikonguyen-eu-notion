import { fields } from '@keystatic/core';
import { block } from '@keystatic/core/content-components';
import { getYoutubeId, getYoutubeThumbnailUrl } from '@lib/youtube';
import { createElement } from 'react';

export const youtubeEmbedMarkdocComponent = block({
  label: 'YouTube Embed',
  description:
    'Paste a YouTube watch, share, Shorts, or embed URL. Renders as a responsive player on the post page.',
  schema: {
    url: fields.text({
      label: 'YouTube URL',
      description:
        'Supports youtube.com/watch, youtu.be, /embed/, and /shorts/ links (optional &t= start time).',
      validation: { isRequired: true },
    }),
    title: fields.text({
      label: 'Title',
      description: 'Accessible iframe title (recommended).',
    }),
    caption: fields.text({
      label: 'Caption',
    }),
  },
  ContentView: ({ value }) => {
    const youtubeId = value.url ? getYoutubeId(value.url) : null;
    if (!youtubeId) {
      return createElement(
        'p',
        { style: { margin: 0, opacity: 0.7 } },
        value.url || 'Paste a YouTube URL',
      );
    }

    return createElement('img', {
      src: getYoutubeThumbnailUrl(youtubeId),
      alt: value.title || 'YouTube thumbnail',
      style: {
        display: 'block',
        width: '100%',
        maxWidth: 480,
        aspectRatio: '16 / 9',
        objectFit: 'cover',
        borderRadius: 8,
      },
    });
  },
});
