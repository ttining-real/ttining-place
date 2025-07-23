import '@/styles/globals.css';

import Head from 'next/head';
import { NextPage } from 'next';
import { AppProps } from 'next/app';
// import { useRouter } from 'next/router';

import GlobalLayout from '@/layouts/global-layout';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactNode) => React.ReactNode;
};

export default function App({
  Component,
  pageProps,
}: AppProps & {
  Component: NextPageWithLayout;
}) {
  // const router = useRouter();

  // const subPageClassName = router.pathname !== '/';

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <GlobalLayout className={`${subPageClassName ? 'mt-20' : ''}`}> */}
      <GlobalLayout>{getLayout(<Component {...pageProps} />)}</GlobalLayout>
    </>
  );
}
