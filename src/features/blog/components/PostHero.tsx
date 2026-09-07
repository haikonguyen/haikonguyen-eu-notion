import { ARTICLE_HEADER_GAP_CLASS } from '@components/layout/global-styles';
import { FadeInImage } from '@components/ui/FadeInImage';
import { euDateFormat } from '@lib/format';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { CoverFallback } from './PostCard/types';
import TagList from './tag-list/tag-list';

interface PostHeroProps {
  title: string;
  excerpt: string;
  authorName: string;
  publishedDate: string | null;
  coverSrc: string;
  tags: string[];
}

export async function PostHero({
  title,
  excerpt,
  authorName,
  publishedDate,
  coverSrc,
  tags,
}: PostHeroProps) {
  const t = await getTranslations('Post');
  const formattedDate = euDateFormat(publishedDate ?? undefined);

  return (
    <header className={ARTICLE_HEADER_GAP_CLASS}>
      {tags.length > 0 && (
        <div className="mb-3 sm:mb-4">
          <TagList tags={tags} />
        </div>
      )}

      <h1 className="text-2xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl leading-[1.15]">
        {title}
      </h1>

      {excerpt ? (
        <p className="mt-3 text-base leading-relaxed text-zinc-300 sm:text-lg sm:text-xl">
          <span className="mr-2 font-bold text-primary">/</span>
          {excerpt}
        </p>
      ) : null}

      <div className="mt-4 mb-6 flex flex-wrap items-center gap-3 text-xs text-zinc-400 sm:mt-5 sm:mb-8 sm:text-sm">
        <div className="flex items-center gap-2.5">
          <div className="relative h-7 w-7 overflow-hidden rounded-full border border-white/20 sm:h-8 sm:w-8">
            <Image
              src={CoverFallback.Avatar}
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
        {formattedDate ? (
          <>
            <span className="text-zinc-600">•</span>
            <time className="text-zinc-400">{formattedDate}</time>
          </>
        ) : null}
      </div>

      {coverSrc ? (
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/50 shadow-2xl sm:rounded-3xl">
          <FadeInImage
            src={coverSrc}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 896px"
            className="object-cover"
            priority
          />
        </div>
      ) : null}
    </header>
  );
}
