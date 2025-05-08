import Footer from '@/components/app/footer';
import Header from '@/components/app/header';
import ScrollProgressBar from '@/components/progress-bar';
import { pretendard } from '@/fonts/font';
import { ReactNode } from 'react';

export default function PageLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <ScrollProgressBar />
      <main className={`${pretendard.className} bg-blue-100 pt-[56px]`}>
        {children}
      </main>
      <Footer />
    </>
  );
}
