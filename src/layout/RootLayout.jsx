// import S from "./RootLayout.module.scss";
import { Helmet } from "react-helmet-async";
import { Suspense, useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Loading from "@/components/Loading/Loading";
import Header from "@/components/App/Header";
import Nav from "@/components/App/Nav";

function RootLayout() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    // 시스템의 다크 모드 설정 확인
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";

    // 로컬 스토리지에서 테마를 불러옴
    const storedTheme = localStorage.getItem("theme");

    // 로컬 스토리지의 테마가 있으면 그것을 사용하고, 없으면 시스템 테마를 사용
    const currentTheme = storedTheme || systemTheme;
    document.body.setAttribute("data-theme", currentTheme);
    setTheme(currentTheme);

    // 시스템 테마가 변경될 경우에 대한 리스너 설정
    const mediaQueryListener = (e) => {
      const newTheme = e.matches ? "dark" : "light";
      document.body.setAttribute("data-theme", newTheme);
      setTheme(newTheme);
      localStorage.removeItem("theme"); // 사용자 선택 제거
    };

    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", mediaQueryListener);

    // 컴포넌트 언마운트 시 리스너 제거
    return () => {
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener("change", mediaQueryListener);
    };
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    document.body.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

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
      <Header theme={theme} toggleTheme={toggleTheme} />
      <Suspense fallback={<Loading />}>
        <Outlet />
      </Suspense>
      <Nav />
    </>
  );
}

export default RootLayout;
