import S from "./Footer.module.scss";

function Footer() {
  return (
    <footer className={S.footer}>
      <p>&copy; 2024 [An Jiin]. All rights reserved.</p>
      <p>
        본 페이지는 비상업적 용도로 제작하였으며, 사용된 이모지(emoji)는
        Microsoft의 저작권을 따릅니다.
      </p>
    </footer>
  );
}

export default Footer;
