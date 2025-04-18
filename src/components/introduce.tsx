import localFont from 'next/font/local';
// import Link from 'next/link';
import Image from 'next/image';
import StackIcon from '@/components/stack-icon';

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

export default function Introduce() {
  const personalInfo = [
    { label: '이름', value: process.env.NEXT_PUBLIC_NAME },
    { label: '주소', value: process.env.NEXT_PUBLIC_ADDRESS },
    { label: '휴대폰', value: process.env.NEXT_PUBLIC_PHONE },
    { label: '이메일', value: process.env.NEXT_PUBLIC_EMAIL },
  ];

  const externalLinks = [
    {
      id: 'GitHub',
      label: 'GitHub',
      href: 'https://github.com/ttining-real',
    },
    {
      id: 'Velog',
      label: 'Velog',
      href: 'https://velog.io/@ttining/posts',
    },
  ];

  return (
    <section role="region" aria-label="포트폴리오 소개 배너" className="">
      <div className="m-auto flex max-w-5xl flex-col gap-8 p-6 sm:flex-row sm:py-12">
        <figure className="flex items-center justify-center sm:w-1/3">
          <Image
            src="/images/memoji.png"
            width={360}
            height={360}
            alt="Jiin An's Apple Memoji"
            priority
          />
        </figure>
        <div className="flex flex-col items-center gap-4 sm:w-2/3 sm:gap-6">
          <h2
            className={`${gmarket.className} text-primary text-2xl font-bold`}
          >
            Welcome! 🎉
          </h2>
          <div className="text-center text-sm sm:text-base">
            <p>
              안녕하세요. 기술과 디자인의 경계에서,
              <br /> 더 나은 사용자 경험을 설계하고 구현하는 UI 개발자
              안지인입니다.
            </p>
            <p>
              UX/UI 디자인과 퍼블리싱 경험을 바탕으로
              <br />
              사용자 중심의 웹을 고민하며 프론트엔드 개발로 확장해가고 있습니다.
            </p>
          </div>
          <div className="flex w-full flex-col gap-2 sm:flex-row sm:gap-6">
            <dl className="flex flex-col gap-1 sm:w-1/2">
              {personalInfo.map(({ label, value }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 text-sm sm:text-base"
                >
                  <dt className="w-[60px] rounded-md bg-gray-50 py-1 text-center">
                    {label}
                  </dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
            <div className="flex flex-col gap-4 sm:w-1/2">
              <dl className="flex gap-2 sm:flex-col">
                {externalLinks.map(({ id, label, href }) => (
                  <div
                    key={id}
                    className="flex flex-1 items-center gap-2 text-sm sm:text-base"
                  >
                    <dt aria-label={label}>
                      <StackIcon id={id} size={18} />
                    </dt>
                    <dd className="flex-1">
                      <a
                        href={href}
                        className="block py-2 hover:underline sm:py-1"
                      >
                        {label} 열기
                      </a>
                    </dd>
                  </div>
                ))}
              </dl>
              <a
                href="#"
                download
                className="bg-primary inline-block w-full rounded-lg px-4 py-3 text-center text-sm text-white sm:text-base"
              >
                이력서 다운로드
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
