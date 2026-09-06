import type { Node as MarkdocNode } from '@markdoc/markdoc';
import { MarkdocRenderer } from './MarkdocRenderer';

interface PostArticleProps {
  content: MarkdocNode;
}

const ARTICLE_PROSE_CLASS =
  'prose prose-invert prose-lg mx-auto max-w-3xl leading-relaxed text-white/70 prose-headings:text-white prose-a:text-primary prose-strong:text-white prose-code:text-primary prose-blockquote:border-primary/40';

export function PostArticle({ content }: PostArticleProps) {
  return (
    <article className="w-full">
      <MarkdocRenderer node={content} className={ARTICLE_PROSE_CLASS} />
    </article>
  );
}
