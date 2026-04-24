import React from 'react';
import { Image } from '@imagekit/next';
import { AvatarImageProps } from './types';

const AvatarImage = ({ avatarUrl }: AvatarImageProps) =>
  avatarUrl ? (
    <Image
      src={avatarUrl}
      alt="Avatar"
      fill
      style={{ objectFit: 'cover' }}
      referrerPolicy="no-referrer"
    />
  ) : (
    <span>A</span>
  );

export default AvatarImage;
