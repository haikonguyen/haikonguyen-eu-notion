import React from 'react';
import Image from 'next/image';
import { AvatarImageProps } from './types';

const AvatarImage = ({ avatarUrl }: AvatarImageProps) =>
  avatarUrl ? (
    <Image
      src={avatarUrl}
      alt="Avatar"
      fill
      sizes="40px"
      style={{ objectFit: 'cover' }}
      referrerPolicy="no-referrer"
    />
  ) : (
    <span>A</span>
  );

export default AvatarImage;
