import S from "./Skills.module.scss";
import PropTypes from "prop-types";
import { useState } from "react";
import Dialog from "@/components/Dialog/Dialog";
import { skillData } from "./skillsData";

// SkillButton 컴포넌트
function SkillButton({ src, alt, onClick }) {
  return (
    <li className={S.item}>
      <button onClick={onClick}>
        <img src={src} alt={alt} />
      </button>
    </li>
  );
}

SkillButton.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

function Skills() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);

  const handleSkillClick = (skill) => {
    setSelectedSkill(skill);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedSkill(null);
  };

  return (
    <>
      <ul className={S.skills}>
        {skillData.map((skill) => (
          <SkillButton
            key={skill.alt}
            src={skill.src}
            alt={skill.alt}
            onClick={() => handleSkillClick(skill)}
          />
        ))}
      </ul>
      <Dialog isOpen={isDialogOpen} onClose={handleCloseDialog}>
        <div className={S.dialog_wrap}>
          <h3>{selectedSkill?.title + "."}</h3>
          <ul className={S.dialog_cont}>
            {selectedSkill?.description &&
            Array.isArray(selectedSkill.description) &&
            selectedSkill.description.length > 0
              ? selectedSkill.description.map((item, index) => (
                  <li key={index}>{item}</li>
                ))
              : null}

            {/* tools 배열이 있을 경우에만 렌더링 */}
            {selectedSkill?.tools &&
            Array.isArray(selectedSkill.tools) &&
            selectedSkill.tools.length > 0 ? (
              <li className={S.chips}>
                {selectedSkill.tools.map((item, index) => (
                  <span key={index}>{item}</span>
                ))}
              </li>
            ) : null}

            {/* etc 배열이 있을 경우에만 렌더링 */}
            {selectedSkill?.etc &&
            Array.isArray(selectedSkill.etc) &&
            selectedSkill.etc.length > 0 ? (
              <li className={S.chips}>
                {selectedSkill.etc.map((item, index) => (
                  <span key={index}>{item}</span>
                ))}
              </li>
            ) : null}

            {selectedSkill?.contact?.phone && (
              <li>
                <img src='/assets/icons/call.svg' alt='' />
                <span>{selectedSkill.contact.phone}</span>
              </li>
            )}
            {selectedSkill?.contact?.email && (
              <li>
                <img src='/assets/icons/mail.svg' alt='' />
                <span>{selectedSkill.contact.email}</span>
              </li>
            )}
            {selectedSkill?.contact?.github && (
              <li>
                <img src='/assets/icons/cat.svg' alt='' />
                <a
                  href={selectedSkill.contact.github}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  {selectedSkill.contact.github}
                </a>
              </li>
            )}
          </ul>
        </div>
      </Dialog>
    </>
  );
}

export default Skills;
