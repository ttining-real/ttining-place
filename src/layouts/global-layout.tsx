import Footer from '@/components/footer';
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
    <>
      <Header />
      <div
        className={`${pretendard.className} mt-14 flex h-[calc(100%-56px)] flex-col overflow-auto`}
      >
        <main>{children}</main>
        <Footer />
      </div>
    </>
  );
}
