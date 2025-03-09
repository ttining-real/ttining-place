import SubTitle from "@/components/SubTitle/SubTitle";
import Timeline from "@/components/Timeline/Timeline";
import { OtherList, WorkList } from "@/mockData/Experience";

import S from "./Experience.module.scss";

function Experience() {
  return (
    <main className={S.wrap}>
      <section>
        <SubTitle title='Work Experience' />
        <Timeline list={WorkList} />
      </section>
      <section>
        <SubTitle title='Other Experience' />
        <Timeline list={OtherList} />
      </section>
    </main>
  );
}

export default Experience;
