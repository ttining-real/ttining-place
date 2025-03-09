import { func, string } from "prop-types";
import { useLocation } from "react-router-dom";

import Nav from "@/components/App/Menu/Menu";
import Switch from "@/components/Switch/Switch";

import S from "./Header.module.scss";
// import clsx from "clsx";

function Header({ theme, toggleTheme }) {
  const location = useLocation();

  const titles = {
    "/": "",
    "/about": "About",
    "/skills": "Skills",
    "/experience": "Experience",
    "/career": "Career",
    "/projects": "Projects",
  };

  const renderTitle = () => titles[location.pathname] || "ttining place";

  return (
    <>
      <header className={S.header}>
        <h1 className='title'>{renderTitle()}</h1>
        <Switch
          label={theme === "light" ? "Light" : "Dark"}
          labelId={theme === "light" ? "Dark Mode로 전환" : "Light Mode로 전환"}
          checked={theme === "dark"}
          onChange={toggleTheme}
        />
      </header>
      <Nav />
    </>
  );
}

Header.propTypes = {
  theme: string.isRequired,
  toggleTheme: func.isRequired,
};

export default Header;
