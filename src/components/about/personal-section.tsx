import { PersonalDataTypes } from '@/types/personal-types';
import StackIcon from '../icon/stack-icon';
import Image from 'next/image';

interface PersonalSectionTypes {
  personalData: PersonalDataTypes[];
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
    <section>
      <div className="flex max-w-5xl flex-col items-center gap-8 px-6 py-4 sm:m-auto sm:flex-row">
        <div className="flex flex-1 flex-col items-center gap-10 sm:flex-row">
          <figure className="relative aspect-square h-40 w-40 overflow-hidden rounded-full bg-white">
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
                <dd className="flex-1 text-sm text-black sm:text-base">
                  {['저장소', '블로그'].includes(info.label) ? (
                    <a
                      href={info.value ?? '/'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary flex items-center gap-1 text-black underline"
                    >
                      <StackIcon id={info.icon!} size={16} />
                      {info.icon}
                    </a>
                  ) : (
                    info.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="flex-1">
          <h3 className="border-gray-10 flex items-center gap-2 border-b-[1px] py-2 text-lg font-bold sm:text-lg">
            인사말
          </h3>
          <div className="flex flex-col gap-1 py-3 text-sm">
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
