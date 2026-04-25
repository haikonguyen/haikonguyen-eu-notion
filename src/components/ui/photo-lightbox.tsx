'use client';

import React, { useState, useCallback } from 'react';
import PhotoAlbum, { type Photo } from 'react-photo-album';
import 'react-photo-album/rows.css';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import Slideshow from 'yet-another-react-lightbox/plugins/slideshow';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import NextImage from 'next/image';

export interface GalleryPhoto {
  src: string;
  width: number;
  height: number;
  alt?: string;
  title?: string;
}

interface PhotoLightboxProps {
  photos: GalleryPhoto[];
  className?: string;
}

// Next.js-optimised render for react-photo-album
function NextJsImage({
  photo,
  imageProps: { alt, title, sizes, className, onClick },
  wrapperStyle,
}: Parameters<NonNullable<React.ComponentProps<typeof PhotoAlbum>['renderPhoto']>>[0]) {
  return (
    <div
      style={{ ...wrapperStyle, position: 'relative' }}
      className="overflow-hidden rounded-[1.5rem] cursor-pointer group"
      onClick={onClick}
    >
      <NextImage
        fill
        src={photo.src}
        alt={alt || photo.alt || ''}
        title={title}
        sizes={sizes}
        className={`${className ?? ''} object-cover transition-transform duration-700 group-hover:scale-110`}
      />
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 rounded-[1.5rem]" />
    </div>
  );
}

export const PhotoLightbox = ({ photos, className }: PhotoLightboxProps) => {
  const [index, setIndex] = useState(-1);

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
        photos={photos}
        targetRowHeight={300}
        spacing={16}
        renderPhoto={NextJsImage}
        onClick={({ index: idx }) => setIndex(idx)}
      />

      <Lightbox
        slides={slides}
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        plugins={[Zoom, Fullscreen, Slideshow, Thumbnails]}
        styles={{
          container: {
            backgroundColor: 'rgba(0, 0, 0, 0.96)',
            backdropFilter: 'blur(24px)',
          },
        }}
        zoom={{
          maxZoomPixelRatio: 4,
          scrollToZoom: true,
        }}
        thumbnails={{
          position: 'bottom',
          width: 80,
          height: 56,
          border: 2,
          borderRadius: 12,
          gap: 8,
        }}
        carousel={{ finite: false }}
      />
    </div>
  );
};
