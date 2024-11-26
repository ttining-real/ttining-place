import S from "./Home.module.scss";
import { Link } from "react-router-dom";
import { workData, otherData } from "@/utils/temporaryData";
import Footer from "@/components/App/Footer";
import Experience from "@/components/Home/Experience";
import Skills from "@/components/Home/Skills";

function Home() {
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
      </nav>
      <Skills />
      <Experience title='Work Experience.' data={workData} />
      <Experience title='Other Experience.' data={otherData} />
      <Footer />
    </div>
  );
}

export default Home;
