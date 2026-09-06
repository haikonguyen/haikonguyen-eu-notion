import { fields } from '@keystatic/core';
import {
  block,
  type ContentComponent,
} from '@keystatic/core/content-components';
import { R2_BLOG_INLINE_PREFIX } from '@lib/r2';
import { uploadImageToR2 } from '@lib/r2/upload-image-to-r2';

const r2ImageBlock = block({
  label: 'R2 Image',
  description:
    'Inline CMS image. Drop a file to upload to Cloudflare R2 (when env is set), or paste a public R2 URL / object key.',
  schema: {
    src: fields.text({
      label: 'R2 URL or object key',
      description:
        'Public R2 URL, object key (e.g. blog/inline/photo.jpg), or any absolute image URL for migration.',
      validation: { isRequired: true },
    }),
    alt: fields.text({
      label: 'Alt text',
      validation: { isRequired: true },
    }),
    caption: fields.text({
      label: 'Caption',
    }),
  },
});

export const r2ImageMarkdocComponent = {
  ...r2ImageBlock,
  async handleFile(file: File) {
    if (!file.type.startsWith('image/')) {
      return false;
    }

    try {
      const uploaded = await uploadImageToR2({
        file,
        prefix: R2_BLOG_INLINE_PREFIX,
      });

      return {
        src: uploaded.publicUrl || uploaded.objectKey,
        alt: file.name.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' '),
        caption: '',
      };
    } catch (error) {
      console.error('R2 image upload failed:', error);
      return false;
    }
  },
} as ContentComponent;
