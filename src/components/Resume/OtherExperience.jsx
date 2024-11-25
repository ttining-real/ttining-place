import S from "./OtherExperience.module.scss";
import PropTypes from "prop-types";

function OtherExperience({ data }) {
  return (
    <ul className={S.list}>
      {data.map((work, index) => (
        <li className={S.list_item} key={index}>
          <p className={S.tit}>{work.title}</p>
          {work.sub ? <p className={S.sub_text}>{work.sub}</p> : ""}
          {work.chips ? (
            <ul className={S.chips} aria-label={`${work.title} 관련 작업 내용`}>
              {work.chips.map((chip, chipIndex) => (
                <li className={S.chip} key={chipIndex}>
                  {chip}
                </li>
              ))}
            </ul>
          ) : (
            ""
          )}
          <p className={S.date}>
            <img
              src='/assets/icons/calendar.svg'
              alt={`${work.date} 기간`}
              className={S.calendar_icon}
            />
            {work.date}
          </p>
        </li>
      ))}
    </ul>
  );
}

OtherExperience.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      sub: PropTypes.string,
      chips: PropTypes.arrayOf(PropTypes.string),
      date: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default OtherExperience;
