import Link from 'next/link';
import { useRef } from 'react';

import { Agbalumo } from '@/fonts/font';
import SectionTitle from '@/components/section-title';
import { useGsapFadeInOnScroll } from '@/hooks/useGsapFadeInOnScroll';

export default function CircleSection({ keywords }: { keywords: string[] }) {
  const containerRef = useRef<HTMLDivElement>(null!);

  useGsapFadeInOnScroll(containerRef);

  const circleLayout =
    'flex items-center justify-center rounded-full aspect-square -my-4 p-8';
  const circleAnimate =
    'transition-all duration-300 ease-out hover:scale-105 hover:border-2 hover:border-white/60 hover:text-xl hover:shadow-lg';

  return (
    <section className="bg-[url(/images/home/bg_circle.png)] bg-cover px-6 py-12">
      <header>
        <SectionTitle title="tech stack" className="sr-only" />
      </header>
      <div ref={containerRef} className="m-auto max-w-[160px] sm:max-w-4xl">
        <ul
          className={`${Agbalumo.className} flex flex-col text-lg text-white sm:ml-12 sm:flex-row`}
        >
          {keywords.map((text) => (
            <li key={text} className={`gsap-fade-in sm:-mx-2 sm:w-1/4`}>
              <Link
                href={`/about/#${text}`}
                className={`border border-white/80 ${circleLayout} ${circleAnimate}`}
              >
                {text}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
