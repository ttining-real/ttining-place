import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';
import { Url } from 'next/dist/shared/lib/router/router';

import { montserrat } from '@/fonts/font';

type CardProps = {
  href?: Url;
  src: string | null;
  children: ReactNode;
};

function ImageFallback() {
  const before =
    'before:absolute before:content-[""] before:aspect-square before:h-[120%] before:top-1/2 before:-translate-y-1/2 before:left-1/2 before:-translate-x-1/6 before:rounded-full before:bg-gradient-to-r before:to-transparent before:from-[rgba(176,176,176,0.1)]';

  return (
    <div
      className={`${montserrat.className} text-disabled-text bg-disabled-bg relative inset-0 flex aspect-4/3 w-full flex-col justify-between overflow-hidden p-6 font-semibold transition-transform duration-500 ease-in-out group-hover:scale-105 ${before}`}
    >
      <p className="text-lg">Image Coming Soon...</p>
      <p className="text-sm">Thumbnail Unavailable</p>
    </div>
  );
}

export default function Card({ href, src, children }: CardProps) {
  const isValidSrc = typeof src === 'string' && src.trim() !== '';

  return (
    <article className="group border-border relative border">
      {href ? (
        <Link href={href} className="focus-ring block overflow-hidden">
          <figure className="bg-section">
            {isValidSrc ? (
              <Image
                src={src}
                alt=""
                width={200}
                height={200}
                priority
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
          <figure className="bg-section">
            {isValidSrc ? (
              <Image
                src={src}
                alt=""
                width={200}
                height={200}
                priority
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
