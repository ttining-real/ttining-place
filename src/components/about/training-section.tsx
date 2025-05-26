import { formatDate } from '@/lib/formatDate';
import { TrainingDataTypes } from '@/types/training-types';
import TableLayout from './table-layout';

interface TrainingSectionTypes {
  trainingData: TrainingDataTypes[];
}

export default function TrainingSection({
  trainingData,
}: TrainingSectionTypes) {
  return (
    <TableLayout title="교육이수">
      {trainingData?.map((data) => (
        <div
          key={data.id}
          className="border-gray-30 gap-12 border-b py-4 sm:flex"
        >
          <h4 className="text-lg text-black sm:flex-2/6 dark:text-white">
            {data.title}
          </h4>
          <dl className="flex flex-col gap-1 font-light text-black sm:flex-4/6 dark:text-white">
            <div>
              <dt className="sr-only">기관</dt>
              <dd className="flex items-center gap-2">
                {data.organization}
                {data.status && (
                  <>
                    <hr className="bg-gray-20 h-[12px] w-[1px]" />
                    {data.status}
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
