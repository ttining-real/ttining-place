// import S from "./RootLayout.module.css";
import { Helmet } from "react-helmet-async";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Loading from "@/components/Loading/Loading";

function RootLayout() {
  return (
    <>
      <Helmet>
        <title>띠닝의 포트폴리오</title>
        <meta property='og:title' content='띠닝의 포트폴리오' />
        <meta property='twitter:title' content='띠닝의 포트폴리오' />
        <meta property='og:type' content='website' />
        <meta
          property='og:url'
          content='https://github.com/ttining-real/ttining-place'
        />
        <meta
          name='description'
          content='반갑습니다. UI 개발자 안지인입니다.'
        />
        <meta
          property='og:description'
          content='반갑습니다. UI 개발자 안지인입니다.'
        />
        <meta
          property='og:image'
          content='https://github.com/ttining-real/ttining-place/blob/Develop/public/logo_192.png'
        />
        <meta property='og:site_name' content='띠닝의 포트폴리오' />
        <meta property='og:site_author' content='안지인' />
      </Helmet>
      <Suspense fallback={<Loading />}>
        <Outlet />
      </Suspense>
    </>
  );
}

export default RootLayout;
