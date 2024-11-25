import S from "./Portfolio.module.scss";
import { useState, useEffect } from "react";
import { debounce } from "@/utils/debounce";
import { workData, otherData, skillsData } from "@/utils/temporaryData";
import PersonalSection from "@/components/Personal/PersonalSection";
import SkillList from "@/components/Skills/SkillList";
import ExperienceList from "@/components/Experience/ExperienceList";
import Footer from "@/components/App/Footer";

function Portfolio() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    const debouncedHandleResize = debounce(handleResize, 200);

    window.addEventListener("resize", debouncedHandleResize);
    return () => {
      window.removeEventListener("resize", debouncedHandleResize);
    };
  }, []);

  return (
    <div className={S.portfolio}>
      <PersonalSection isMobile={isMobile} />
      <div className={S.layout}>
        <SkillList skills={skillsData} />
        <ExperienceList title='Work Experience.' data={workData} />
        <ExperienceList title='Other Experience.' data={otherData} />
      </div>
      <Footer />
    </div>
  );
}

export default Portfolio;
