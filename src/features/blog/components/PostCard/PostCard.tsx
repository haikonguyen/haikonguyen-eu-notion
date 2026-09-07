'use client';

import { FadeInImage } from '@components/ui/FadeInImage';
import { euDateFormat, truncateText } from '@lib/format';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { TagList } from '../tag-list';
import { CoverFallback, type PostCardProps } from './types';

const EXCERPT_MAX_LENGTH = 140;
const COVER_IMAGE_SIZES =
  '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw';

export function PostCard({
  slug,
  title,
  excerpt,
  publishedDate,
  authorName,
  coverImage,
  tags,
}: PostCardProps) {
  const date = euDateFormat(publishedDate ?? undefined);
  const truncatedExcerpt = truncateText(excerpt, EXCERPT_MAX_LENGTH);

  return (
    <Link
      href={`/post/${slug}`}
      className="group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-3xl border border-white/10 bg-black/45 backdrop-blur-2xl transition-all duration-500 hover:border-primary/50 hover:bg-white/[0.08] hover:shadow-[0_20px_50px_-10px_rgba(6,182,212,0.2)]"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-900">
        <FadeInImage
          src={coverImage || CoverFallback.Image}
          alt={title}
          fill
          sizes={COVER_IMAGE_SIZES}
          className="object-cover duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-80" />
      </div>
      <div className="flex flex-1 flex-col p-4 sm:p-6">
        <div className="mb-2.5 flex items-center gap-2.5">
          <div className="relative h-6 w-6 shrink-0 overflow-hidden rounded-full border border-white/20">
            <Image
              src={CoverFallback.Avatar}
              alt={authorName}
              fill
              sizes="24px"
              className="object-cover"
            />
          </div>
          <span className="text-[11px] font-semibold text-white/80">
            {authorName}
          </span>
          <span className="text-xs text-white/30">•</span>
          <span className="text-[11px] font-medium text-white/50">{date}</span>
        </div>
        <h3 className="mb-2 line-clamp-2 text-lg font-bold tracking-tight text-white transition-colors group-hover:text-primary sm:text-xl">
          {title}
        </h3>
        {truncatedExcerpt ? (
          <p className="mb-4 line-clamp-2 text-xs leading-relaxed text-white/70 sm:text-sm">
            {truncatedExcerpt}
          </p>
        ) : null}
        <div className="mt-auto flex items-center justify-between gap-3 border-t border-white/10 pt-3">
          <div className="flex-1 overflow-hidden">
            <TagList tags={tags} />
          </div>
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-primary transition-all group-hover:scale-110 group-hover:bg-primary group-hover:text-black">
            <ArrowRight size={13} />
          </div>
        </div>
      </div>
    </Link>
  );
}
