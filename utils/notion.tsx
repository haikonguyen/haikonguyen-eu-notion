import { Client } from '@notionhq/client';
import { NotionText } from '@components';
import React, { Fragment } from 'react';
import { BlockWithChildrenType, NestedChildBlock } from 'notion';
import Image from 'next/image';
import { ContentBlockTypes } from '../enums';

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

export const getDatabase = async (databaseId: string) => {
  return await notion.databases.query({
    database_id: databaseId,
  });
};

export const getPage = async (pageId: string) => {
  return await notion.pages.retrieve({ page_id: pageId });
};

export const getBlocks = async (blockId: string) => {
  return await notion.blocks.children.list({
    block_id: blockId,
  });
};

export const renderBlock = (block: BlockWithChildrenType) => {
  const { type, id } = block;
  const richTextValue = block[type]?.rich_text;
  const imageSrc = block[type]?.file?.url;
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
    case ContentBlockTypes.Toggle:
      return (
        <details>
          <summary>
            <NotionText textContentBlocks={richTextValue?.text} />
          </summary>
          {richTextValue.children.results?.map(
            (block: BlockWithChildrenType) => (
              <Fragment key={block.id}>{renderBlock(block)}</Fragment>
            ),
          )}
        </details>
      );
    case ContentBlockTypes.ChildPage:
      return <p>{richTextValue.title}</p>;
    case ContentBlockTypes.Image:
      return (
        <figure>
          <Image
            src={imageSrc}
            alt={caption}
            placeholder="blur"
            blurDataURL={imageSrc}
            width={1200}
            height={800}
            className="rounded-lg"
          />
          {caption && <figcaption>{caption}</figcaption>}
        </figure>
      );
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
  blocks: BlockWithChildrenType[],
): Promise<NestedChildBlock[]> =>
  await Promise.all(
    blocks
      .filter((block: BlockWithChildrenType) => block.has_children)
        .map(async (block: BlockWithChildrenType) => {
        return {
          id: block.id,
          children: await getBlocks(block.id),
        };
      }),
  );

export const createBlockWithChildren = (
  block: BlockWithChildrenType,
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
