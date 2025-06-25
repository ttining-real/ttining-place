import Image from 'next/image';
import { useRef } from 'react';

import { useGsapEntranceMotion } from '@/hooks/useGsapEntranceMotion';

export default function Visual() {
  const containerRef = useRef<HTMLDivElement>(null!);

  useGsapEntranceMotion(containerRef);

  return (
    <section
      ref={containerRef}
      className="flex min-h-dvh items-center justify-center bg-[url(/images/home/bg_visual.png)] bg-cover bg-center"
    >
      <Image
        src="/images/home/visual_catchphrase.png"
        alt="Design, Develop, Deliver"
        width={940}
        height={680}
        priority
        className="gsap-entrance sm:max-w-3xl"
      />
    </section>
  );
}
