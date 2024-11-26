import S from "./TimelineItem.module.scss";
import { string } from "prop-types";

// startDate, endDate,
function TimelineItem({ title, affiliated, description }) {
  return (
    <li className={S.item}>
      <p className={S.affiliated}>{affiliated}</p>
      <p className={S.title}>{title}</p>
      {/* <p className={S.date}>
        <time dateTime={startDate}>{startDate}</time> -{" "}
        <time dateTime={endDate}>{endDate}</time>
      </p> */}
      {description ? <p className={S.desc}>{description}</p> : ""}
    </li>
  );
}

TimelineItem.propTypes = {
  startDate: string,
  endDate: string,
  title: string.isRequired,
  affiliated: string.isRequired,
  description: string,
};

export default TimelineItem;
