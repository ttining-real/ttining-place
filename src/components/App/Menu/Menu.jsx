import { bool } from "prop-types";
import { Link } from "react-router-dom";

import S from "./Menu.module.scss";

function Menu({ isMenuOpen }) {
  const menuClass = `${S.menu} ${isMenuOpen ? "" : S.open}`;

  return (
    <nav className={menuClass}>
      <ul>
        <li>
          <Link to='/about' className='title'>
            About
          </Link>
        </li>
        <li>
          <Link to='/skills' className='title'>
            Skills
          </Link>
        </li>
        <li>
          <Link to='/experience' className='title'>
            Experience
          </Link>
        </li>
        <li>
          <Link to='/career' className='title'>
            Career
          </Link>
        </li>
        <li>
          <Link to='/projects' className='title'>
            Projects
          </Link>
        </li>
      </ul>
    </nav>
  );
}

Menu.propTypes = {
  isMenuOpen: bool.isRequired,
};

export default Menu;
