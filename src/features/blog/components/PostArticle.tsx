import type { NotionBlock } from '@app-types/notion';
import NotionBlocks from './notion-blocks/notion-blocks';

interface PostArticleProps {
  blocks: NotionBlock[];
}

export function PostArticle({ blocks }: PostArticleProps) {
  return (
    <article className="w-full">
      <NotionBlocks blocks={blocks} />
    </article>
  );
}
