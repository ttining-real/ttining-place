import { ReactNode } from 'react';

// components
import Header from '@/components/header';
import Footer from '@/components/footer';
import ToTheTop from '@/components/to-the-top';

export default function GlobalLayout({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <>
      <Header />
      <main className={className}>
        {children}
        <ToTheTop />
      </main>
      <Footer />
    </>
  );
}
