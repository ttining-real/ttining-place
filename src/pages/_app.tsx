'use client';

import GlobalLayout from '@/layouts/global-layout';
import PageLayout from '@/layouts/page-layout';
import '@/styles/globals.css';
import { NextPage } from 'next';

import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactNode) => React.ReactNode;
};

export default function App({
  Component,
  pageProps,
}: AppProps & {
  Component: NextPageWithLayout;
}) {
  const router = useRouter();

  // pathname 기반으로 레이아웃 선택
  const Layout = useMemo(() => {
    if (router.pathname === '/') {
      return GlobalLayout;
    }
    return PageLayout;
  }, [router.pathname]);

  const getLayout = Component.getLayout ?? ((page) => page);

  return <Layout>{getLayout(<Component {...pageProps} />)}</Layout>;
}
