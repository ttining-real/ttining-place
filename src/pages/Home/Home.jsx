import S from "./Home.module.scss";
import { useState } from "react";
import { Link } from "react-router-dom";
import Dialog from "@/components/Dialog/Dialog";
import Footer from "@/components/App/Footer";

function Home() {
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleDialogOpen = () => setDialogOpen(true);
  const handleDialogClose = () => setDialogOpen(false);

  return (
    <div className={S.home}>
      <div className={S.name_card}>
        <img
          src='https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Grinning%20Face%20with%20Smiling%20Eyes.png'
          alt='Grinning Face with Smiling Eyes'
          width='80'
          height='80'
        />
        <p aria-label='Name'>An Jiin</p>
        <p aria-label='Position of work'>UI/UX Designer, Web Publisher</p>
      </div>
      <div className={S.desc}>
        <p>안녕하세요.</p>
        <p>
          저는 UI/UX 디자인과 퍼블리싱을 기반으로 웹 접근성에 중점을 두고
          활동하는 안지인입니다.
        </p>
        <p>
          사용자 중심의 더 나은 웹 환경을 만들어가는 것을 가치로 삼으며, 이를
          위해 UI/UX 디자이너와 퍼블리셔에서 UI 개발자로 성장하고 있습니다.
        </p>
      </div>
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
