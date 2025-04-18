import { useEffect, useState } from 'react';
import LogoIcon from '../logo-icon';
import NavDesktop from './nav-desktop';
import Link from 'next/link';
import NavMobile from './nav-mobile';

export default function Header() {
  const [isMobile, setIsMobile] = useState(false);

  // 화면 크기 변경 감지
  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)'); // 모바일 기준
    setIsMobile(mediaQuery.matches);

    const handleResize = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };

    mediaQuery.addEventListener('change', handleResize);
    return () => mediaQuery.removeEventListener('change', handleResize);
  }, []);

  return (
    <header className="fixed top-0 right-0 left-0 flex h-14 items-center justify-between gap-6 bg-white px-6 shadow-sm">
      <h1>
        <Link href="/" aria-label="홈으로 이동">
          <LogoIcon id="light" />
        </Link>
      </h1>
      {/* 화면 크기 변화에 따라 Nav 컴포넌트 변경 */}
      {isMobile ? <NavMobile /> : <NavDesktop />}
    </header>
  );
}
