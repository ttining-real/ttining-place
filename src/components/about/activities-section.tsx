import { formatDate } from '@/lib/formatDate';
import { ActivitiesDataTypes } from '@/types/activities-types';
import TableLayout from './table-layout';

interface ActivitiesSectionTypes {
  activitiesData: ActivitiesDataTypes[];
}

export default function ActivitiesSection({
  activitiesData,
}: ActivitiesSectionTypes) {
  return (
    <TableLayout title="활동" subtitle="인턴 및 프리랜서">
      {activitiesData?.map((data) => (
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
