import { Fragment } from 'react';
import { renderBlock } from '@lib/notion';
import { NotionBlock } from 'notion';

interface NotionBlocksProps {
  blocks: NotionBlock[];
}

const NotionBlocks = ({ blocks }: NotionBlocksProps) => {
  return (
    <>
      {blocks?.map((block) => (
        <Fragment key={block.id}>{renderBlock(block)}</Fragment>
      ))}
    </>
  );
};

export default NotionBlocks;
