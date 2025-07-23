import { ReactNode, useRef } from 'react';
import { motion, useInView, Easing } from 'framer-motion';

type SectionLayoutProps = {
  outerClassName?: string;
  innerClassName?: string;
  children: ReactNode;
};

export default function SectionLayout({
  outerClassName = '',
  innerClassName = '',
  children,
}: SectionLayoutProps) {
  const ref = useRef<HTMLElement>(null);

  const isInView = useInView(ref, {
    margin: '-20% 0px -20% 0px',
  });

  const easeOut: Easing = [0.42, 0, 0.58, 1];

  const variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: easeOut },
    },
  };

  return (
    <motion.section
      ref={ref}
      aria-label="section layout"
      className={`px-6 py-20 ${outerClassName}`}
      variants={variants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      <div
        className={`m-auto flex max-w-5xl flex-col gap-6 2xl:max-w-7xl ${innerClassName}`}
      >
        {children}
      </div>
    </motion.section>
  );
}
