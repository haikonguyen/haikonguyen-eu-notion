import { Client } from '@notionhq/client';
import { NotionText } from '@components';
import React, { Fragment } from 'react';

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
    page_size: 50,
  });
};

export const renderBlock = (block: any) => {
  const { type, id } = block;
  const value = block[type];

  const src = value.type === 'external' ? value.external.url : value.file?.url;
  const caption = value.caption ? value.caption[0]?.plain_text : '';

  switch (type) {
    case 'paragraph':
      return (
        <p>
          <NotionText text={value.text} />
        </p>
      );
    case 'heading_1':
      return (
        <h1>
          <NotionText text={value.text} />
        </h1>
      );
    case 'heading_2':
      return (
        <h2>
          <NotionText text={value.text} />
        </h2>
      );
    case 'heading_3':
      return (
        <h3>
          <NotionText text={value.text} />
        </h3>
      );
    case 'bulleted_list_item':
    case 'numbered_list_item':
      return (
        <li>
          <NotionText text={value.text} />
        </li>
      );
    case 'to_do':
      return (
        <div>
          <label htmlFor={id}>
            <input type="checkbox" id={id} defaultChecked={value.checked} />{' '}
            <NotionText text={value.text} />
          </label>
        </div>
      );
    case 'toggle':
      return (
        <details>
          <summary>
            <NotionText text={value.text} />
          </summary>
          {value.children.results?.map((block: any) => (
            <Fragment key={block.id}>{renderBlock(block)}</Fragment>
          ))}
        </details>
      );
    case 'child_page':
      return <p>{value.title}</p>;
    case 'image':
      return (
        <figure>
          <img src={src} alt={caption} />
          {caption && <figcaption>{caption}</figcaption>}
        </figure>
      );
    case 'divider':
      return <hr key={id} />;
    case 'quote':
      return <blockquote key={id}>{value.text[0].plain_text}</blockquote>;
    default:
      return `❌ Unsupported block (${
        type === 'unsupported' ? 'unsupported by Notion API' : type
      })`;
  }
};
