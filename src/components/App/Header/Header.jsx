import { any } from "prop-types";
import { useLocation } from "react-router-dom";

import $ from "./Header.module.scss";
// import clsx from "clsx";

function Header({ theme, toggleTheme }) {
  const location = useLocation();

  const renderTitle = () => {
    if (location.pathname === "/test") {
      return "test";
    } else {
      return "Untitled";
    }
  };

  return (
    <header className={$.header}>
      <h1>{renderTitle()}</h1>
      <div className={$.switch_checkbox}>
        <label id='theme-label'>
          {theme === "light" ? (
            <span>
              <img src='/assets/icons/sun.svg' alt='' />
            </span>
          ) : (
            <span>
              <img src='/assets/icons/moon.svg' alt='' />
            </span>
          )}
          <input
            role='switch'
            type='checkbox'
            aria-labelledby='theme-label'
            aria-checked={theme === "dark"}
            checked={theme === "dark"}
            className={$.checkbox}
            onChange={toggleTheme}
          />
        </label>
      </div>
    </header>
  );
}

Header.propTypes = {
  theme: any,
  toggleTheme: any,
};

export default Header;
