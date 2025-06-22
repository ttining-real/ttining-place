import { pretendard } from '@/fonts/font';
import { ReactNode } from 'react';

// components
import Header from '@/components/header';
import Footer from '@/components/footer';
import ToTheTop from '@/components/to-the-top';

export default function GlobalLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main className={`${pretendard.className}`}>
        {children}
        <ToTheTop />
      </main>
      <Footer />
    </>
  );
}
