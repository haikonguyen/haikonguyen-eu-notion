import { Client } from '@notionhq/client';
import { NotionText } from '@components';
import React, { Fragment } from 'react';
import { BlockWithChildrenType, NestedChildBlock } from 'notion';
import Image from 'next/image';
import tw from 'twin.macro';

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
  const value = block[type];

  const src = value.type === 'external' ? value.external.url : value.file?.url;
  const caption = value.caption ? value.caption[0]?.plain_text : '';

  switch (type) {
    case 'paragraph':
      return (
        <>
          {value.text.length > 0 ? (
            <p>
              <NotionText textContentBlocks={value.text} />
            </p>
          ) : (
            <br />
          )}
        </>
      );

    case 'heading_1':
      return (
        <>
          {value.text.length > 0 ? (
            <h1>
              <NotionText textContentBlocks={value.text} />
            </h1>
          ) : (
            <br />
          )}
        </>
      );
    case 'heading_2':
      return (
        <>
          {value.text.length > 0 ? (
            <h2>
              <NotionText textContentBlocks={value.text} />
            </h2>
          ) : (
            <br />
          )}
        </>
      );
    case 'heading_3':
      return (
        <h3>
          <NotionText textContentBlocks={value.text} />
        </h3>
      );
    //: TODO: when available => fix bulleted vs numbered list
    case 'bulleted_list_item':
    case 'numbered_list_item':
      return (
        <li css={tw`ml-2 md:ml-5`}>
          <NotionText textContentBlocks={value.text} />
        </li>
      );
    case 'to_do':
      return (
        <div>
          <label htmlFor={id}>
            <input type="checkbox" id={id} defaultChecked={value.checked} />{' '}
            <NotionText textContentBlocks={value.text} />
          </label>
        </div>
      );
    case 'toggle':
      return (
        <details>
          <summary>
            <NotionText textContentBlocks={value.text} />
          </summary>
          {value.children.results?.map((block: BlockWithChildrenType) => (
            <Fragment key={block.id}>{renderBlock(block)}</Fragment>
          ))}
        </details>
      );
    case 'child_page':
      return <p>{value.title}</p>;
    case 'image':
      return (
        <figure>
          <Image
            src={src}
            alt={caption}
            placeholder="blur"
            blurDataURL={src}
            width={1200}
            height={800}
            className="rounded-lg"
          />
          {caption && <figcaption>{caption}</figcaption>}
        </figure>
      );
    case 'divider':
      return <hr key={id} />;
    case 'quote':
      return <blockquote key={id}>{value.text[0].plain_text}</blockquote>;
    default:
      return `??? Unsupported block (${
        type === 'unsupported' ? 'unsupported by Notion API' : type
      })`;
  }
};

// Retrieve block children for nested blocks (one level deep), for example toggle blocks
// https://developers.notion.com/docs/working-with-page-content#reading-nested-blocks
export const getNestedChildBlock = async (
  blocks: any
): Promise<NestedChildBlock[]> =>
  await Promise.all(
    blocks
      .filter((block: BlockWithChildrenType) => block.has_children)
      .map(async (block: NestedChildBlock) => {
        return {
          id: block.id,
          children: await getBlocks(block.id),
        };
      })
  );

export const createBlockWithChildren = (
  block: any,
  nestedChildBlocks: NestedChildBlock[]
) => {
  /* Create new object structure => append nestedChildBlock if needed, for example for toggles
   based on the has_children prop.
 */
  if (block?.has_children && !block[block.type].children) {
    block[block.type]['children'] = nestedChildBlocks.find(
      (child) => child.id === block.id
    )?.children;
  }
  return block;
};
