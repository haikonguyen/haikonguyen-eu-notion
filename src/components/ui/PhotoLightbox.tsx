'use client';

import NextImage from 'next/image';
import { useState } from 'react';
import PhotoAlbum, { type Photo, type RenderPhoto } from 'react-photo-album';
import 'react-photo-album/rows.css';
import Lightbox from 'yet-another-react-lightbox';
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import Slideshow from 'yet-another-react-lightbox/plugins/slideshow';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import 'yet-another-react-lightbox/styles.css';

export interface GalleryPhoto {
  src: string;
  width: number;
  height: number;
  alt?: string;
  title?: string;
}

export interface PhotoLightboxProps {
  photos: GalleryPhoto[];
  className?: string;
}

const NEXT_IMAGE_SIZES =
  '(max-width: 640px) 100vw, (max-width: 1024px) 90vw, (max-width: 1280px) 1100px, min(1200px, 90vw)';

const TARGET_ROW_HEIGHT_PX = 300;
const ALBUM_SPACING_PX = 16;
const CLOSED_LIGHTBOX_INDEX = -1;

const THUMBNAIL_WIDTH_PX = 80;
const THUMBNAIL_HEIGHT_PX = 56;
const THUMBNAIL_BORDER_PX = 2;
const THUMBNAIL_RADIUS_PX = 12;
const THUMBNAIL_GAP_PX = 8;
const MAX_ZOOM_PIXEL_RATIO = 4;

function NextJsImage(
  { onClick }: Parameters<RenderPhoto<Photo>>[0],
  { photo, width, height }: Parameters<RenderPhoto<Photo>>[1],
) {
  return (
    <div
      key={photo.key ?? photo.src}
      style={{ position: 'relative', width, height }}
      className="group cursor-pointer overflow-hidden rounded-[1.5rem]"
      onClick={onClick}
    >
      <NextImage
        fill
        src={photo.src}
        alt={photo.alt ?? ''}
        title={photo.title}
        sizes={NEXT_IMAGE_SIZES}
        className="object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 rounded-[1.5rem] bg-black/0 transition-colors duration-500 group-hover:bg-black/20" />
    </div>
  );
}

export function PhotoLightbox({ photos, className }: PhotoLightboxProps) {
  const [index, setIndex] = useState(CLOSED_LIGHTBOX_INDEX);
  const albumPhotos = photos.map((photo) => ({ ...photo, key: photo.src }));
  const slides = photos.map(({ src, width, height, alt }) => ({
    src,
    width,
    height,
    alt: alt ?? '',
  }));

  return (
    <div className={className}>
      <PhotoAlbum
        layout="rows"
        photos={albumPhotos}
        targetRowHeight={TARGET_ROW_HEIGHT_PX}
        spacing={ALBUM_SPACING_PX}
        render={{ photo: NextJsImage }}
        onClick={({ index: photoIndex }) => setIndex(photoIndex)}
      />
      <Lightbox
        slides={slides}
        open={index >= 0}
        index={index}
        close={() => setIndex(CLOSED_LIGHTBOX_INDEX)}
        plugins={[Zoom, Fullscreen, Slideshow, Thumbnails]}
        styles={{
          container: {
            backgroundColor: 'rgba(0, 0, 0, 0.96)',
            backdropFilter: 'blur(24px)',
          },
        }}
        zoom={{
          maxZoomPixelRatio: MAX_ZOOM_PIXEL_RATIO,
          scrollToZoom: true,
        }}
        thumbnails={{
          position: 'bottom',
          width: THUMBNAIL_WIDTH_PX,
          height: THUMBNAIL_HEIGHT_PX,
          border: THUMBNAIL_BORDER_PX,
          borderRadius: THUMBNAIL_RADIUS_PX,
          gap: THUMBNAIL_GAP_PX,
        }}
        carousel={{ finite: false }}
      />
    </div>
  );
}
