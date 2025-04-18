'use client';

import type { Variants } from 'motion/react';
import * as motion from 'motion/react-client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { NAV_LIST, NavItemProps } from './nav-list';

export default function NavMobile() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { height } = useDimensions(containerRef);

  return (
    <div style={container}>
      <motion.nav
        initial={false}
        animate={isOpen ? 'open' : 'closed'}
        custom={height}
        ref={containerRef}
        style={{
          ...nav,
          pointerEvents: isOpen ? 'auto' : 'none',
        }}
      >
        <motion.div style={background} variants={sidebarVariants} />
        <Navigation setIsOpen={setIsOpen} />
        <MenuToggle
          toggle={() => setIsOpen(!isOpen)}
          style={{ pointerEvents: 'auto' }}
        />
      </motion.nav>
    </div>
  );
}

const navVariants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const Navigation = ({
  setIsOpen,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => (
  <motion.ul style={list} variants={navVariants}>
    {NAV_LIST.map((item, index) => (
      <MenuItem key={index} item={item} setIsOpen={setIsOpen} />
    ))}
  </motion.ul>
);

const itemVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

const MenuItem = ({
  item,
  setIsOpen,
}: {
  item: NavItemProps;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const handleMunuClick = () => {
    setIsOpen(false);
  };

  const renderContent = () => {
    if (item.type === 'link') {
      return (
        <Link
          href={item.href}
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          {item.name}
        </Link>
      );
    }

    if (item.type === 'external') {
      return (
        <a
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          {item.name}
        </a>
      );
    }

    if (item.type === 'button') {
      return (
        <button
          onClick={() => {
            console.log(`${item.name} 버튼 클릭됨`);
          }}
          style={{
            background: 'none',
            border: 'none',
            padding: 0,
            font: 'inherit',
            color: 'inherit',
            cursor: 'pointer',
          }}
        >
          {item.name}
        </button>
      );
    }

    return null;
  };
  return (
    <motion.li
      style={listItem}
      variants={itemVariants}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleMunuClick}
    >
      <div style={{ ...textPlaceholder }}>{renderContent()}</div>
    </motion.li>
  );
};

const sidebarVariants = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at calc(100% - 40px) 40px)`,
    transition: {
      type: 'spring',
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: 'circle(27px at calc(100% - 28px) 28px)',
    transition: {
      delay: 0.2,
      type: 'spring',
      stiffness: 400,
      damping: 40,
    },
  },
};

interface PathProps {
  d?: string;
  variants: Variants;
  transition?: { duration: number };
}

const Path = (props: PathProps) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke="hsl(0, 0%, 18%)"
    strokeLinecap="round"
    {...props}
  />
);

const MenuToggle = ({
  toggle,
  style,
}: {
  toggle: () => void;
  style?: React.CSSProperties;
}) => (
  <button style={{ ...toggleContainer, ...style }} onClick={toggle}>
    <svg width="23" height="23" viewBox="0 0 23 23">
      <Path
        variants={{
          closed: { d: 'M 2 2.5 L 20 2.5' },
          open: { d: 'M 3 16.5 L 17 2.5' },
        }}
      />
      <Path
        d="M 2 9.423 L 20 9.423"
        variants={{
          closed: { opacity: 1 },
          open: { opacity: 0 },
        }}
        transition={{ duration: 0.1 }}
      />
      <Path
        variants={{
          closed: { d: 'M 2 16.346 L 20 16.346' },
          open: { d: 'M 3 2.5 L 17 16.346' },
        }}
      />
    </svg>
  </button>
);

/**
 * ==============   Styles   ================
 */

const container: React.CSSProperties = {
  position: 'absolute',
  top: 0,
  right: 0,
  display: 'flex',
  flex: 1,
  alignItems: 'stretch',
  justifyContent: 'flex-start',
  width: '80vw',
  height: '100vh',
  backgroundColor: 'var(--accent)',
  borderRadius: 20,
  overflow: 'hidden',
};

const nav: React.CSSProperties = {
  width: '100%',
};

const background: React.CSSProperties = {
  backgroundColor: 'white',
  position: 'absolute',
  top: 0,
  bottom: 0,
  width: '100%',
};

const toggleContainer: React.CSSProperties = {
  position: 'absolute',
  top: 3,
  right: 3,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 50,
  height: 50,
  outline: 'none',
  border: 'none',
  borderRadius: '50%',
  background: 'white',
  WebkitUserSelect: 'none',
  MozUserSelect: 'none',
  cursor: 'pointer',
};

const list: React.CSSProperties = {
  listStyle: 'none',
  position: 'absolute',
  top: 80,
  display: 'flex',
  flexFlow: 'column nowrap',
  gap: 16,
  width: '100%',
  margin: 0,
  padding: 24,
  fontSize: 18,
  color: 'var(--black)',
  fontFamily: 'gmarket',
};

const listItem: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  margin: 0,
  padding: '16px 16px',
  cursor: 'pointer',
};

const textPlaceholder: React.CSSProperties = {
  borderRadius: 5,
  width: 200,
  height: 20,
  flex: 1,
};

/**
 * ==============   Utils   ================
 */

// Naive implementation - in reality would want to attach
// a window or resize listener. Also use state/layoutEffect instead of ref/effect
// if this is important to know on initial client render.
// It would be safer to  return null for unmeasured states.
const useDimensions = (ref: React.RefObject<HTMLDivElement | null>) => {
  const dimensions = useRef({ width: 0, height: 0 });

  useEffect(() => {
    if (ref.current) {
      dimensions.current.width = ref.current.offsetWidth;
      dimensions.current.height = ref.current.offsetHeight;
    }
  }, [ref]);

  return dimensions.current;
};
