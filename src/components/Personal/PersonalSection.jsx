import S from "./PersonalSection.module.scss";
import { bool } from "prop-types";

function PersonalSection({ isMobile }) {
  return (
    <section className={S.visual}>
      <div className={S.personal}>
        <img src='/assets/icons/grinning_face.svg' alt='웃는 이모지' />
        <h2 className={isMobile ? "hdg-sm" : "hdg-xl"}>
          <span className='hdg-xs'>An Jiin</span>
          <span className='body-xs'>UI/UX Designer, Web Publisher</span>
        </h2>
      </div>
      <p className={isMobile ? "body-xs" : "body-sm"}>
        안녕하세요.
        <br />
        저는 UI/UX 디자인과 퍼블리싱을 기반으로 웹 접근성에 중점을 두고 활동하는
        안지인입니다.
        <br />
        <br />
        사용자 중심의 더 나은 웹 환경을 만들어가는 것을 가치로 삼으며,
        <br />
        이를 위해 UI/UX 디자이너와 퍼블리셔에서 UI 개발자로 성장하고 있습니다.
      </p>
      <dl className={S.contact}>
        <dt className={isMobile ? "hdg-xs" : "hdg-xs"}>Contact.</dt>
        <div>
          <dd className={isMobile ? "body-xs" : "body-sm"}>
            <img src='/assets/icons/call.svg' alt='' />
            Phone. 010 - 9262 - 5731
          </dd>
          <dd className={isMobile ? "body-xs" : "body-sm"}>
            <img src='/assets/icons/mail.svg' alt='' />
            E-mail. just1111111@naver.com
          </dd>
          <dd className={isMobile ? "body-xs" : "body-sm"}>
            <img src='/assets/icons/cat.svg' alt='' />
            <a
              href='https://github.com/ttining-real'
              target='_blank'
              rel='noopener noreferrer'
            >
              GitHub. ttining-real
            </a>
          </dd>
        </div>
      </dl>
    </section>
  );
}

PersonalSection.propTypes = {
  isMobile: bool.isRequired,
};

export default PersonalSection;
