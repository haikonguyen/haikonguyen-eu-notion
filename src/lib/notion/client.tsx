import { Client } from '@notionhq/client';
import { NotionText } from '@features/blog';
import { Fragment } from 'react';
import { NestedChildBlock, NotionBlock } from '@app-types/notion';
import { Image } from '@imagekit/next';
import { ContentBlockTypes } from '@enums/contentBlockTypes';
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

/**
 * Gets the image source URL from an image block
 * Prioritizes external URLs (won't expire) over file URLs (Notion S3 - expires)
 */
const getImageSource = (block: NotionBlock): string => {
  if (!isImageBlock(block)) {
    return '/placeholder.jpg';
  }

  const { image } = block;

  // External URLs (ImageKit, Unsplash, etc.) - preferred, won't expire
  if (image.type === 'external') {
    return image.external.url;
  }

  // File URLs (Notion S3) - may expire after ~1 hour
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
        <>
          {richTextValue?.length > 0 ? (
            <p>
              <NotionText textContentBlocks={richTextValue} />
            </p>
          ) : (
            <br />
          )}
        </>
      );

    case ContentBlockTypes.Heading1:
      return (
        <>{richTextValue ? <h1>{richTextValue?.[0].plain_text}</h1> : <br />}</>
      );

    case ContentBlockTypes.Heading2:
      return (
        <>{richTextValue ? <h2>{richTextValue?.[0].plain_text}</h2> : <br />}</>
      );
    case ContentBlockTypes.Heading3:
      return (
        <>{richTextValue ? <h3>{richTextValue?.[0].plain_text}</h3> : <br />}</>
      );
    //: TODO: when available => fix bulleted vs numbered list
    case ContentBlockTypes.BulletedListItem:
    case ContentBlockTypes.NumberedListItem:
      return (
        <li className="ml-2 md:ml-5">
          <NotionText textContentBlocks={richTextValue} />
        </li>
      );
    case ContentBlockTypes.Todo:
      return (
        <div>
          <label htmlFor={id}>
            <input
              type="checkbox"
              id={id}
              defaultChecked={richTextValue.checked}
            />{' '}
            <NotionText textContentBlocks={richTextValue?.text} />
          </label>
        </div>
      );
    case ContentBlockTypes.Toggle: {
      const toggleBlock = block[type] as {
        children?: ListBlockChildrenResponse;
      };
      return (
        <details>
          <summary>
            <NotionText
              textContentBlocks={richTextValue?.text ?? richTextValue}
            />
          </summary>
          {(toggleBlock?.children?.results ?? []).map((childBlock) => (
            <Fragment key={(childBlock as NotionBlock).id}>
              {renderBlock(childBlock as NotionBlock)}
            </Fragment>
          ))}
        </details>
      );
    }
    case ContentBlockTypes.ChildPage:
      return <p>{richTextValue.title}</p>;
    case ContentBlockTypes.Image: {
      const imageSrc = getImageSource(block);
      return (
        <figure>
          <Image
            src={imageSrc}
            alt={caption || 'Blog image'}
            width={1200}
            height={800}
            className="rounded-lg"
            style={{ width: '100%', height: 'auto' }}
          />
          {caption && <figcaption>{caption}</figcaption>}
        </figure>
      );
    }
    case ContentBlockTypes.Divider:
      return <hr key={id} />;
    case ContentBlockTypes.Quote:
      return (
        <blockquote key={id}>{richTextValue?.text[0].plain_text}</blockquote>
      );
    default:
      return `❌ Unsupported block (${
        type === 'unsupported' ? 'unsupported by Notion API' : type
      })`;
  }
};

// Retrieve block children for nested blocks (one level deep), for example toggle blocks
// https://developers.notion.com/docs/working-with-page-content#reading-nested-blocks
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
  /* Create new object structure => append nestedChildBlock if needed, for example for toggles
   based on the has_children prop.
 */
  if (block?.has_children && !block[block.type].children) {
    block[block.type]['children'] = nestedChildBlocks.find(
      (child) => child.id === block.id,
    )?.children;
  }
  return block;
};
