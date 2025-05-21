import Link from 'next/link';
import LogoIcon from '../icon/logo-icon';
import { gmarket } from '@/fonts/font';
import ThemeToggleButton from '../theme-toggle-button';
import { useThemeStore } from '@/stores/themeStore';
import { useEffect, useState } from 'react';
import { MENU_LIST } from '@/dummy/menu-list';

export default function Header() {
  const { theme } = useThemeStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <header
      className={`${gmarket.className} bg-gray-60 fixed top-0 right-0 left-0 z-10 flex h-14 items-center justify-between px-6`}
    >
      <h1>
        <Link href="/">
          <LogoIcon id={theme === 'dark' ? 'dark' : 'light'} />
        </Link>
      </h1>
      <div className="flex h-full items-center gap-4 md:gap-8">
        {/* 데스크탑 메뉴 (640px 이상에서만 보임) */}
        <nav className="dark:text-gray-10 hidden h-full gap-3 text-black/60 md:flex">
          {MENU_LIST.map((menu) => (
            <Link
              key={menu.label}
              href={`/${menu.source}`}
              className="hover:text-primary before:bg-primary/20 relative flex items-center px-2 transition-colors duration-200 before:absolute before:right-0 before:bottom-0 before:left-0 before:h-2 before:origin-bottom before:scale-y-0 before:transition-transform before:duration-300 before:content-[''] hover:before:scale-y-100 dark:before:bg-indigo-300/30 dark:hover:text-indigo-300"
            >
              {menu.label}
            </Link>
          ))}
        </nav>
        <ThemeToggleButton />
        <button
          type="button"
          className="flex h-6 w-6 cursor-pointer flex-col justify-between border-none bg-none px-0.5 py-1 md:hidden"
          aria-label="메뉴 열기"
          aria-expanded={isMenuOpen}
          aria-pressed={isMenuOpen}
          aria-controls="main-nav"
          onClick={toggleMenu}
        >
          <span
            className={`bg-gray-10 block h-[2px] w-full origin-center rounded transition-transform duration-300 ease-in-out ${
              isMenuOpen ? 'translate-y-[7px] rotate-45' : ''
            }`}
          ></span>
          <span
            className={`bg-gray-10 block h-[2px] w-full rounded transition-opacity duration-300 ease-in-out ${
              isMenuOpen ? 'opacity-0' : ''
            }`}
          ></span>
          <span
            className={`bg-gray-10 block h-[2px] w-full origin-center rounded transition-transform duration-300 ease-in-out ${
              isMenuOpen ? 'translate-y-[-7px] -rotate-45' : ''
            }`}
          ></span>
        </button>
        {/* 모바일 펼쳐짐 메뉴 */}
        {isMenuOpen && (
          <div className="absolute top-[56px] right-0 left-0 flex h-[calc(100vh-56px)] justify-end bg-black/30 md:hidden dark:bg-black/70">
            <nav className="bg-gray-60 flex h-full w-4/5 flex-col gap-4 py-6 text-black/60 dark:bg-gray-50 dark:text-white/80">
              {MENU_LIST.map((menu) => (
                <Link
                  key={menu.label}
                  href={`/${menu.source}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="hover:text-primary before:bg-primary/20 relative flex items-center px-8 py-4 transition-colors duration-200 before:absolute before:top-0 before:bottom-0 before:left-0 before:h-full before:w-2 before:origin-left before:scale-x-0 before:transition-transform before:duration-300 before:content-[''] hover:before:scale-x-100 dark:before:bg-indigo-300/30 dark:hover:text-indigo-300"
                >
                  {menu.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
