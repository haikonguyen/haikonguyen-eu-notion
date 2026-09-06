import { getR2PublicUrl } from '@lib/r2';
import Image from 'next/image';

export interface R2CmsImageProps {
  src: string;
  alt: string;
  caption?: string;
}

export function R2CmsImage({ src, alt, caption }: R2CmsImageProps) {
  const imageSrc = getR2PublicUrl(src);
  if (!imageSrc) {
    return null;
  }

  return (
    <figure className="my-8 overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/40">
      <div className="relative aspect-[16/10] w-full">
        <Image
          src={imageSrc}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 768px"
          className="object-cover"
        />
      </div>
      {caption ? (
        <figcaption className="px-4 py-3 text-center text-sm text-white/55">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
