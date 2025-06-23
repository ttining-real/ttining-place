'use client';

import { AnimatePresence, motion, wrap } from 'motion/react';
import { Children, forwardRef, ReactNode, useState } from 'react';
import Icon from '@/components/icon';

type CarouselProps = {
  children: ReactNode;
  className?: string;
};

export default function Carousel({ children, className }: CarouselProps) {
  const ITEMS_SLIDE = 3;

  // children을 배열로 변환
  const childArray = Children.toArray(children);

  const chunks = Array.from(
    { length: Math.ceil(childArray.length / ITEMS_SLIDE) },
    (_, i) => childArray.slice(i * ITEMS_SLIDE, i * ITEMS_SLIDE + ITEMS_SLIDE),
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  function paginate(newDirection: 1 | -1) {
    const nextIndex = wrap(0, chunks.length, selectedIndex + newDirection);
    setSelectedIndex(nextIndex);
    setDirection(newDirection);
  }

  const color = `var(--color-primary)`;

  return (
    <div style={container} className={className}>
      <AnimatePresence custom={direction} initial={false} mode="popLayout">
        <Slide key={selectedIndex} direction={direction}>
          {chunks[selectedIndex]}
        </Slide>
      </AnimatePresence>
      {childArray.length > ITEMS_SLIDE && (
        <div className="absolute top-[-80px] right-0 flex gap-2">
          <motion.button
            initial={false}
            aria-label="이전 슬라이드"
            style={button}
            onClick={() => paginate(-1)}
            whileFocus={{ outline: `2px solid ${color}` }}
            whileTap={{ scale: 0.9 }}
          >
            <Icon id="arrow-left" size={24} />
          </motion.button>
          <motion.button
            initial={false}
            aria-label="다음 슬라이드"
            style={button}
            onClick={() => paginate(1)}
            whileFocus={{ outline: `2px solid ${color}` }}
            whileTap={{ scale: 0.9 }}
          >
            <Icon id="arrow-right" size={24} />
          </motion.button>
        </div>
      )}
    </div>
  );
}

const Slide = forwardRef(function Slide(
  {
    direction,
    children,
  }: {
    direction: 1 | -1;
    children: ReactNode;
  },
  ref: React.Ref<HTMLDivElement>,
) {
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: direction * 100 }}
      animate={{
        opacity: 1,
        x: 0,
        transition: {
          type: 'spring',
          visualDuration: 0.4,
          bounce: 0.4,
        },
      }}
      exit={{ opacity: 0, x: direction * -100 }}
      style={box}
    >
      <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-3">
        {children}
      </div>
    </motion.div>
  );
});

/**
 * ==============   Styles   ================
 */

const container: React.CSSProperties = {
  position: 'relative',
};

const box: React.CSSProperties = {
  flex: '1',
  display: 'flex',
  flexFlow: 'column nowrap',
  alignItems: 'center',
  gap: 24,
  height: 'auto',
  textAlign: 'left',
  borderRadius: '10px',
};

const button: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 40,
  height: 40,
  color: 'var(--color-primary)',
  outlineOffset: 2,
  // borderRadius: '50%',
  backgroundColor: 'transparent',
};
