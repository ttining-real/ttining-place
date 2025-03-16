import { bool, func } from "prop-types";
import { Link } from "react-router-dom";

import S from "./Menu.module.scss";

function Menu({ isMenuOpen, isMenuClicked }) {
  const menuClass = `${S.menu} ${isMenuOpen ? "" : S.open}`;

  return (
    <nav className={menuClass}>
      <ul>
        <li>
          <Link to='/' className='title' onClick={isMenuClicked}>
            Home
          </Link>
        </li>
        <li>
          <Link to='/about' className='title' onClick={isMenuClicked}>
            About
          </Link>
        </li>
        <li>
          <Link to='/skills' className='title' onClick={isMenuClicked}>
            Skills
          </Link>
        </li>
        <li>
          <Link to='/experience' className='title' onClick={isMenuClicked}>
            Experience
          </Link>
        </li>
        <li>
          <Link to='/career' className='title' onClick={isMenuClicked}>
            Career
          </Link>
        </li>
        <li>
          <Link to='/projects' className='title' onClick={isMenuClicked}>
            Projects
          </Link>
        </li>
      </ul>
    </nav>
  );
}

Menu.propTypes = {
  isMenuOpen: bool.isRequired,
  isMenuClicked: func.isRequired,
};

export default Menu;
