import Link from 'next/link';
import Image from 'next/image';
import { ReactNode } from 'react';
import { Url } from 'next/dist/shared/lib/router/router';

import ImageFallback from '@/components/image-fallback';

type CardProps = {
  href?: Url;
  src: string | null;
  children: ReactNode;
  priority?: boolean;
};

export default function Card({ href, src, priority, children }: CardProps) {
  const isValidSrc = typeof src === 'string' && src.trim() !== '';

  return (
    <article className="group border-border relative border">
      {href ? (
        <Link href={href} className="focus-ring block overflow-hidden">
          <figure className="bg-section overflow-hidden">
            {isValidSrc ? (
              <Image
                src={src}
                alt=""
                width={200}
                height={200}
                priority={priority}
                className="aspect-4/3 w-full overflow-hidden object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
              />
            ) : (
              <ImageFallback />
            )}
          </figure>
          <div className="flex flex-col items-end gap-6 px-6 pt-4 pb-6">
            {children}
          </div>
        </Link>
      ) : (
        <>
          <figure className="bg-section overflow-hidden">
            {isValidSrc ? (
              <Image
                src={src}
                alt=""
                width={200}
                height={200}
                priority={priority}
                className="aspect-video w-full overflow-hidden object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
              />
            ) : (
              <ImageFallback />
            )}
          </figure>
          <div className="flex flex-col items-end gap-6 px-6 pt-4 pb-6">
            {children}
          </div>
        </>
      )}
    </article>
  );
}
