import React, { Fragment } from 'react';
import { renderBlock } from '@utils/notion';
import { NotionBlocksProps } from 'notion';

const NotionBlocks = ({ blocks }: NotionBlocksProps) => {
  return (
    <>
      {blocks.map((block) => (
        <Fragment key={block.id}>{renderBlock(block)}</Fragment>
      ))}
    </>
  );
};

export default NotionBlocks;
