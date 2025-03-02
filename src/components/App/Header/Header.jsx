import { any } from "prop-types";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// import clsx from "clsx";
import Switch from "@/components/Switch/Switch";

import $ from "./Header.module.scss";

function Header({ theme, toggleTheme }) {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  // const closeMenu = () => {
  //   setIsMenuOpen(false);
  // };

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

  const navClass = `${$.nav_button} ${isMenuOpen ? "" : $.open}`;

  const titles = {
    "/": "",
    "/about": "About Me",
    "/skills": "Skills",
    "/experience": "Experience",
    "/projects": "Projects",
  };

  const renderTitle = () => titles[location.pathname] || "ttining place";

  return (
    <header className={$.header}>
      <h1>{renderTitle()}</h1>
      <button
        type='button'
        className={navClass}
        aria-label='메뉴 열기'
        aria-expanded={isMenuOpen}
        aria-pressed={isMenuOpen}
        aria-controls='main-nav'
        onClick={toggleMenu}
      >
        <span className={$.bar}></span>
        <span className={$.bar}></span>
        <span className={$.bar}></span>
      </button>
      <Switch
        label={theme === "light" ? "Light" : "Dark"}
        labelId={theme === "light" ? "Dark Mode로 전환" : "Light Mode로 전환"}
        checked={theme === "dark"}
        onChange={toggleTheme}
      />
    </header>
  );
}

Header.propTypes = {
  theme: any,
  toggleTheme: any,
};

export default Header;
