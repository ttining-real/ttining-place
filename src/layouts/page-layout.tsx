import { useRouter } from 'next/router';
import { ReactNode } from 'react';

import { Agbalumo, pretendard } from '@/fonts/font';
import Header from '@/components/header';
import ToTheTop from '@/components/to-the-top';
import Footer from '@/components/footer';

export default function PageLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = router.asPath;

  const titleMap: Record<string, string> = {
    '/about': 'about',
    '/resume': 'resume',
    '/experience': 'experience',
    '/projects': 'projects',
  };

  const matchedKey = Object.keys(titleMap).find((key) =>
    pathname?.startsWith(key),
  );
  const pageTitle = matchedKey ? titleMap[matchedKey] : 'Not Found';

  return (
    <>
      <Header />
      <main className={`${pretendard.className}`}>
        <header
          className={`${Agbalumo.className} bg-blue-200 bg-[url(/images/bg_subpage.png)] bg-cover bg-center pt-16`}
        >
          <h2 className="xs:text-[48px] m-auto max-w-5xl px-6 pt-20 pb-8 text-3xl text-white">
            {pageTitle}
          </h2>
        </header>
        {children}
        <ToTheTop />
      </main>
      <Footer />
    </>
  );
}
