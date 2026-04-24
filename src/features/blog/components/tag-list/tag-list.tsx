import { Badge } from "@/components/ui/badge";
import { TagListProps } from "./types";

const TagList = ({ tags }: TagListProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Badge
          key={tag.id}
          variant="secondary"
          className="text-xs bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
        >
          {tag.name}
        </Badge>
      ))}
    </div>
  );
};

export default TagList;
