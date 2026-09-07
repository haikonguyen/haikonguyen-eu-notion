import { FadeInImage } from '@components/ui/FadeInImage';
import { getR2PublicUrl } from '@lib/r2';

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
    <figure className="my-10 not-prose">
      <FadeInImage
        src={imageSrc}
        alt={alt}
        width={1200}
        height={800}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 768px"
        className="h-auto w-full rounded-xl border border-white/10"
      />
      {caption ? (
        <figcaption className="mx-auto mt-3 max-w-prose text-center text-sm leading-relaxed text-zinc-400 italic">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
