import S from "./Header.module.scss";
import clsx from "clsx";
import { string, func } from "prop-types";

function Header({ theme, toggleTheme }) {
  return (
    <header className={S.header}>
      <h1 className={clsx("hdg-sm", S.logo)}>
        <a href='/'>ttining place</a>
      </h1>
      <div className={S.switch_checkbox}>
        <label>
          <span className='lbl-xs'>
            <img src='/assets/icons/sun.svg' alt='' />
            {/* {theme === "light" ? "라이트 모드" : "다크 모드"} */}
          </span>
          <input
            role='switch'
            type='checkbox'
            checked={theme === "dark"}
            onChange={toggleTheme}
          />
          <span className='lbl-xs'>
            <img src='/assets/icons/moon.svg' alt='' />
          </span>
        </label>
      </div>
    </header>
  );
}

Header.propTypes = {
  theme: string,
  toggleTheme: func,
};

export default Header;
