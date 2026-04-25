import { Image } from '@imagekit/next';
import { AvatarImageProps } from './types';

const AvatarImage = ({ avatarUrl }: AvatarImageProps) =>
  avatarUrl ? (
    <Image
      src={avatarUrl}
      alt="Avatar"
      fill
      sizes="32px"
      style={{ objectFit: 'cover' }}
      referrerPolicy="no-referrer"
    />
  ) : (
    <span>A</span>
  );

export default AvatarImage;
