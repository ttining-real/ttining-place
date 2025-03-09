import SubTitle from "@/components/SubTitle/SubTitle";
import { SkillsData } from "@/mockData/Skills";

import S from "./Skills.module.scss";

function Skills() {
  return (
    <main className={S.wrap}>
      {SkillsData.map((item, index) => (
        <section key={index}>
          <SubTitle title={item.title} />
          <p className='body'>{item.description}</p>
          <div className={S.chip_set}>
            {item.chips.map((chip, chipIndex) => (
              <span key={chipIndex} className={`body ${S.chip}`}>
                {chip}
              </span>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}

export default Skills;
