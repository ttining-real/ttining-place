import PropTypes from "prop-types";

import S from "./Chip.module.scss";

function Chip({ text }) {
  return <span className={`body ${S.chip}`}>{text}</span>;
}

Chip.propTypes = {
  text: PropTypes.string,
};

export default Chip;
