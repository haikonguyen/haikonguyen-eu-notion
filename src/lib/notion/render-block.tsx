import { NotionBlock } from '@app-types/notion';
import { ContentBlockTypes } from '@enums/contentBlockTypes';
import { NotionText } from '@features/blog';
import { Image } from '@imagekit/next';
import type {
  ImageBlockObjectResponse,
  ListBlockChildrenResponse,
} from '@notionhq/client/build/src/api-endpoints';
import { Fragment } from 'react';

const isImageBlock = (
  block: NotionBlock,
): block is ImageBlockObjectResponse => {
  return block.type === 'image';
};

const getImageSource = (block: NotionBlock): string => {
  if (!isImageBlock(block)) {
    return '/placeholder.jpg';
  }

  const { image } = block;
  if (image.type === 'external') {
    return image.external.url;
  }
  if (image.type === 'file') {
    return image.file.url;
  }
  return '/placeholder.jpg';
};

export const renderBlock = (block: NotionBlock) => {
  const { type, id } = block;
  const richTextValue = block[type]?.rich_text;
  const caption = block[type]?.caption?.[0]?.plain_text;

  switch (type) {
    case ContentBlockTypes.Paragraph:
      return (
        <div className="my-4 sm:my-5">
          {richTextValue?.length > 0 ? (
            <p className="text-base font-normal leading-relaxed text-zinc-300 sm:text-lg sm:leading-[1.8]">
              <NotionText textContentBlocks={richTextValue} />
            </p>
          ) : (
            <div className="h-3" />
          )}
        </div>
      );

    case ContentBlockTypes.Heading1:
      return (
        <h2 className="mt-10 mb-4 text-2xl font-bold tracking-tight text-white sm:mt-12 sm:text-3xl md:text-3xl">
          <NotionText textContentBlocks={richTextValue} />
        </h2>
      );

    case ContentBlockTypes.Heading2:
      return (
        <h3 className="mt-8 mb-3 text-xl font-bold tracking-tight text-white sm:mt-10 sm:mb-4 sm:text-2xl md:text-2xl">
          <NotionText textContentBlocks={richTextValue} />
        </h3>
      );

    case ContentBlockTypes.Heading3:
      return (
        <h4 className="mt-6 mb-2 text-lg font-semibold tracking-tight text-white sm:mt-8 sm:mb-3 sm:text-xl md:text-xl">
          <NotionText textContentBlocks={richTextValue} />
        </h4>
      );

    case ContentBlockTypes.BulletedListItem:
    case ContentBlockTypes.NumberedListItem:
      return (
        <li className="my-1.5 ml-6 list-disc text-base leading-relaxed text-zinc-300 sm:text-lg">
          <NotionText textContentBlocks={richTextValue} />
        </li>
      );

    case ContentBlockTypes.Todo:
      return (
        <div className="my-2 flex items-center gap-3">
          <input
            type="checkbox"
            id={id}
            defaultChecked={block[type].checked}
            className="h-5 w-5 rounded border-white/10 bg-white/5 text-primary focus:ring-primary focus:ring-offset-black"
          />
          <label htmlFor={id} className="text-base text-zinc-300 sm:text-lg">
            <NotionText textContentBlocks={richTextValue} />
          </label>
        </div>
      );

    case ContentBlockTypes.Toggle: {
      const toggleBlock = block[type] as {
        children?: ListBlockChildrenResponse;
      };
      return (
        <details className="group my-6 rounded-3xl border border-white/10 bg-white/5 p-6 transition-all hover:bg-white/[0.08]">
          <summary className="flex cursor-pointer list-none items-center gap-4 text-lg font-bold text-white">
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-primary/10 text-primary transition-transform group-open:rotate-90">
              ▶
            </div>
            <NotionText textContentBlocks={richTextValue} />
          </summary>
          <div className="mt-6 ml-10 space-y-4">
            {(toggleBlock?.children?.results ?? []).map((childBlock) => (
              <Fragment key={(childBlock as NotionBlock).id}>
                {renderBlock(childBlock as NotionBlock)}
              </Fragment>
            ))}
          </div>
        </details>
      );
    }

    case ContentBlockTypes.Image: {
      const imageSrc = getImageSource(block);
      if (!imageSrc || imageSrc === '/placeholder.jpg') return null;

      return (
        <figure className="group my-8 sm:my-12">
          <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl transition-all duration-700 group-hover:shadow-primary/5 sm:rounded-3xl">
            <Image
              src={imageSrc}
              alt={caption || 'Blog image'}
              width={1200}
              height={800}
              className="object-cover transition-transform duration-1000 group-hover:scale-[1.02]"
            />
          </div>
          {caption && (
            <figcaption className="mt-3 text-center text-xs font-medium text-zinc-400 italic tracking-wide sm:text-sm">
              {caption}
            </figcaption>
          )}
        </figure>
      );
    }

    case ContentBlockTypes.Divider:
      return <hr className="my-10 border-white/10 sm:my-12" />;

    case ContentBlockTypes.Quote:
      return (
        <blockquote className="my-8 rounded-r-2xl border-l-2 border-primary/80 bg-white/[0.03] py-3 pr-4 pl-5 text-base text-zinc-200 italic leading-relaxed shadow-lg sm:border-l-4 sm:pl-6 sm:text-lg">
          <p className="relative z-10">
            <NotionText textContentBlocks={richTextValue} />
          </p>
        </blockquote>
      );

    case ContentBlockTypes.Code: {
      const code = block[type].rich_text[0]?.plain_text;
      const language = block[type].language;
      return (
        <div className="my-8 overflow-x-auto rounded-2xl border border-white/10 bg-[#0d1117] p-5 font-mono text-xs leading-relaxed shadow-xl sm:p-6 sm:text-sm">
          <div className="mb-4 flex items-center justify-between opacity-40">
            <div className="flex gap-2">
              <div className="h-2.5 w-2.5 rounded-full bg-red-500/50" />
              <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/50" />
              <div className="h-2.5 w-2.5 rounded-full bg-green-500/50" />
            </div>
            <span className="font-bold text-[10px] uppercase tracking-widest">
              {language}
            </span>
          </div>
          <pre className="text-zinc-300">
            <code>{code}</code>
          </pre>
        </div>
      );
    }

    default:
      return null;
  }
};
