import { TagListProps } from './types';

const TagList = ({ tags }: TagListProps) => {
  if (tags.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className="cursor-default rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[9px] font-bold uppercase tracking-widest text-primary transition-all hover:bg-white/10"
        >
          {tag}
        </span>
      ))}
    </div>
  );
};

export default TagList;
