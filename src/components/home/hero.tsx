import { motion, useReducedMotion } from 'framer-motion';

import { montserrat } from '@/fonts/font';

const headlineLines = [
  'Design Experiences',
  'Develop With Intent',
  'Deliver Results',
];

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="flex min-h-dvh items-center justify-center">
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
        <motion.div
          className="flex flex-col"
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
            <motion.h2
              key={idx}
              className={`${montserrat.className} xs:text-5xl text-4xl font-bold uppercase sm:text-6xl lg:text-8xl`}
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
            </motion.h2>
          ))}
        </motion.div>

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
