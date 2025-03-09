import SubTitle from "@/components/SubTitle/SubTitle";
import Timeline from "@/components/Timeline/Timeline";
import {
  YEAR_2016,
  YEAR_2017,
  YEAR_2018,
  YEAR_2019,
  YEAR_2020,
  YEAR_2021,
  YEAR_2022,
  YEAR_2023,
  YEAR_2024,
  YEAR_2025,
} from "@/mockData/Career";

import S from "./Career.module.scss";

function Career() {
  return (
    <main className={S.wrap}>
      <section>
        <SubTitle title='2025' />
        <Timeline list={YEAR_2025} />
      </section>
      <section>
        <SubTitle title='2024' />
        <Timeline list={YEAR_2024} />
      </section>
      <section>
        <SubTitle title='2023' />
        <Timeline list={YEAR_2023} />
      </section>
      <section>
        <SubTitle title='2022' />
        <Timeline list={YEAR_2022} />
      </section>
      <section>
        <SubTitle title='2021' />
        <Timeline list={YEAR_2021} />
      </section>
      <section>
        <SubTitle title='2020' />
        <Timeline list={YEAR_2020} />
      </section>
      <section>
        <SubTitle title='2019' />
        <Timeline list={YEAR_2019} />
      </section>
      <section>
        <SubTitle title='2018' />
        <Timeline list={YEAR_2018} />
      </section>
      <section>
        <SubTitle title='2017' />
        <Timeline list={YEAR_2017} />
      </section>
      <section>
        <SubTitle title='2016' />
        <Timeline list={YEAR_2016} />
      </section>
    </main>
  );
}

export default Career;
