import { Link } from "react-router-dom";
import S from "./Nav.module.scss";
import { string, func } from "prop-types";

function Nav() {
  return (
    <nav className={S.nav}>
      <ul>
        <li>
          <Link to='/'>
            <img src='/assets/icons/home.svg' alt='' />
            Home
          </Link>
        </li>
        <li>
          <Link to='/projects'>
            <img src='/assets/icons/rocket.svg' alt='' />
            Projects
          </Link>
        </li>
        <li>
          <Link to='/resume'>
            <img src='/assets/icons/resume.svg' alt='' />
            Resume
          </Link>
        </li>
      </ul>
    </nav>
  );
}

Nav.propTypes = {
  theme: string,
  toggleTheme: func,
};

export default Nav;
