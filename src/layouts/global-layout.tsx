import Footer from '@/components/app/footer';
import Header from '@/components/app/header';
import ScrollProgressBar from '@/components/progress-bar';
import { gmarket } from '@/fonts/font';
import { ReactNode } from 'react';

export default function GlobalLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <ScrollProgressBar />
      <main className={`${gmarket.className} pt-[56px]`}>{children}</main>
      <Footer />
    </>
  );
}
