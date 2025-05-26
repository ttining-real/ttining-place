import { formatDate } from '@/lib/formatDate';
import { EducationDataTypes } from '@/types/education-types';
import TableLayout from './table-layout';

interface EducationSectionTypes {
  educationData: EducationDataTypes[];
}

export default function EducationSection({
  educationData,
}: EducationSectionTypes) {
  return (
    <TableLayout title="학력">
      {educationData?.map((data) => (
        <div
          key={data.id}
          className="border-gray-30 gap-12 border-b py-4 sm:flex"
        >
          <h4 className="text-lg text-black sm:flex-2/6 dark:text-white">
            {data.school_name}
          </h4>
          <dl className="flex flex-col gap-1 font-light text-black sm:flex-4/6 dark:text-white">
            <div>
              <dt className="sr-only">전공</dt>
              <dd className="flex items-center gap-2">
                {data.major}
                {data.note && (
                  <>
                    <hr className="bg-gray-20 h-[12px] w-[1px]" />
                    {data.note}
                  </>
                )}
              </dd>
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
