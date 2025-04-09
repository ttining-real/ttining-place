import localFont from 'next/font/local';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import StackIcon from './stack-icon';
import LogoIcon from './logo-icon';

const gmarket = localFont({
  src: [
    {
      path: '../fonts/GmarketSansTTFBold.ttf',
      weight: '700',
    },
    {
      path: '../fonts/GmarketSansTTFMedium.ttf',
      weight: '400',
    },
    {
      path: '../fonts/GmarketSansTTFLight.ttf',
      weight: '100',
    },
  ],
  display: 'swap',
  variable: '--gmarketFont',
});

export default function Header() {
  const pathname = usePathname();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setTheme(mediaQuery.matches ? 'dark' : 'light');

    const handleChange = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const nav = [
    {
      href: '/about',
      name: 'About',
    },
    {
      href: '/experience',
      name: 'Experience',
    },
    {
      href: '/projects',
      name: 'Projects',
    },
    {
      href: '/contact',
      name: 'Contact',
    },
    {
      href: 'https://github.com/ttining-real',
      name: 'GitHub',
    },
    {
      href: 'https://velog.io/@ttining/posts',
      name: 'Velog',
    },
  ];

  return (
    <header className="flex h-14 items-center justify-between gap-6 bg-white px-6 shadow-sm">
      <h1>
        <Link href="/" aria-label="홈으로 이동">
          <LogoIcon id="light" />
        </Link>
      </h1>
      <nav
        className={`${gmarket.className} font-gmarket`}
        aria-label="주요 메뉴"
      >
        <ul className="flex items-center gap-1">
          {nav.map((menu, index) => {
            const isExternal = menu.href.startsWith('http');

            return (
              <li key={index}>
                {isExternal ? (
                  <a
                    href={menu.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-14 items-center px-4 text-base font-normal text-black"
                    aria-label={`안지인의 ${menu.name}으로 이동`}
                  >
                    <StackIcon id={menu.name} />
                  </a>
                ) : (
                  <Link
                    href={menu.href}
                    className="flex h-14 items-center px-4 text-base font-normal text-black"
                    aria-current={pathname === menu.href ? 'page' : undefined}
                  >
                    {menu.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
