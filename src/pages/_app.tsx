import '@/styles/globals.css';
import GlobalLayout from '@/layouts/global-layout';
import PageLayout from '@/layouts/page-layout';
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactNode) => React.ReactNode;
};

export default function App({
  Component,
  pageProps,
}: AppProps & {
  Component: NextPageWithLayout;
}) {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  // pathname 기반으로 레이아웃 선택
  const Layout = useMemo(() => {
    if (!isClient) return GlobalLayout;

    if (router.pathname === '/') {
      return GlobalLayout;
    }
    return PageLayout;
  }, [isClient, router.pathname]);

  const getLayout = Component.getLayout ?? ((page) => page);

  return <Layout>{getLayout(<Component {...pageProps} />)}</Layout>;
}
