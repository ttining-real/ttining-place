import { CareersDataTypes } from '@/types/career-types';
import Image from 'next/image';
import Link from 'next/link';

export default function Card({ data }: { data: CareersDataTypes[] }) {
  const sortedData = [...data].sort((a, b) => {
    return new Date(b.end_date).getTime() - new Date(a.end_date).getTime();
  });

  return (
    <>
      {sortedData.map((data, index) => (
        <article
          key={data.id}
          className="border-gray-30 flex min-w-2/3 rounded-2xl border bg-transparent hover:bg-black/2 sm:min-w-auto dark:hover:bg-white/2"
        >
          <Link
            href={`/experience/#${data.company_name}`}
            className="flex flex-col gap-6 p-6"
          >
            <div className="flex flex-col gap-1">
              <p className="text-gray-20 font-bold">{`0${index + 1}`}</p>
              <h4
                aria-label="회사명"
                className="font-bold text-black dark:text-white"
              >
                {data.company_name}
              </h4>
              <p aria-label="근무기간" className="text-gray-10">
                {data.start_date} ~ {data.end_date}
              </p>
            </div>
            <figure className="dark:bg-gray-40 rounded-xl bg-gray-50">
              <Image
                priority
                src={`${data.image_url}`}
                width={400}
                height={300}
                alt={`${data.company_name} 로고`}
              />
            </figure>
          </Link>
        </article>
      ))}
    </>
  );
}
