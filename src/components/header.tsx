import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

import { montserrat } from '@/fonts/font';
import { NAVIGATE } from '@/constants/navigate';
import Icon from '@/components/icon';
import { useThemeStore } from '@/stores/themeStore';

export default function Header() {
  const { theme, setTheme, toggleTheme } = useThemeStore();
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isDark = theme === 'dark';

  useEffect(() => {
    // 클라이언트 마운트 완료됨을 표시
    setMounted(true);

    // localStorage에서 테마 불러오기
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme === 'light' || savedTheme === 'dark') {
      setTheme(savedTheme);
    } else {
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)',
      ).matches;
      setTheme(prefersDark ? 'dark' : 'light');
    }
  }, [setTheme]);

  // 클라이언트 마운트 전에는 아무것도 렌더링하지 않음 → hydration mismatch 방지
  if (!mounted) return null;

  return (
    <header className="fixed top-2 right-2 left-2 z-50 flex items-center justify-between px-0 py-2 md:top-6 md:right-6 md:left-6 md:px-8">
      <h1 className={`${montserrat.className} text-xl font-semibold`}>
        <Link href="/" className="focus-ring rounded-4xl px-4 py-2">
          ANJIIN
        </Link>
      </h1>
      <nav className="bg-bg/80 relative hidden rounded-4xl p-2 shadow-md backdrop-blur-2xl sm:block">
        <ul
          className={`${montserrat.className} relative flex gap-2 font-medium uppercase`}
        >
          <AnimatePresence>
            {NAVIGATE.map(({ label, href, query }) => {
              const isActive =
                pathname === href || pathname.startsWith(`${href}/`);

              return (
                <li key={href} className="relative">
                  {isActive && (
                    <motion.div
                      layoutId="nav-active-bg"
                      className="bg-primary absolute inset-0 z-0 rounded-4xl"
                      transition={{
                        type: 'spring',
                        stiffness: 500,
                        damping: 30,
                      }}
                      initial={false}
                      exit={{ opacity: 0 }}
                    />
                  )}
                  <Link
                    href={query ? { pathname: href, query } : href}
                    className={`focus-ring hover:bg-primary-light/20 hover:text-primary relative z-10 inline-block rounded-4xl px-4 py-2 transition-colors duration-200 ${isActive ? 'text-white hover:text-white' : 'text-text-secondary'}`}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </AnimatePresence>
        </ul>
      </nav>

      {/* 모바일 메뉴 토글 버튼 */}
      <div className="flex items-center gap-4 md:gap-6">
        <Icon id={`mode-${theme}`} />
        <button
          type="button"
          role="switch"
          aria-checked={isDark}
          onClick={toggleTheme}
          aria-label={isDark ? '라이트모드로 전환' : '다크모드로 전환'}
          className="bg-disabled-text/50 focus-ring relative h-7 w-12 cursor-pointer rounded-full duration-300"
        >
          <span
            className={`bg-text-primary absolute top-1.5 left-1.5 h-4 w-4 rounded-2xl transition-transform duration-300 ${
              isDark ? 'translate-x-5' : ''
            }`}
          ></span>
        </button>

        {/* 햄버거 버튼: 모바일에서만 보임 */}
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="focus-ring z-50 flex h-8 w-8 cursor-pointer flex-col justify-between rounded-full px-2 py-2.5 sm:hidden"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'}
        >
          <span
            className={`bg-text-primary block h-[2px] w-full origin-center rounded transition-transform duration-300 ease-in-out ${
              menuOpen ? 'translate-y-[5px] rotate-45' : ''
            }`}
          ></span>
          <span
            className={`bg-text-primary block h-[2px] w-full rounded transition-opacity duration-300 ease-in-out ${
              menuOpen ? 'opacity-0' : ''
            }`}
          ></span>
          <span
            className={`bg-text-primary block h-[2px] w-full origin-center rounded transition-transform duration-300 ease-in-out ${
              menuOpen ? 'translate-y-[-5px] -rotate-45' : ''
            }`}
          ></span>
        </button>
      </div>

      {/* 모바일 메뉴 */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.2 }}
            className="bg-surface border-border absolute -top-2 -right-2 left-12 mt-0 h-screen border-l shadow-xl sm:hidden"
          >
            <ul className="flex flex-col gap-2 py-12">
              {NAVIGATE.map(({ label, href, query }) => {
                const isActive =
                  pathname === href || pathname.startsWith(`${href}/`);
                return (
                  <li key={href}>
                    <Link
                      href={query ? { pathname: href, query } : href}
                      className={`${montserrat.className} block w-full px-8 py-6 text-2xl font-semibold uppercase transition-colors ${
                        isActive
                          ? 'text-primary dark:text-white'
                          : 'text-text-secondary hover:text-primary-light active:text-primary-dark dark:hover:text-primary-light dark:active:text-primary dark:text-white/40'
                      }`}
                      onClick={() => setMenuOpen(false)}
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
