import S from "./ExperienceList.module.scss";
import clsx from "clsx";
import { string, arrayOf, shape } from "prop-types";

function ExperienceList({ title, data }) {
  return (
    <section className={clsx(S.section, S.section_list)}>
      <h3 className={S.title}>{title}</h3>
      <ul className={S.list_wrap}>
        {data.map((item, index) => (
          <li key={index} className={S.list_item}>
            <dl>
              <dt>{item.title}</dt>
              {item.sub && <dd>{item.sub}</dd>}
              {item.chips && (
                <dd className={S.chips}>
                  {item.chips.map((chip, chipIndex) => (
                    <span key={chipIndex}>{chip}</span>
                  ))}
                </dd>
              )}
              <dd className={S.date}>
                <img src='/assets/icons/calendar.svg' alt='달력 이모지' />
                {item.date}
              </dd>
            </dl>
          </li>
        ))}
      </ul>
    </section>
  );
}

ExperienceList.propTypes = {
  title: string.isRequired, // 섹션 제목
  data: arrayOf(
    shape({
      title: string.isRequired, // 경험 제목
      sub: string, // 부가 설명 (옵션)
      chips: arrayOf(string), // 태그 목록 (옵션)
      date: string.isRequired, // 날짜
    })
  ).isRequired,
};

export default ExperienceList;
