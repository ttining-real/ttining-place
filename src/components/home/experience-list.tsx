import Link from 'next/link';

import { CareersDataTypes } from '@/types/career-types';
import { pretendard } from '@/fonts/font';

export default function ExperienceList({ data }: { data: CareersDataTypes[] }) {
  const sortedData = [...data].sort((a, b) => {
    return new Date(b.end_date).getTime() - new Date(a.end_date).getTime();
  });

  return (
    <ul className="flex w-full flex-col gap-0.5">
      {sortedData.map((data, index) => (
        <li key={index}>
          <Link
            href={`/experience/#${data.company_name}`}
            className={`${pretendard.className} flex flex-col justify-between rounded-lg bg-white/30 p-4 sm:flex-row`}
          >
            <div className="flex gap-3">
              <span className="text-primary font-bold">{`0${index + 1}`}</span>
              <p aria-label="회사명" className="text-black dark:text-white">
                {data.company_name}
              </p>
              <span className="text-black/50 dark:text-white/50">
                {data.department}
              </span>
            </div>
            <span
              aria-label="근무기간"
              className="text-black/50 dark:text-white/50"
            >
              {data.start_date} ~ {data.end_date}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
