import S from "./projects.module.scss";
import { useRef } from "react";
// import Ready from "@/pages/Ready/Ready";
import Footer from "@/components/App/Footer";
import { projectsData } from "./projectsData";
import TimelineItem from "@/components/Projects/Timeline";

function Projects() {
  // throw new Error("프로젝트 데이터를 불러오는 중 오류 발생!");
  // throw new Response("프로젝트 데이터를 불러오는 중 오류 발생!", {
  //   status: 500,
  //   statusText: "서버 에러",
  // });

  const scrollContainerRef = useRef(null);

  // function formatDate(date) {
  //   if (!date) return "";
  //   const [year, month] = date.split("-");
  //   return `${year}. ${month}`;
  // }

  // const formattedTimelineData = projectsData.map((item) => ({
  //   ...item,
  //   displayStartDate: formatDate(item.startDate),
  //   displayEndDate: formatDate(item.endDate),
  // }));

  return (
    <div ref={scrollContainerRef} className={S.projects}>
      <h2>Projects.</h2>
      <section className={S.section_wrap} aria-labelledby='timeline-heading'>
        <h3 id='timeline-heading'>Timeline</h3>
        <ul className={S.list}>
          {projectsData.map((item, index) => (
            <TimelineItem
              key={index}
              startDate={item.displayStartDate}
              endDate={item.displayEndDate}
              title={item.title}
              affiliated={item.affiliated}
              description={item.description}
            />
          ))}
        </ul>
      </section>
      <Footer />
    </div>
  );
}

export default Projects;
