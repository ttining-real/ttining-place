import { motion, useReducedMotion } from 'framer-motion';

import { montserrat } from '@/fonts/font';

const headlineLines = [
  'Design Experiences',
  'Develop With Intent',
  'Deliver Results',
];

export default function HeroSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="bg-background relative flex min-h-dvh items-center justify-center overflow-hidden">
      {/* 그라디언트 배경 */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 bg-[conic-gradient(from_180deg_at_70%_60%,rgba(83,85,90,0.6),transparent_80%)] opacity-40"
      />

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

        <motion.p
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
        </motion.p>
      </motion.div>
    </section>
  );
}
