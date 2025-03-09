import gsap from "gsap";
import PropTypes from "prop-types";
import { useEffect, useRef } from "react";

import S from "./Timeline.module.scss";

function Timeline({ list }) {
  const timelineRef = useRef(null);

  useEffect(() => {
    if (timelineRef.current) {
      const items = timelineRef.current.children;

      gsap.set(items, { opacity: 0, y: 50 }); // 초기 상태 설정
      gsap.to(items, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.3,
        ease: "power2.out",
        clearProps: "all",
      });
    }
  }, [list]);

  return (
    <>
      <ul className={S.timeline} ref={timelineRef}>
        {list.map((item, index) => (
          <li key={index}>
            <span className='caption'>{item.date}</span>
            <p className='body'>{item.title}</p>
            <span className='caption'>{item.description}</span>
          </li>
        ))}
      </ul>
    </>
  );
}

Timeline.propTypes = {
  title: PropTypes.node,
  list: PropTypes.arrayOf(
    PropTypes.shape({
      period: PropTypes.string,
      date: PropTypes.string,
      school: PropTypes.string,
      title: PropTypes.string,
      description: PropTypes.string,
    })
  ).isRequired,
};

export default Timeline;
