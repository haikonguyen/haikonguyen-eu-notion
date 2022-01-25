import { ExternalCoverType, FileCoverType, PropertiesType } from 'notion';

export interface PostCardProps {
  id: string;
  cover: ExternalCoverType & FileCoverType;
  properties: PropertiesType;
}

export interface AvatarImageProps {
  avatarUrl?: string;
}

export enum CoverType {
  FILE = 'file',
  EXTERNAL = 'external',
}
