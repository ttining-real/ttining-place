import Footer from '@/components/footer';
import Header from '@/components/header';
import ScrollProgressBar from '@/components/progress-bar';
import localFont from 'next/font/local';
import { ReactNode, useEffect, useState } from 'react';

const pretendard = localFont({
  src: '../fonts/PretendardVariable.woff2',
  display: 'swap',
  variable: '--pretendardFont',
});

export default function GlobalLayout({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState<boolean>(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');

    if (storedTheme === 'dark') {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    } else if (storedTheme === 'light') {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    } else {
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)',
      ).matches;
      document.documentElement.classList.toggle('dark', prefersDark);
      setIsDark(prefersDark);
    }
  }, []);

  return (
    <>
      <Header isDark={isDark} setIsDark={setIsDark} />
      <ScrollProgressBar />
      <main className={`${pretendard.className} pt-[56px]`}>{children}</main>
      <Footer />
    </>
  );
}
