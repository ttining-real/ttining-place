import Footer from '@/components/app/footer';
import Header from '@/components/app/header';
import ScrollProgressBar from '@/components/progress-bar';
import { pretendard } from '@/fonts/font';
import { ReactNode, useEffect, useState } from 'react';

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
