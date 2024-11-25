import S from "./Resume.module.scss";
import WorkExperience from "@/components/Resume/WorkExperience";
import Footer from "@/components/App/Footer";
import { workExperienceData } from "@/utils/workExperienceData";
import { useRef } from "react";

function Resume() {
  const scrollContainerRef = useRef(null);

  return (
    <div ref={scrollContainerRef} className={S.resume}>
      <section className={S.section_wrap}>
        <h2>Work Experience.</h2>
        <div className={S.experience_wrap}>
          {workExperienceData.map((experience, index) => (
            <WorkExperience key={index} experience={experience} />
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Resume;
