import S from "./Info.module.css";
import clsx from "clsx";
import React from "react";
import { useState, useEffect } from "react";
import { string, oneOfType, object, array } from "prop-types";
import { debounce } from "@/utils/debounce";

Info.propTypes = {
  title: string,
  type: string,
  data: oneOfType([object, array]),
};

function Info({ title, type, data }) {
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

  return (
    <section aria-labelledby={title} className={S.info}>
      <h2
        className={clsx(isMobile ? "hdg-xs" : "hdg-xl", S.info_head)}
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
                <h4 className={isMobile ? "body-xs" : "body-md"}>
                  Description.
                </h4>
                <p className={isMobile ? "lbl-xs" : "lbl-md"}>
                  {item.description}
                </p>
                <h4 className={isMobile ? "body-xs" : "body-md"}>
                  What did I do.
                </h4>
                <ul className={isMobile ? "lbl-xs" : "lbl-md"}>
                  {item.responsibilities.map((responsibility, index) => (
                    <li key={index}>{responsibility}</li>
                  ))}
                </ul>
                <h4 className={isMobile ? "body-xs" : "body-md"}>
                  Tech Stack.
                </h4>
                <ul className={isMobile ? "lbl-xs" : "lbl-md"}>
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
              <h4 className={isMobile ? "body-sm" : "body-xl"}>
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </h4>
              <div>
                {data[key].map((item, itemIndex) => (
                  <dl key={itemIndex} className={S.contents}>
                    <dt className={isMobile ? "body-xs" : "body-md"}>
                      {item.cate}
                      {item.subCate && (
                        <span className={isMobile ? "lbl-xs" : "lbl-md"}>
                          {item.subCate}
                        </span>
                      )}
                    </dt>

                    {Array.isArray(item.desc) ? (
                      item.desc.map((descItem, descIndex) => (
                        <dd
                          key={descIndex}
                          className={isMobile ? "lbl-xs" : "lbl-md"}
                        >
                          {descItem}
                        </dd>
                      ))
                    ) : (
                      <dd className={isMobile ? "lbl-xs" : "lbl-md"}>
                        {item.desc}
                      </dd>
                    )}

                    {item.role && (
                      <dd className={isMobile ? "lbl-xs" : "lbl-md"}>
                        {item.role}
                      </dd>
                    )}
                  </dl>
                ))}
              </div>
            </article>
          ))}
    </section>
  );
}

export default Info;
