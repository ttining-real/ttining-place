import S from "./Visual.module.css";
import { useState, useEffect } from "react";
import { debounce } from "@/utils/debounce";

function Visual() {
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
    <header className={S.visual}>
      <div>
        <h1 className={isMobile ? "hdg-xs" : "hdg-xxl"}>
          <span>
            반갑습니다.
            <img src='/assets/images/3d_smiling_face.svg' alt='웃는 이모지' />
          </span>
          <span>UI 개발자 안지인입니다.</span>
        </h1>
        <p className={isMobile ? "body-xs" : "body-xl"}>
          안녕하세요, 저는 UI/UX 디자인과 퍼블리싱을 기반으로 웹 접근성에 중점을
          두고 활동하는 안지인입니다. <strong>모두가 평등한 웹 경험</strong>을
          제공하는 것을 가치로 삼으며, 이를 위해 UI/UX 디자이너와 퍼블리셔에서{" "}
          <strong>UI 개발자</strong>로 성장하고 있습니다. 사용자 중심의 더 나은
          웹 환경을 만들어가는 데 기여하고자 합니다.
        </p>
        <dl>
          <dt className={isMobile ? "body-xs" : "hdg-xs"}>Contact</dt>
          <dd className={isMobile ? "body-xs" : "body-sm"}>
            <img src='/assets/images/3d_telephone.svg' alt='전화 이모지' />
            010. 9262. 5731
          </dd>
          <dd className={isMobile ? "body-xs" : "body-sm"}>
            <img src='/assets/images/3d_mail.svg' alt='이메일 이모지' />
            just1111111@naver.com
          </dd>
        </dl>
      </div>
    </header>
  );
}

export default Visual;
