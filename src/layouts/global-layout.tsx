import Header from '@/components/header';
import localFont from 'next/font/local';
import { ReactNode } from 'react';

const pretendard = localFont({
  src: '../fonts/PretendardVariable.woff2',
  display: 'swap',
  variable: '--pretendardFont',
});

export default function GlobalLayout({ children }: { children: ReactNode }) {
  return (
    <div className={`${pretendard.className}`}>
      <Header />
      <main>{children}</main>
      <footer>@ttining</footer>
    </div>
  );
}
