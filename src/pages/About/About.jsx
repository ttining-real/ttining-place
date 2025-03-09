import SubTitle from "@/components/SubTitle/SubTitle";
import Timeline from "@/components/Timeline/Timeline";
import { CertificationList, EducationList } from "@/mockData/About";

import S from "./About.module.scss";

function About() {
  return (
    <main className={S.wrap}>
      <h2 className='title'>About</h2>
      <section>
        <SubTitle title='Introduction' />
        <div className={`body ${S.intro}`}>
          <p>
            안녕하세요. 기술과 디자인의 접점에서
            <br />
            사용자 중심의 웹 환경을 개선해나가는 안지인입니다.
          </p>
          <p>
            7년간 UX/UI 디자인과 퍼블리싱 경험을 쌓으며,
            <br />
            사용자 친화적인 인터페이스 설계와
            <br />
            반응형 웹 개발에 집중해왔습니다.
          </p>
          <p>
            최근에는 프론트엔드 기술을 학습하며,
            <br />
            컴포넌트 기반 설계와 아토믹 디자인 시스템을 활용해
            <br />
            보다 효율적이고 완성도 높은 결과물을 만들어가고 있습니다.
          </p>
          <p>
            이전 경험을 바탕으로 기획부터 개발까지 모든 과정을 아우르며,
            <br />
            시맨틱 태그 사용과 ARIA 속성을 적극적으로 활용하고
            <br />웹 접근성을 고려하는 작업에 깊은 관심을 가지고 있습니다.
          </p>
          <p>
            사용자에게 쉽고 편리한 경험을 제공하며,
            <br />더 나은 웹 환경을 만드는 것이 제 목표입니다.
          </p>
        </div>
      </section>
      <section>
        <SubTitle title='Education' />
        <Timeline list={EducationList} />
      </section>
      <section>
        <SubTitle title='Certification' />
        <Timeline list={CertificationList} />
      </section>
    </main>
  );
}

export default About;
