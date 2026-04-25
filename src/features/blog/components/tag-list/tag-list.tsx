import React from 'react';
import { TagListProps } from './types';

const TagList = ({ tags }: TagListProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          key={tag.id}
          className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] font-bold text-primary uppercase tracking-widest transition-all hover:bg-white/10 cursor-default"
        >
          {tag.name}
        </span>
      ))}
    </div>
  );
};

export default TagList;
