import {
  ExternalCoverType,
  FileCoverType,
  MultiSelectType,
  PropertiesType,
} from 'notion';

export interface PostCardProps {
  id: string;
  cover: ExternalCoverType & FileCoverType;
  properties: PropertiesType;
}

export interface TagListProps {
  tags: MultiSelectType[];
}

export interface AvatarImageProps {
  avatarUrl?: string;
}

export enum CoverType {
  FILE = 'file',
  EXTERNAL = 'external',
}
