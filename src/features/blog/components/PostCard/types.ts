import {
  ExternalCoverType,
  FileCoverType,
  PropertiesType,
} from '@app-types/notion';

export interface PostCardProps {
  id: string;
  cover: ExternalCoverType | FileCoverType | null;
  properties: PropertiesType;
  slug?: string;
}

export interface AvatarImageProps {
  avatarUrl?: string;
}

export enum CoverType {
  FILE = 'file',
  EXTERNAL = 'external',
}
