import S from "./Nav.module.scss";
import { string, func } from "prop-types";

function Nav() {
  return (
    <nav className={S.nav}>
      <ul>
        <li>
          <a href='/'>
            <img src='/assets/icons/home.svg' alt='' />
            <span className='body-xs'>Home</span>
          </a>
        </li>
        <li>
          <a href='/projects'>
            <img src='/assets/icons/rocket.svg' alt='' />
            <span className='body-xs'>Projects</span>
          </a>
        </li>
        <li>
          <a href='/resume'>
            <img src='/assets/icons/resume.svg' alt='' />
            <span className='body-xs'>Resume</span>
          </a>
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
