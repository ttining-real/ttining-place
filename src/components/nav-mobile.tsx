'use client';

import type { Variants } from 'framer-motion';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

interface NavItem {
  type: 'link' | 'button' | 'external link';
  href: string;
  name: string;
}

interface NavMobileProps {
  nav: NavItem[];
}

export default function NavMobile({ nav }: NavMobileProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { height } = useDimensions(containerRef);

  return (
    <div style={{ ...container, pointerEvents: isOpen ? 'auto' : 'none' }}>
      <motion.nav
        initial={false}
        animate={isOpen ? 'open' : 'closed'}
        custom={height}
        ref={containerRef}
        style={navStyle}
      >
        <motion.div style={background} variants={sidebarVariants} />
        <Navigation navList={nav} />
      </motion.nav>
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          zIndex: 100,
          pointerEvents: 'auto',
        }}
      >
        <MenuToggle toggle={() => setIsOpen(!isOpen)} />
      </div>
    </div>
  );
}

const navVariants: Variants = {
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

const Navigation = ({ navList }: { navList: NavItem[] }) => (
  <motion.ul style={list} variants={navVariants}>
    {navList.map((item, i) => (
      <MenuItem item={item} key={i} />
    ))}
  </motion.ul>
);

const itemVariants: Variants = {
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

const MenuItem = ({ item }: { item: NavItem }) => {
  const { type, href, name } = item;

  const renderContent = () => {
    switch (type) {
      case 'link':
        return (
          <Link
            href={href}
            style={{ color: 'inherit', textDecoration: 'none' }}
          >
            {name}
          </Link>
        );

      case 'external link':
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'inherit', textDecoration: 'none' }}
          >
            {name}
          </a>
        );

      case 'button':
      default:
        return (
          <button
            onClick={() => {
              window.location.href = href;
            }}
            style={{
              color: 'inherit',
              background: 'none',
              border: 'none',
              padding: 0,
              font: 'inherit',
              cursor: 'pointer',
            }}
          >
            {name}
          </button>
        );
    }
  };

  return (
    <motion.li
      style={listItem}
      variants={itemVariants}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <div style={{ ...textPlaceholder }}>{renderContent()}</div>
    </motion.li>
  );
};

// background toggle
const sidebarVariants: Variants = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at calc(100% - 40px) 40px)`,
    transition: {
      type: 'spring',
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: 'circle(26px at calc(100% - 28px) 28px)',
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

const MenuToggle = ({ toggle }: { toggle: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
    toggle();
  };

  return (
    <button onClick={handleClick} style={toggleContainer}>
      <motion.svg
        width="23"
        height="23"
        viewBox="0 0 23 23"
        animate={isOpen ? 'open' : 'closed'}
      >
        <Path
          variants={{
            closed: { d: 'M 2 2.5 L 20 2.5' },
            open: { d: 'M 3 16.5 L 17 2.5' },
          }}
        />
        <Path
          variants={{
            closed: { d: 'M 2 9.423 L 20 9.423', opacity: 1 },
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
      </motion.svg>
    </button>
  );
};

/**
 * ==============   Styles   ================
 */

const container: React.CSSProperties = {
  position: 'absolute',
  top: 0,
  right: 0,
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'stretch',
  flex: 1,
  width: '80vw',
  height: '100vh',
  backgroundColor: 'transparent',
};

const navStyle: React.CSSProperties = {
  width: '100%',
};

const background: React.CSSProperties = {
  backgroundColor: 'white',
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  width: '100%',
};

const toggleContainer: React.CSSProperties = {
  outline: 'none',
  border: 'none',
  WebkitUserSelect: 'none',
  MozUserSelect: 'none',
  cursor: 'pointer',
  position: 'absolute',
  top: 4,
  right: 4,
  width: 48,
  height: 48,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'white',
};

const list: React.CSSProperties = {
  listStyle: 'none',
  position: 'absolute',
  top: 56,
  display: 'flex',
  flexFlow: 'column',
  gap: 24,
  width: '100%',
  margin: 0,
  padding: 24,
};

const listItem: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  listStyle: 'none',
  cursor: 'pointer',
};

const textPlaceholder: React.CSSProperties = {
  fontSize: 18,
  color: 'var(--black)',
  fontFamily: 'gmarket',
};

/**
 * ==============   Utils   ================
 */

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
