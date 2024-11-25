import S from "./WorkExperience.module.scss";
import PropTypes from "prop-types";

function WorkExperience({ experience }) {
  return (
    <div className={S.experience}>
      <header>
        <h3>{experience.company}</h3>
        <div>
          <span role='text' className={S.position}>
            {experience.position}
          </span>
          <span className={S.date}>{experience.duration}</span>
        </div>
      </header>
      <dl>
        <dt>Description.</dt>
        <dd>{experience.description}</dd>
      </dl>
      {experience.responsibilities ? (
        <dl>
          <dt>What did I do.</dt>
          <dd>
            <ul>
              {experience.responsibilities.map((responsibility, index) => (
                <li key={index}>
                  <span className={S.bullet} aria-hidden></span>
                  {responsibility}
                </li>
              ))}
            </ul>
          </dd>
        </dl>
      ) : (
        ""
      )}
      <dl className={S.stack}>
        <dt>Tech Stack.</dt>
        {experience.techStack.development ? (
          <dd>
            <span aria-hidden>
              <img src='/assets/icons/technologist.svg' alt='' />
            </span>
            <div>
              <p>Web Development</p>
              <ul className={S.tags}>
                {experience.techStack.development.map((tech, index) => (
                  <li key={index}>{tech}</li>
                ))}
              </ul>
            </div>
          </dd>
        ) : (
          ""
        )}
        {experience.techStack.design ? (
          <dd>
            <span aria-hidden>
              <img src='/assets/icons/palette.svg' alt='' />
            </span>
            <div>
              <p>UI/UX Design</p>
              <ul className={S.tags}>
                {experience.techStack.design.map((tech, index) => (
                  <li key={index}>{tech}</li>
                ))}
              </ul>
            </div>
          </dd>
        ) : (
          ""
        )}
        {experience.techStack.documentation ? (
          <dd>
            <span aria-hidden>
              <img src='/assets/icons/folder_index.svg' alt='' />
            </span>
            <div>
              <p>Documentation</p>
              <ul className={S.tags}>
                {experience.techStack.documentation.map((tech, index) => (
                  <li key={index}>{tech}</li>
                ))}
              </ul>
            </div>
          </dd>
        ) : (
          ""
        )}
      </dl>
    </div>
  );
}

WorkExperience.propTypes = {
  experience: PropTypes.shape({
    company: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    responsibilities: PropTypes.arrayOf(PropTypes.string),
    techStack: PropTypes.shape({
      design: PropTypes.arrayOf(PropTypes.string),
      development: PropTypes.arrayOf(PropTypes.string),
      documentation: PropTypes.arrayOf(PropTypes.string),
    }),
  }).isRequired,
};

export default WorkExperience;
