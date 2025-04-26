import Link from 'next/link';
import LogoIcon from '../icon/logo-icon';
import { pretendard } from '@/fonts/font';

export default function Footer() {
  return (
    <footer
      role="contentinfo"
      className={`${pretendard.className} text-gray-10 flex flex-col items-center justify-center gap-1 border-t border-gray-50 px-8 py-4 text-center text-[13px] sm:gap-2 sm:text-sm`}
    >
      <div className="flex flex-col items-center gap-1 sm:flex-row sm:gap-2">
        <p className="flex items-center gap-1">
          <span>&copy; 2025</span>
          <Link href="/">
            <LogoIcon
              id="light"
              width={36}
              height={18}
              className="mt-1 opacity-30"
            />
          </Link>
          <span>All rights reserved.</span>
        </p>
        <span
          className="sm:bg-gray-30 hidden sm:block sm:h-2.5 sm:w-[1px]"
          aria-hidden={true}
        ></span>
        <p>Designed & Developed by 안지인</p>
      </div>
      <p>본 웹사이트는 개인 포트폴리오 목적으로 제작되었습니다.</p>
    </footer>
  );
}
