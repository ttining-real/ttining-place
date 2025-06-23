import { Agbalumo } from '@/fonts/font';
import { useRef } from 'react';
import { useGsapFadeInOnScroll } from '@/hooks/useGsapFadeInOnScroll';

export default function CircleSection({ keywords }: { keywords: string[] }) {
  const containerRef = useRef<HTMLDivElement>(null!);

  useGsapFadeInOnScroll(containerRef);

  return (
    <section className="bg-[url(/images/home/bg_circle.png)] bg-cover px-6 py-12">
      <div ref={containerRef} className="m-auto max-w-[160px] sm:max-w-4xl">
        <ul
          className={`${Agbalumo.className} flex flex-col text-lg text-white sm:ml-12 sm:flex-row`}
        >
          {keywords.map((text) => (
            <li
              key={text}
              className="gsap-fade-in -my-4 flex aspect-square items-center justify-center rounded-full border border-white p-8 sm:-mx-2 sm:w-1/4"
            >
              {text}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
