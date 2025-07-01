'use client';

import { useState } from 'react';
import Image from 'next/image';
import LoadingSpinner from '@/components/loading-spinner';
import NoImageFallback from './no-image-fallback';

type Props = {
  type: 'experience' | 'projects';
  imageUrl?: string | null;
  title: string;
};

export default function ImageWithFallback({ type, imageUrl, title }: Props) {
  const [isLoading, setIsLoading] = useState(true);

  // imageUrldl null이거나 빈 문자열일 경우 fallback
  if (!imageUrl || imageUrl.trim() === '') {
    return <NoImageFallback />;
  }

  return (
    <>
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/50">
          <LoadingSpinner />
        </div>
      )}
      <Image
        src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${type}//${imageUrl}.png`}
        alt={`${title} 썸네일`}
        width={340}
        height={200}
        className="aspect-video w-full"
        priority
        onLoad={() => setIsLoading(false)}
      />
    </>
  );
}
