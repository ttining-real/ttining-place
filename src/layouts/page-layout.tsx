import Footer from '@/components/app/footer';
import Header from '@/components/app/header';
import ScrollProgressBar from '@/components/progress-bar';
import TopButton from '@/components/top-button';
import { gmarket } from '@/fonts/font';
import { titleFormatter } from '@/lib/formetTitle';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

export default function PageLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const title = titleFormatter(router.pathname);
  return (
    <>
      <Header />
      <ScrollProgressBar />
      <main className={`${gmarket.className}`}>
        <div className="mt-[56px] flex h-24 items-end bg-[url(/images/page_title_background.png)] bg-cover sm:h-60">
          <h2 className="mx-auto w-full max-w-5xl px-6 pb-6 text-lg font-bold text-white sm:pb-16 sm:text-3xl">
            {title}
          </h2>
        </div>
        <div className="m-auto flex max-w-5xl flex-col gap-12 p-6">
          {children}
        </div>
      </main>
      <Footer />
      <TopButton />
    </>
  );
}
