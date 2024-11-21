import S from "./Link.module.scss";
import clsx from "clsx";
import { string } from "prop-types";

function LinkButton({ name, href, iconSrc }) {
  return (
    <a href={href} className={clsx("lbl-sm", S.link_button)}>
      <span>
        <img src={iconSrc} alt='' />
      </span>
      {name}
    </a>
  );
}

// propTypes
LinkButton.propTypes = {
  name: string.isRequired,
  href: string.isRequired,
  iconSrc: string.isRequired,
};

export default LinkButton;
