import { pretendard } from '@/fonts/font';
import Logo from '@/components/logo';

export default function Footer() {
  return (
    <footer
      className={`${pretendard.className} border-primary-lighter text-primary border-t py-4 text-center text-sm font-light`}
    >
      <div className="flex flex-col items-center justify-center sm:flex-row">
        <p className="flex items-center justify-center">
          &copy;2025
          <Logo size={28} className="opacity-60" />
          All rights reserved.
        </p>
        <hr className="border-primary-lighter mx-2 hidden h-3 border sm:block" />
        <p>Designed & Developed by 안지인</p>
      </div>
      <p className="pt-1">
        본 웹사이트는 개인 포트폴리오 목적으로 제작되었습니다.
      </p>
    </footer>
  );
}
