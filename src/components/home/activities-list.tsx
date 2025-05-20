import Link from 'next/link';

import { formatIndex } from '@/lib/formatIndex';
import { formatDate } from '@/lib/formatDate';
import { ActivitiesDataTypes } from '@/types/activities-types';

export default function ActivitiesList({
  data,
}: {
  data: ActivitiesDataTypes[];
}) {
  return (
    <ul className="flex w-full flex-col gap-4 sm:gap-2">
      {data.map((data, index) => (
        <li
          key={index}
          className="hover:border-primary/60 dark:border-gray-40 w-full rounded-lg border-2 border-white bg-white shadow-lg transition-all duration-300 dark:bg-gray-50"
        >
          <Link
            href={`/activities/#${data.company_name}`}
            className="flex flex-col justify-between p-6 sm:flex-row sm:items-center"
          >
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
              <span className="text-primary/60 font-bold">
                {formatIndex(index)}
              </span>
              <p aria-label="회사명" className="text-black dark:text-white">
                {data.company_name}
              </p>
              <span className="text-sm text-black/50 dark:text-white/50">
                {data.company_name === '샤이닝라이언'
                  ? `${data.department}`
                  : `${data.summary}`}
              </span>
            </div>
            <span
              aria-label="근무기간"
              className="text-sm text-black/50 dark:text-white/50"
            >
              {formatDate(data.start_date)} - {formatDate(data.end_date)}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
