import S from "./Resume.module.scss";
// import S from "@/components/Info/Info";
import clsx from "clsx";
import { workExperienceData, otherExperienceData } from "@/utils/old_data";
import { useState, useEffect } from "react";
import { string, oneOfType, object, array } from "prop-types";
import { debounce } from "@/utils/debounce";

function Resume() {
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

  const formatTitle = (name) => {
    return name
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const title = "work-experience";
  const type = "detail";
  const data = workExperienceData;

  return (
    <div>
      <section aria-labelledby={title} className={S.info}>
        <h2
          className={clsx(isMobile ? "hdg-md" : "hdg-xl", S.info_head)}
        >{`${formatTitle(title)}.`}</h2>
        {type === "detail"
          ? data.map((item, index) => (
              <article key={index} className={clsx(title, S.info_body)}>
                <header>
                  <h3 className={isMobile ? "body-md" : "body-xl"}>
                    {item.company}
                  </h3>
                  <p className={isMobile ? "body-sm" : "body-xl"}>
                    {item.position}
                  </p>
                  <p className={isMobile ? "lbl-sm" : "lbl-lg"}>
                    {item.duration}
                  </p>
                </header>
                <div className={S.contents}>
                  <h4 className={isMobile ? "body-sm" : "body-md"}>
                    Description.
                  </h4>
                  <p className={isMobile ? "lbl-sm" : "lbl-md"}>
                    {item.description}
                  </p>
                  <h4 className={isMobile ? "body-sm" : "body-md"}>
                    What did I do.
                  </h4>
                  <ul className={isMobile ? "lbl-sm" : "lbl-md"}>
                    {item.responsibilities.map((responsibility, index) => (
                      <li key={index}>{responsibility}</li>
                    ))}
                  </ul>
                  <h4 className={isMobile ? "body-sm" : "body-md"}>
                    Tech Stack.
                  </h4>
                  <ul className={isMobile ? "lbl-sm" : "lbl-md"}>
                    {Object.keys(item.techStack).map((category, i) => (
                      <li key={i}>
                        {category === "design"
                          ? "디자인"
                          : category === "development"
                          ? "개발"
                          : "문서화"}{" "}
                        - {item.techStack[category].join(", ")}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))
          : Object.keys(data).map((key, index) => (
              <article key={index} className={clsx(title, S.info_simple)}>
                <h4 className={isMobile ? "body-md" : "body-xl"}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </h4>
                <div>
                  {data[key].map((item, itemIndex) => (
                    <dl key={itemIndex} className={S.contents}>
                      <dt className={isMobile ? "body-sm" : "body-md"}>
                        {item.cate}
                        {item.subCate && (
                          <span className={isMobile ? "lbl-sm" : "lbl-md"}>
                            {item.subCate}
                          </span>
                        )}
                      </dt>

                      {Array.isArray(item.desc) ? (
                        item.desc.map((descItem, descIndex) => (
                          <dd
                            key={descIndex}
                            className={isMobile ? "lbl-sm" : "lbl-md"}
                          >
                            {descItem}
                          </dd>
                        ))
                      ) : (
                        <dd className={isMobile ? "lbl-sm" : "lbl-md"}>
                          {item.desc}
                        </dd>
                      )}

                      {item.role && (
                        <dd className={isMobile ? "lbl-sm" : "lbl-md"}>
                          {item.role}
                        </dd>
                      )}
                    </dl>
                  ))}
                </div>
              </article>
            ))}
      </section>
    </div>
  );
}

Resume.propTypes = {
  title: string,
  type: string,
  data: oneOfType([object, array]),
};

export default Resume;
