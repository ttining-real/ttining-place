import Chip from "@/components/Chip/Chip";
import SubTitle from "@/components/SubTitle/SubTitle";
import { SkillsData } from "@/mockData/Skills";

import S from "./Skills.module.scss";

function Skills() {
  return (
    <>
      {SkillsData.map((item, index) => (
        <section key={index} className={S.section}>
          <SubTitle title={item.title} />
          <p className='body'>{item.description}</p>
          <div className={S.chip_set}>
            {item.chips.map((chip, chipIndex) => (
              <Chip key={chipIndex} text={chip} />
            ))}
          </div>
        </section>
      ))}
    </>
  );
}

export default Skills;
