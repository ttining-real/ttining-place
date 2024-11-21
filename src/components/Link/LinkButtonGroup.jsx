import S from "./Link.module.scss";
import LinkButton from "@/components/Link/LinkButton";
import { arrayOf, shape, string } from "prop-types";

function LinkButtonGroup({ links }) {
  return (
    <ul className={S.link_button_group}>
      {links.map((link, index) => (
        <li key={index}>
          <LinkButton
            name={link.name}
            href={link.href}
            iconSrc={link.iconSrc}
          />
        </li>
      ))}
    </ul>
  );
}

// propTypes
LinkButtonGroup.propTypes = {
  links: arrayOf(
    // name과 href를 포함한 객체 배열
    shape({
      name: string.isRequired,
      href: string.isRequired,
    })
  ).isRequired,
};

export default LinkButtonGroup;
