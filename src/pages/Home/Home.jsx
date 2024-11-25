import S from "./Home.module.scss";
import { useState } from "react";
import { Link } from "react-router-dom";
import Dialog from "@/components/Dialog/Dialog";
import Footer from "@/components/App/Footer";
import Experience from "@/components/Home/Experience";
import { workData, otherData } from "@/utils/temporaryData";

function Home() {
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleDialogOpen = () => setDialogOpen(true);
  const handleDialogClose = () => setDialogOpen(false);

  return (
    <div className={S.home}>
      <section className={S.visual_section}>
        <h2>About Me.</h2>
        <dl>
          <dt aria-label='Name'>
            <img
              src='https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Grinning%20Face%20with%20Smiling%20Eyes.png'
              alt='Grinning Face with Smiling Eyes'
              width='80'
              height='80'
              aria-hidden
            />
            An Jiin
          </dt>
          <dd aria-label='Position of work'>UI/UX Designer, Web Publisher</dd>
          <dd aria-label='greeting'>
            <p>안녕하세요.</p>
            <p>
              저는 UI/UX 디자인과 퍼블리싱을 기반으로 웹 접근성에 중점을 두고
              활동하는 안지인입니다.
            </p>
            <p>
              사용자 중심의 더 나은 웹 환경을 만들어가는 것을 가치로 삼으며,
              이를 위해 UI/UX 디자이너와 퍼블리셔에서 UI 개발자로 성장하고
              있습니다.
            </p>
          </dd>
        </dl>
      </section>
      <nav>
        <Link to='/resume'>
          <img
            src='https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People/Detective.png'
            alt='Detective'
            width='60'
            height='60'
          />
          <span>Resume</span>
        </Link>
        <Link to='/projects'>
          <img
            src='https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Rocket.png'
            alt='Rocket'
            width='60'
            height='60'
          />
          <span>Projects</span>
        </Link>
        <Link to='/skills'>
          <img
            src='https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People/Technologist.png'
            alt='Technologist'
            width='60'
            height='60'
          />
          <span>Skills</span>
        </Link>
        <button onClick={handleDialogOpen} className={S.button_contact}>
          <img
            src='https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Telephone%20Receiver.png'
            alt='Telephone Receiver'
            width='60'
            height='60'
          />
          <span>Contact</span>
        </button>
      </nav>
      {/* <section className={S.experience_section}>
        <h3>Work Experience.</h3>
        <ul className={S.list}>
          {workData.map((work, index) => (
            <li key={index} className={S.list_item}>
              <p className={S.tit}>{work.title}</p>
              <p className={S.sub_text}>{work.sub}</p>
              <ul
                className={S.chips}
                aria-label={`${work.title} 관련 작업 내용`}
              >
                {work.chips.map((chip, chipIndex) => (
                  <li className={S.chip} key={chipIndex}>
                    {chip}
                  </li>
                ))}
              </ul>
              <p className={S.date}>
                <img
                  src='/assets/icons/calendar.svg'
                  alt={`${work.date} 기간`}
                  className={S.calendar_icon}
                />
                {work.date}
              </p>
            </li>
          ))}
          <li className={S.list_item}>
            <p className={S.tit}>다누시스</p>
            <p className={S.sub_text}>UX기획팀, 주임연구원</p>
            <ul className={S.chips}>
              <li className={S.chip}>Publishing</li>
              <li className={S.chip}>UI/UX</li>
              <li className={S.chip}>Design</li>
              <li className={S.chip}>QA</li>
            </ul>
            <p className={S.date}>
              <img src='/assets/icons/calendar.svg' alt='' />
              0000. 00 - 0000. 00 (0년 0개월)
            </p>
          </li>
        </ul>
      </section> */}
      <Experience title='Work Experience.' data={workData} />
      <Experience title='Other Experience.' data={otherData} />
      <Dialog isOpen={isDialogOpen} onClose={handleDialogClose}>
        <h3 className={S.dialog_head}>Contact Me.</h3>
        <ul className={S.dialog_body}>
          <li>
            <img src='/assets/icons/call.svg' alt='' />
            <span>+82 10-9262-5731</span>
          </li>
          <li>
            <img src='/assets/icons/mail.svg' alt='' />
            <p>just1111111@naver.com</p>
          </li>
          <li>
            <img src='/assets/icons/cat.svg' alt='' />
            <a
              href='https://github.com/ttining-real'
              target='_blank'
              rel='noopener noreferrer'
            >
              ttining-real (GitHub)
            </a>
          </li>
        </ul>
      </Dialog>
      <Footer />
    </div>
  );
}

export default Home;
