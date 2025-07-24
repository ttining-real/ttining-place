import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { montserrat } from '@/fonts/font';
import Icon from '@/components/icon';

const headline = [
  'Design Experiences',
  'Develop With Intent',
  'Deliver Results',
];

export default function HeroSection() {
  const scrollRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);
  const [showNoise, setShowNoise] = useState(false);

  const handleScrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      setShowNoise(true);
    });

    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section
      ref={scrollRef}
      className="flex h-dvh items-center justify-center px-6"
    >
      {/* 그라디언트 배경 */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 bg-[conic-gradient(from_180deg_at_70%_60%,rgba(83,85,90,0.6),transparent_80%)] opacity-40"
      />

      <h2 className="sr-only">Introduce</h2>

      <div className="flex flex-col gap-8">
        <h2 className="text-text-primary xs:text-4xl text-3xl leading-tight font-bold uppercase sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
          {headline.map((h, i) =>
            isMounted ? (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                viewport={{ once: false }}
                className={`${montserrat.className} block text-center`}
              >
                {h}
              </motion.span>
            ) : null,
          )}
        </h2>
        {isMounted && (
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 * 0.2 }}
            viewport={{ once: false }}
            className="text-text-primary text-center text-sm md:text-base"
          >
            <span className="block">
              사용자 경험을 중심에 두고, 목적있는 개발과 결과에 집중하는
            </span>
            <span className="block">디자이너이자 개발자 안지인입니다.</span>
          </motion.p>
        )}
      </div>

      {/* 스크롤 버튼 */}
      <motion.button
        aria-label="about 섹션으로 이동"
        onClick={handleScrollToAbout}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 1.5,
          duration: 0.6,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
        className="focus-ring bg-section text-primary absolute bottom-10 cursor-pointer rounded-full p-2"
      >
        <Icon id="direction-bottom" />
      </motion.button>

      {/* 노이즈 오버레이 */}
      <AnimatePresence>
        {showNoise && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 opacity-30 dark:opacity-5"
          >
            <svg
              width="200"
              height="100"
              className="h-full w-full"
              preserveAspectRatio="none"
              viewBox="0 0 100 100"
            >
              <defs>
                <filter id="noiseFilter">
                  <feTurbulence
                    type="fractalNoise"
                    baseFrequency="5.0"
                    numOctaves="1"
                    stitchTiles="stitch"
                    result="noise"
                  />
                  <feColorMatrix
                    in="noise"
                    type="matrix"
                    values="1 0 0 0 0
                  0 1 0 0 0
                  0 0 1 0 0
                  0 0 0 30 -15"
                  />
                </filter>
              </defs>

              <rect
                width="100%"
                height="100%"
                fill="black"
                filter="url(#noiseFilter)"
              />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
