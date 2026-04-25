import { NotionBlock } from '@app-types/notion';
import { renderBlock } from '@lib/notion';
import { Fragment } from 'react';

interface NotionBlocksProps {
  blocks: NotionBlock[];
}

const NotionBlocks = ({ blocks }: NotionBlocksProps) => {
  if (!blocks) {
    throw new Error('NotionBlocks requires a blocks array');
  }
  return (
    <>
      {blocks.map((block) => (
        <Fragment key={block.id}>{renderBlock(block)}</Fragment>
      ))}
    </>
  );
};

export default NotionBlocks;
