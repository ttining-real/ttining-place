import { Suspense, useEffect } from "react";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Outlet } from "react-router-dom";

import MenuButton from "@/components/App/Button/MenuButton";
import Footer from "@/components/App/Footer/Footer";
import Header from "@/components/App/Header/Header";
import Menu from "@/components/App/Menu/Menu";
import themeStore from "@/store/themeStore";

function RootLayout() {
  // Theme
  const { initializeTheme, syncSystemTheme, toggleTheme, theme } = themeStore();

  useEffect(() => {
    // 초기 테마 설정
    initializeTheme();

    // 시스템 테마 변경 이벤트 리스너 추가
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemThemeChange = (e) => syncSystemTheme(e.matches);

    mediaQuery.addEventListener("change", handleSystemThemeChange);

    return () => {
      // 컴포넌트 언마운트 시 이벤트 리스너 제거
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
    };
  }, [initializeTheme, syncSystemTheme]);

  // Menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

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
      <Menu isMenuOpen={isMenuOpen} />
      <MenuButton isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      <Suspense>
        <Outlet />
        <Footer />
      </Suspense>
    </>
  );
}

export default RootLayout;
