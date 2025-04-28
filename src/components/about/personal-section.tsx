import { PersonalDataTypes } from '@/types/personal-types';
import Image from 'next/image';
import { gmarket, pretendard } from '@/fonts/font';

interface PersonalSectionTypes {
  personalData: PersonalDataTypes[] | null;
}

export default function PersonalSection({
  personalData,
}: PersonalSectionTypes) {
  const personalInfo = [
    { label: '이름', value: process.env.NEXT_PUBLIC_NAME },
    { label: '주소', value: process.env.NEXT_PUBLIC_ADDRESS },
    { label: '휴대폰', value: process.env.NEXT_PUBLIC_PHONE },
    { label: '이메일', value: process.env.NEXT_PUBLIC_EMAIL },
    { label: '저장소', value: process.env.NEXT_PUBLIC_GITHUB, icon: 'GitHub' },
    { label: '블로그', value: process.env.NEXT_PUBLIC_VELOG, icon: 'Velog' },
  ];

  return (
    <section className={pretendard.className}>
      <div className="flex max-w-5xl flex-col items-center gap-8 sm:m-auto lg:flex-row">
        <div className="flex flex-1 flex-col items-center gap-10 sm:flex-row">
          <figure className="relative aspect-square h-40 w-40 overflow-hidden rounded-full bg-white dark:bg-gray-50">
            <Image
              src="/images/memoji.png"
              width={240}
              height={240}
              alt="Jiin An's Apple Memoji"
              priority
            />
          </figure>
          <dl className="flex flex-col gap-1">
            {personalInfo.map((info, index) => (
              <div key={index} className="flex items-center gap-2">
                <dt className="bg-primary/10 text-primary min-w-16 rounded-3xl py-[1px] text-center text-sm sm:text-base">
                  {info.label}
                </dt>
                <dd className="flex-1 text-sm font-light text-black sm:text-base dark:text-white">
                  {['저장소', '블로그'].includes(info.label) ? (
                    <a
                      href={info.value ?? '/'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary flex items-center gap-1 text-black hover:underline dark:text-white"
                    >
                      {info.icon} 열기
                    </a>
                  ) : (
                    info.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="w-full flex-1">
          <h3
            className={`${gmarket.className} border-gray-10 flex items-center gap-2 border-b-[1px] py-2 text-base font-medium text-black sm:text-xl dark:text-white`}
          >
            인사말
          </h3>
          <div className="dark:text-gray-10 flex flex-col gap-1 py-3 text-sm font-light text-black">
            {personalData?.map((item) => {
              return item.greeting?.map((greeting, index) => (
                <p key={index}>{greeting}</p>
              ));
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
