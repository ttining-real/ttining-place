import { motion, useReducedMotion } from 'framer-motion';

import { montserrat } from '@/fonts/font';
import { useEffect, useState } from 'react';

const headlineLines = [
  'Design Experiences',
  'Develop With Intent',
  'Deliver Results',
];

export default function HeroSection() {
  const shouldReduceMotion = useReducedMotion();
  const [showNoise, setShowNoise] = useState(false);

  useEffect(() => {
    // 노이즈 1초 후 렌더링
    const timeout = setTimeout(() => setShowNoise(true), 1000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section className="bg-background relative flex min-h-dvh items-center justify-center overflow-hidden">
      {/* 그라디언트 배경 */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 bg-[conic-gradient(from_180deg_at_70%_60%,rgba(83,85,90,0.6),transparent_80%)] opacity-40"
      />
      {/* 노이즈 오버레이 */}
      {showNoise && (
        <div
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
        </div>
      )}

      <motion.div
        className="flex flex-col gap-32 px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.6 }} // 다시 스크롤 시 재진입
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.2,
            },
          },
        }}
      >
        <h2 className="sr-only">Introduce</h2>

        <motion.h3
          className="flex flex-col gap-0 sm:gap-4"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
        >
          {headlineLines.map((line, idx) => (
            <motion.p
              key={idx}
              className={`${montserrat.className} text-4xl font-bold uppercase sm:text-5xl md:text-6xl lg:text-7xl`}
              variants={{
                hidden: { opacity: 0, y: shouldReduceMotion ? 0 : -60 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: shouldReduceMotion
                    ? { duration: 0.01 }
                    : { type: 'spring', stiffness: 300, damping: 20 },
                },
              }}
            >
              {line}
            </motion.p>
          ))}
        </motion.h3>

        <motion.h4
          className="text-base leading-relaxed sm:text-lg"
          variants={{
            hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 30 },
            visible: {
              opacity: 1,
              y: 0,
              transition: shouldReduceMotion
                ? { duration: 0.01 }
                : { duration: 0.8, ease: 'easeOut', delay: 0.2 },
            },
          }}
        >
          <span className="block">사용자 경험을 중심에 두고,</span>
          <span className="block">목적있는 개발과 결과에 집중하는</span>
          <span className="block">디자이너이자 개발자 안지인입니다.</span>
        </motion.h4>
      </motion.div>
    </section>
  );
}
