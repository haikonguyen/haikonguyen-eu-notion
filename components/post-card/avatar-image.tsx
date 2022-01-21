import React from 'react';
import Image from 'next/image';
import { AvatarImageProps } from '@components/post-card/types';

const AvatarImage = ({ avatarUrl }: AvatarImageProps) =>
  avatarUrl ? (
    <Image
      src={avatarUrl}
      alt="Avatar"
      objectFit="cover"
      layout="fill"
      placeholder="blur"
      blurDataURL={avatarUrl}
      referrerPolicy="no-referrer"
    />
  ) : (
    <span>A</span>
  );

export default AvatarImage;
