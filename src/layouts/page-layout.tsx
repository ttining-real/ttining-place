import Footer from '@/components/footer';
import Header from '@/components/header';
import ToTheTop from '@/components/to-the-top';
import { Agbalumo, pretendard } from '@/fonts/font';
// import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

export default function PageLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = router.asPath;

  const titleMap: Record<string, string> = {
    '/about': 'about',
    '/careers': 'careers',
    '/projects': 'projects',
    '/example': 'example',
  };

  const matchedKey = Object.keys(titleMap).find((key) =>
    pathname?.startsWith(key),
  );
  const pageTitle = matchedKey ? titleMap[matchedKey] : '';

  return (
    <>
      <Header />
      <main className={`${pretendard.className}`}>
        <div
          className={`${Agbalumo.className} h-full bg-[url(/images/bg_subpage.png)] bg-cover bg-center px-6 pt-14 pb-6`}
        >
          <h2 className="m-auto max-w-5xl px-6 pt-10 text-2xl text-white sm:pt-20 sm:text-4xl">
            {pageTitle}
          </h2>
        </div>
        {children}
        <ToTheTop />
      </main>
      <Footer />
    </>
  );
}
