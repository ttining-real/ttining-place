import $ from "./Footer.module.scss";

function Footer() {
  return (
    <footer className={$.footer}>
      <p className='caption'>
        본 웹 사이트는 개인 포트폴리오 목적으로 제작되었습니다.
      </p>
      <p className='caption'>&copy; 2025 An Jiin All rights reserved.</p>
      <p className='caption'>Designed in 2025</p>
    </footer>
  );
}

export default Footer;
