import { Agbalumo } from '@/fonts/font';

import { useRef } from 'react';
import { useGsapFadeInOnScroll } from '@/hooks/useGsapFadeInOnScroll';

export default function Visual() {
  const containerRef = useRef<HTMLDivElement>(null!);

  useGsapFadeInOnScroll(containerRef);

  const rectClassName =
    'absolute block h-2 w-2 border border-white/80 bg-[#b79984be]';

  return (
    <section className="flex min-h-dvh items-center justify-center bg-[url(/images/home/bg_visual.png)] bg-cover bg-center">
      <div
        ref={containerRef}
        className="relative flex w-8/12 max-w-2xl justify-center border border-white/60 px-6 py-20"
      >
        <p
          className={`${Agbalumo.className} gsap-fade-in flex flex-col text-4xl text-white sm:text-5xl`}
        >
          <span>Design</span>
          <span className="pl-6">Develop</span>
          <span className="pl-12">Deliver</span>
        </p>
        <span aria-hidden className={`${rectClassName} -top-1 -left-1`}></span>
        <span aria-hidden className={`${rectClassName} -top-1 -right-1`}></span>
        <span
          aria-hidden
          className={`${rectClassName} -bottom-1 -left-1`}
        ></span>
        <span
          aria-hidden
          className={`${rectClassName} -right-1 -bottom-1`}
        ></span>
      </div>
    </section>
  );
}
