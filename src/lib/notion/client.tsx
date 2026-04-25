import { Client } from '@notionhq/client';
import { NotionText } from '@features/blog';
import { Fragment } from 'react';
import { NestedChildBlock, NotionBlock } from '@app-types/notion';
import { Image } from '@imagekit/next';
import { ContentBlockTypes } from '@enums/contentBlockTypes';
import { cn } from '@lib/utils';
import type {
  ImageBlockObjectResponse,
  QueryDatabaseResponse,
  GetPageResponse,
  ListBlockChildrenResponse,
} from '@notionhq/client/build/src/api-endpoints';

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

export const getDatabase = async (
  databaseId: string,
): Promise<QueryDatabaseResponse> => {
  const allResults: QueryDatabaseResponse['results'] = [];
  let start_cursor: string | undefined;
  let has_more = true;

  while (has_more) {
    const response = await notion.databases.query({
      database_id: databaseId,
      ...(start_cursor ? { start_cursor } : {}),
    });
    allResults.push(...response.results);
    has_more = response.has_more;
    start_cursor = response.next_cursor ?? undefined;
  }

  return {
    object: 'list',
    results: allResults,
    has_more: false,
    next_cursor: null,
  } as QueryDatabaseResponse;
};

export const getPage = async (pageId: string): Promise<GetPageResponse> => {
  return notion.pages.retrieve({ page_id: pageId });
};

export const getBlocks = async (
  blockId: string,
): Promise<ListBlockChildrenResponse> => {
  const allResults: ListBlockChildrenResponse['results'] = [];
  let start_cursor: string | undefined;
  let has_more = true;
  let last: ListBlockChildrenResponse | undefined;

  while (has_more) {
    const response = await notion.blocks.children.list({
      block_id: blockId,
      ...(start_cursor ? { start_cursor } : {}),
    });
    last = response;
    allResults.push(...response.results);
    has_more = response.has_more;
    start_cursor = response.next_cursor ?? undefined;
  }

  return {
    ...(last ?? {
      object: 'list',
      type: 'block',
      block: {},
      results: [],
      has_more: false,
      next_cursor: null,
    }),
    results: allResults,
    has_more: false,
    next_cursor: null,
  } as ListBlockChildrenResponse;
};

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
        <div className="my-6">
          {richTextValue?.length > 0 ? (
            <p className="text-zinc-400 leading-[1.8] text-lg">
              <NotionText textContentBlocks={richTextValue} />
            </p>
          ) : (
            <div className="h-4" />
          )}
        </div>
      );

    case ContentBlockTypes.Heading1:
      return (
        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mt-16 mb-8">
          <NotionText textContentBlocks={richTextValue} />
        </h1>
      );

    case ContentBlockTypes.Heading2:
      return (
        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mt-12 mb-6">
          <NotionText textContentBlocks={richTextValue} />
        </h2>
      );

    case ContentBlockTypes.Heading3:
      return (
        <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight mt-10 mb-4">
          <NotionText textContentBlocks={richTextValue} />
        </h3>
      );

    case ContentBlockTypes.BulletedListItem:
    case ContentBlockTypes.NumberedListItem:
      return (
        <li className="ml-6 my-2 text-zinc-400 text-lg leading-relaxed list-disc">
          <NotionText textContentBlocks={richTextValue} />
        </li>
      );

    case ContentBlockTypes.Todo:
      return (
        <div className="flex items-center gap-3 my-2">
          <input
            type="checkbox"
            id={id}
            defaultChecked={block[type].checked}
            className="w-5 h-5 rounded border-white/10 bg-white/5 text-primary focus:ring-primary focus:ring-offset-black"
          />
          <label htmlFor={id} className="text-zinc-400 text-lg">
            <NotionText textContentBlocks={richTextValue} />
          </label>
        </div>
      );

    case ContentBlockTypes.Toggle: {
      const toggleBlock = block[type] as {
        children?: ListBlockChildrenResponse;
      };
      return (
        <details className="group my-6 p-6 rounded-3xl bg-white/5 border border-white/10 transition-all hover:bg-white/[0.08]">
          <summary className="cursor-pointer text-white font-bold text-lg list-none flex items-center gap-4">
            <div className="w-6 h-6 flex items-center justify-center rounded-lg bg-primary/10 text-primary group-open:rotate-90 transition-transform">
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
        <figure className="my-16 group">
          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 shadow-2xl transition-all duration-700 group-hover:shadow-primary/5">
            <Image
              src={imageSrc}
              alt={caption || 'Blog image'}
              width={1200}
              height={800}
              className="object-cover transition-transform duration-1000 group-hover:scale-[1.02]"
            />
          </div>
          {caption && (
            <figcaption className="mt-6 text-center text-sm font-medium text-zinc-500 italic tracking-wide">
              {caption}
            </figcaption>
          )}
        </figure>
      );
    }

    case ContentBlockTypes.Divider:
      return <hr className="my-16 border-white/5" />;

    case ContentBlockTypes.Quote:
      return (
        <blockquote className="my-12 p-8 md:p-12 rounded-[2.5rem] bg-white/5 border-l-4 border-primary/50 relative overflow-hidden italic shadow-2xl">
          <div className="absolute top-4 left-6 text-6xl text-primary/10 font-serif opacity-50 select-none">"</div>
          <p className="text-xl md:text-2xl text-white/90 leading-relaxed relative z-10">
            <NotionText textContentBlocks={richTextValue} />
          </p>
        </blockquote>
      );

    case ContentBlockTypes.Code: {
       const code = block[type].rich_text[0]?.plain_text;
       const language = block[type].language;
       return (
          <div className="my-10 p-8 rounded-[2rem] bg-[#0d1117] border border-white/10 font-mono text-sm leading-relaxed overflow-x-auto shadow-2xl">
             <div className="flex justify-between items-center mb-6 opacity-40">
                <div className="flex gap-2">
                   <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                   <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                   <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                </div>
                <span className="text-[10px] uppercase tracking-widest font-bold">{language}</span>
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

export const getNestedChildBlock = async (
  blocks: NotionBlock[],
): Promise<NestedChildBlock[]> =>
  await Promise.all(
    blocks
      .filter((block) => block.has_children)
      .map(async (block) => {
        return {
          id: block.id,
          children: await getBlocks(block.id),
        };
      }),
  );

export const createBlockWithChildren = (
  block: NotionBlock,
  nestedChildBlocks: NestedChildBlock[],
) => {
  if (block?.has_children && !block[block.type].children) {
    block[block.type]['children'] = nestedChildBlocks.find(
      (child) => child.id === block.id,
    )?.children;
  }
  return block;
};
