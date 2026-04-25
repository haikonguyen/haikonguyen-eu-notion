import type { BlogPage } from '@app-types/notion';
import { ARTICLE_HEADER_GAP_CLASS } from '@components/layout/global-styles';
import { EuDateFormat } from '@lib/notion';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import TagList from './tag-list/tag-list';

interface PostHeroProps {
  page: BlogPage;
  coverSrc: string;
  postTitle: string;
}

export async function PostHero({ page, coverSrc, postTitle }: PostHeroProps) {
  const t = await getTranslations('Post');
  const authorName = page.properties.author.created_by.name || 'Haiko Nguyen';
  const avatarSrc =
    page.properties.author.created_by.avatar_url || '/placeholder.jpg';
  const publishedDate = EuDateFormat(
    page.properties.published_date?.date?.start,
  );
  const excerpt = page.properties.excerpt?.rich_text?.[0]?.plain_text;
  const tags = page.properties.tags.multi_select;

  return (
    <header className={ARTICLE_HEADER_GAP_CLASS}>
      {tags && tags.length > 0 && (
        <div className="mb-3 sm:mb-4">
          <TagList tags={tags} />
        </div>
      )}

      <h1 className="text-2xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl leading-[1.15]">
        {postTitle}
      </h1>

      {excerpt && (
        <p className="mt-3 text-base sm:text-lg text-zinc-300 leading-relaxed sm:text-xl">
          <span className="mr-2 font-bold text-primary">/</span>
          {excerpt}
        </p>
      )}

      <div className="mt-4 mb-6 flex flex-wrap items-center gap-3 text-xs sm:mt-5 sm:mb-8 sm:text-sm text-zinc-400">
        <div className="flex items-center gap-2.5">
          <div className="relative h-7 w-7 overflow-hidden rounded-full border border-white/20 sm:h-8 sm:w-8">
            <Image
              src={avatarSrc}
              alt={t('authorAlt')}
              fill
              sizes="(max-width: 640px) 28px, 32px"
              className="object-cover"
            />
          </div>
          <span className="text-zinc-300">
            {t('by')}{' '}
            <span className="font-semibold text-primary">{authorName}</span>
          </span>
        </div>
        {publishedDate && (
          <>
            <span className="text-zinc-600">•</span>
            <time className="text-zinc-400">{publishedDate}</time>
          </>
        )}
      </div>

      {coverSrc && (
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/50 shadow-2xl sm:rounded-3xl">
          <Image
            src={coverSrc}
            alt={postTitle}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 896px"
            className="object-cover"
            priority
          />
        </div>
      )}
    </header>
  );
}
