import S from "./SkillList.module.scss";
import clsx from "clsx";
import { arrayOf, shape, string } from "prop-types";

function SkillList({ skills }) {
  return (
    <section className={clsx(S.section, S.section_skills)}>
      <h3 className={S.title}>Skills.</h3>
      {/* <p className='lbl-sm'>Overall</p> */}
      <ul>
        {skills.map((skill, index) => (
          <li key={index}>
            <span>
              <img src={skill.icon} alt={skill.alt} />
            </span>
            <dl>
              <dt className='body-sm'>{skill.title}</dt>
              <dd className='lbl-xs'>{skill.description}</dd>
            </dl>
          </li>
        ))}
      </ul>
    </section>
  );
}

SkillList.propTypes = {
  skills: arrayOf(
    shape({
      icon: string.isRequired, // 아이콘 경로
      title: string.isRequired, // 스킬 섹션 제목
      description: string.isRequired, // 설명 텍스트
    })
  ).isRequired,
};

export default SkillList;