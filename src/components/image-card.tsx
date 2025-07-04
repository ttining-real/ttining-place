import Image from 'next/image';
import { useState } from 'react';

import LoadingSpinner from './loading-spinner';

type ImageCardProps = {
  src?: string | null;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
};

export default function ImageCard({
  src,
  alt = '이미지',
  width = 420,
  height = 236,
  className = '',
}: ImageCardProps) {
  const [loading, setLoading] = useState(false);
  const hasImage = !!src && !src.endsWith('/.png') && src.trim() !== '';

  return (
    <figure
      className={`bg-primary/10 border-primary/20 text-primary relative flex items-center justify-center overflow-hidden rounded-xl border ${className}`}
    >
      {loading && hasImage && (
        <div className="bg-primary/10 absolute inset-0 z-10 flex items-center justify-center">
          <LoadingSpinner />
        </div>
      )}

      {hasImage ? (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          onLoad={() => setLoading(false)}
          onError={() => setLoading(false)}
          className={`aspect-video w-full transition-opacity duration-300 ${loading ? 'opacity-0' : ''}`}
        />
      ) : (
        <div className="flex flex-col items-center justify-center gap-4">
          <Image
            src="/icons/fearful_face.png"
            alt="두려운 얼굴 아이콘"
            width={40}
            height={40}
            className="h-8 w-8"
          />
          <figcaption className="text-center text-sm">이미지 없음</figcaption>
        </div>
      )}
    </figure>
  );
}
