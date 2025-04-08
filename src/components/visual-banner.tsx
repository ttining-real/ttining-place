import localFont from 'next/font/local';
import Link from 'next/link';

const gmarket = localFont({
  src: [
    {
      path: '../fonts/GmarketSansTTFBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../fonts/GmarketSansTTFMedium.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/GmarketSansTTFLight.ttf',
      weight: '200',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--gmarketFont',
});

export default function VisualBanner() {
  return (
    <section
      role="region"
      aria-label="포트폴리오 소개 배너"
      className="flex h-[360px] flex-col items-center justify-center gap-6 bg-[url('/images/banner.png')] bg-cover bg-center bg-no-repeat px-6 bg-blend-multiply"
    >
      <h2
        className={`${gmarket.className} text-center text-2xl font-bold text-white dark:text-black`}
      >
        Welcome! An Jiin Portfolio
      </h2>
      <p className="font-base mt-[-8px] text-center font-normal text-white dark:text-black">
        안녕하세요. UX/UI 디자인과 웹 퍼블리싱 경험을 바탕으로 <br /> 프론트엔드
        개발자로 도약 중인 안지인입니다.
      </p>
      <Link
        href="/about"
        aria-label="About 페이지로 이동"
        className="bg-primary rounded-md px-4 py-1.5 text-base text-white dark:text-black"
      >
        Go About
      </Link>
    </section>
  );
}
