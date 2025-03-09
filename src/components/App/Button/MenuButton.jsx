import { bool, func } from "prop-types";

import S from "./MenuButton.module.scss";

function MenuButton({ isMenuOpen, toggleMenu }) {
  const menuButtonClass = `${S.menu_button} ${isMenuOpen ? S.open : ""}`;

  return (
    <button
      type='button'
      className={menuButtonClass}
      aria-label='메뉴 열기'
      aria-expanded={isMenuOpen}
      aria-pressed={isMenuOpen}
      aria-controls='main-nav'
      onClick={toggleMenu}
    >
      <span className={S.bar}></span>
      <span className={S.bar}></span>
      <span className={S.bar}></span>
    </button>
  );
}

MenuButton.propTypes = {
  isMenuOpen: bool.isRequired,
  toggleMenu: func.isRequired,
};

export default MenuButton;
