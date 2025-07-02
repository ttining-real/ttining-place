import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Agbalumo } from '@/fonts/font';
import { NAVIGATE } from '@/constants/navigate';
import Logo from '@/components/logo';
import { useIsMobile } from '@/hooks/useIsMobile';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const isMobile = useIsMobile();
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  }, [pathname]);

  return (
    <header
      className={`${Agbalumo.className} border-primary-lighter fixed top-0 right-0 left-0 z-50 flex h-16 items-center justify-between border-b bg-[rgba(255,255,255,0.2)] px-2 backdrop-blur-lg`}
    >
      <h1>
        <Logo />
      </h1>
      {isMobile && (
        <button
          type="button"
          className="flex h-6 w-6 cursor-pointer flex-col justify-between border-none bg-none px-0.5 py-1 sm:hidden"
          aria-label="메뉴 열기"
          aria-expanded={isMenuOpen}
          aria-pressed={isMenuOpen}
          aria-controls="main-nav"
          onClick={toggleMenu}
        >
          <span
            className={`bg-primary-darker block h-[2px] w-full origin-center rounded transition-transform duration-300 ease-in-out ${
              isMenuOpen ? 'translate-y-[7px] rotate-45' : ''
            }`}
          ></span>
          <span
            className={`bg-primary-darker block h-[2px] w-full rounded transition-opacity duration-300 ease-in-out ${
              isMenuOpen ? 'opacity-0' : ''
            }`}
          ></span>
          <span
            className={`bg-primary-darker block h-[2px] w-full origin-center rounded transition-transform duration-300 ease-in-out ${
              isMenuOpen ? 'translate-y-[-7px] -rotate-45' : ''
            }`}
          ></span>
        </button>
      )}
      {isMobile ? (
        <nav
          className={`fixed top-[64px] right-0 z-50 h-[calc(100vh-64px)] w-[80%] transform bg-white transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} `}
        >
          <ul className="flex flex-col gap-2 px-4 py-6">
            {NAVIGATE.map((nav) => {
              const isActive = pathname === nav.href;
              return (
                <li key={nav.label}>
                  <Link
                    href={nav.href}
                    className={`hover:bg-primary/20 block rounded px-4 py-3 text-base ${
                      isActive
                        ? 'text-primary-darkest bg-primary/20'
                        : 'text-primary-darker'
                    }`}
                  >
                    {nav.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      ) : (
        <nav>
          <ul className="flex flex-row items-center gap-4">
            {NAVIGATE.map((nav) => {
              const isActive = pathname === nav.href;
              return (
                <li key={nav.label}>
                  <Link
                    href={nav.href}
                    className={`hover-underline-animation px-4 py-3 text-sm ${
                      isActive
                        ? 'text-primary-darkest active'
                        : 'text-primary-darker'
                    }`}
                  >
                    <span className="relative">{nav.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </header>
  );
}
