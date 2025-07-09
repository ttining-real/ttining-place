import Link from 'next/link';

import { montserrat } from '@/fonts/font';

export default function Footer() {
  return (
    <footer className="border-border text-text-secondary border-t py-4 text-center text-sm font-light">
      <div className="flex flex-col items-center justify-center sm:flex-row">
        <p
          className={`${montserrat.className} flex items-center justify-center gap-2`}
        >
          &copy;2025{' '}
          <Link href="/" className="font-medium">
            ANJIIN
          </Link>{' '}
          All rights reserved.
        </p>
        <hr className="border-border mx-2 hidden h-3 border sm:block" />
        <p>
          <span className={`${montserrat.className} pr-2`}>
            Designed & Developed by
          </span>
          안지인
        </p>
      </div>
      <p className="pt-1">
        본 웹사이트는 개인 포트폴리오 목적으로 제작되었습니다.
      </p>
    </footer>
  );
}
