import PropTypes from "prop-types";

import $ from "./SubTitle.module.scss";

function SubTitle({ title }) {
  return <h3 className={`${$.sub_title} subtitle`}>{title}</h3>;
}

SubTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

export default SubTitle;
