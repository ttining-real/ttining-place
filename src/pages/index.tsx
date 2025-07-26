import Head from 'next/head';

// components
import HeroSection from '@/components/home/hero';
import StackSection from '@/components/home/stack';
import AboutSection from '@/components/home/about';

export default function Home() {
  return (
    <>
      <Head>
        <title>안지인 | 포트폴리오</title>
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:title" content="안지인 | 포트폴리오" />
        <meta
          property="og:description"
          content="UI 개발자 안지인의 포트폴리오입니다. 주요 프로젝트 및 경력을 확인하실 수 있습니다."
        />
        <meta
          name="description"
          content="UI 개발자 안지인의 포트폴리오입니다. 주요 프로젝트 및 경력을 확인하실 수 있습니다."
        />
      </Head>
      <HeroSection />
      <AboutSection />
      <StackSection />
    </>
  );
}
