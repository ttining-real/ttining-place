import { PersonalDataTypes } from '@/types/personal-types';
import Image from 'next/image';
import TableLayout from './table-layout';

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
    <section className="flex flex-col items-center gap-8 py-6 lg:flex-row">
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
            <div key={index} className="flex items-center gap-4">
              <dt className="bg-primary/10 text-primary flex h-8 w-16 items-center justify-center rounded-4xl font-light dark:bg-indigo-300/10 dark:text-indigo-300">
                {info.label}
              </dt>
              <dd className="font-light text-black dark:text-white">
                {['저장소', '블로그'].includes(info.label) ? (
                  <a
                    href={info.value ?? '/about'}
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
      <TableLayout title="인사말">
        <div className="border-gray-30 flex flex-col gap-1 border-b py-4 font-light text-black sm:flex dark:text-white">
          {personalData?.map((item) => {
            return item.greeting?.map((greeting, index) => (
              <p key={index}>{greeting}</p>
            ));
          })}
        </div>
      </TableLayout>
    </section>
  );
}
