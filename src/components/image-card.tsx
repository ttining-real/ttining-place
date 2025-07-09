import Image from 'next/image';
import { useState } from 'react';

import LoadingSpinner from '@/components/loading-spinner';

type ImageCardProps = {
  src?: string | null;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
  noneClassName?: string;
};

export default function ImageCard({
  src,
  alt = '이미지',
  width = 420,
  height = 236,
  className = '',
  noneClassName = '',
}: ImageCardProps) {
  const [loading, setLoading] = useState(false);
  const hasImage = !!src && !src.endsWith('/.png') && src.trim() !== '';

  return (
    <figure
      className={`bg-surface relative flex w-full items-center justify-center ${className}`}
    >
      {loading && hasImage && (
        <div className="bg-surface absolute inset-0 z-10 flex items-center justify-center">
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
          className={`w-full transition-opacity duration-300 ${loading ? 'opacity-0' : ''}`}
        />
      ) : (
        <div
          className={`bg-bg flex h-full flex-col items-center justify-center gap-4 ${noneClassName}`}
        >
          <Image
            src="/icons/fearful_face.png"
            alt="두려운 얼굴 아이콘"
            width={40}
            height={40}
            className="h-8 w-8"
          />
          <figcaption className="text-text-secondary text-center text-sm">
            이미지 없음
          </figcaption>
        </div>
      )}
    </figure>
  );
}
