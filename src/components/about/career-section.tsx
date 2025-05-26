import { CareersDataTypes } from '@/types/career-types';
import TableLayout from './table-layout';
import { formatDate } from '@/lib/formatDate';

interface CareerSectionTypes {
  careerData: CareersDataTypes[];
}

export default function CareerSection({ careerData }: CareerSectionTypes) {
  return (
    <TableLayout title="경력" subtitle="6년 11개월">
      {careerData?.map((data) => (
        <div
          key={data.id}
          className="border-gray-30 gap-12 border-b py-4 sm:flex"
        >
          <h4 className="text-lg text-black sm:flex-2/6 dark:text-white">
            {data.company_name}
          </h4>
          <dl className="flex flex-col gap-1 font-light text-black sm:flex-4/6 dark:text-white">
            <div>
              <dt className="sr-only">소속</dt>
              <dd className="flex items-center gap-2">
                {data.department}
                <hr className="bg-gray-20 h-[12px] w-[1px]" />
                {data.position}
              </dd>
            </div>
            <div>
              <dt className="sr-only">업무</dt>
              <dd>{data.summary}</dd>
            </div>
            <div>
              <dt className="sr-only">기간</dt>
              <dd>
                {formatDate(data.start_date)} ~ {formatDate(data.end_date)}
              </dd>
            </div>
          </dl>
        </div>
      ))}
    </TableLayout>
  );
}
