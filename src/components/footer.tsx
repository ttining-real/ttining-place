import { pretendard } from '@/fonts/font';

export default function Footer() {
  return (
    <footer
      className={`${pretendard.className} border-primary-lighter text-primary border-t py-4 text-center text-sm font-light`}
    >
      <p className="flex flex-col items-center justify-center sm:flex-row">
        <span>&copy;2025 Logo All rights reserved. </span>
        <span
          aria-hidden
          className="bg-primary/30 mx-1.5 hidden h-3 w-[1px] sm:block"
        ></span>
        <span>Designed & Developed by 안지인</span>
      </p>
      <p>본 웹사이트는 개인 포트폴리오 목적으로 제작되었습니다.</p>
    </footer>
  );
}
