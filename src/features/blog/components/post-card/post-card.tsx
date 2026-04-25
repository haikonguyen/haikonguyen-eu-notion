'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { PostCardProps } from './types';
import { getCoverSource } from './utils';
import { TagList } from '../tag-list';
import { EuDateFormat } from '@lib/notion';
import { truncateText } from '@lib/notion/text-formatting';
import { cn } from '@lib/utils';
import { FaArrowRight } from 'react-icons/fa';

export default function PostCard({
  id,
  cover,
  properties,
  slug,
}: PostCardProps) {
  const router = useRouter();
  const postUrl = slug || id;
  const title = properties.post_name.title[0]?.plain_text || "Untitled Post";
  const date = EuDateFormat(properties.published_date.date?.start);
  const excerpt = truncateText(properties.excerpt.rich_text[0]?.plain_text, 140);
  const authorAvatar = properties.author.created_by.avatar_url;

  return (
    <div 
      onClick={() => router.push(`/post/${postUrl}`)}
      className="group relative flex flex-col h-full rounded-[2.5rem] bg-white/5 border border-white/10 overflow-hidden transition-all duration-500 hover:bg-cyan-950/40 hover:border-cyan-800/50 hover:shadow-[0_32px_64px_-12px_rgba(8,145,178,0.3)] cursor-pointer"
    >
      {/* Card Header (Author & Date) */}
      <div className="flex items-center gap-4 p-8 pb-4">
        <div className="relative h-10 w-10 rounded-full overflow-hidden border border-white/20">
          <Image 
            src={authorAvatar || "/placeholder-avatar.jpg"} 
            alt="Author" 
            fill 
            className="object-cover" 
          />
        </div>
        <div className="flex flex-col">
          <p className="text-xs font-bold text-white tracking-tight">{title}</p>
          <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest mt-0.5">{date}</p>
        </div>
      </div>

      {/* Post Cover */}
      <div className="relative h-56 mx-4 rounded-[1.8rem] overflow-hidden border border-white/5 group-hover:shadow-2xl transition-all duration-700">
        <Image
          src={getCoverSource(cover) || '/placeholder.jpg'}
          alt={title}
          fill
          className="object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Card Content */}
      <div className="flex flex-col flex-1 p-8 pt-6">
        <p className="text-sm text-white/60 leading-relaxed line-clamp-3 mb-8 italic">
          "{excerpt}"
        </p>

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between gap-4">
          <div className="flex-1 overflow-hidden">
             <TagList tags={properties.tags.multi_select} />
          </div>
          <button className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-primary transition-all group-hover:bg-primary group-hover:text-black group-hover:scale-110">
            <FaArrowRight size={12} />
          </button>
        </div>
      </div>

      {/* Decorative Gradient Glow */}
      <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-primary/10 rounded-full blur-[60px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
    </div>
  );
}
