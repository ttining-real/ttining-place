import Visual from "@/components/Visual/Visual";
import Info from "@/components/Info/Info";
import {
  workExperienceData,
  otherExperienceData,
  skillsData,
} from "@/utils/data";

function Portfolio() {
  return (
    <>
      <Visual />
      <Info title='work-experience' type='detail' data={workExperienceData} />
      <Info title='other-experience' type='simple' data={otherExperienceData} />
      <Info title='skill' type='simple' data={skillsData} />
    </>
  );
}

export default Portfolio;
