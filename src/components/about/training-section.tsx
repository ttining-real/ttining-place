import { pretendard } from '@/fonts/font';
import { formatDate } from '@/lib/formatDate';
import { TrainingDataTypes } from '@/types/training-types';

interface TrainingSectionTypes {
  trainingData: TrainingDataTypes[];
}

export default function TrainingSection({
  trainingData,
}: TrainingSectionTypes) {
  return (
    <section className="flex flex-col gap-4 py-6 text-black dark:text-white">
      <h3 className="border-gray-10 flex items-center gap-2 border-b-[1px] py-2 text-lg font-medium sm:text-xl">
        교육 이수
      </h3>
      {trainingData.map((item) => (
        <div
          key={item.id}
          className={`${pretendard.className} border-gray-30 flex flex-col gap-1 border-b-[1px] pb-4 sm:grid sm:grid-cols-6`}
        >
          <h4 className="order-2 text-base font-bold sm:col-span-4">
            {item.title}
          </h4>
          <dl className="order-1 text-[13px] sm:col-span-2 sm:row-span-2">
            <dt className="sr-only">교육 기간</dt>
            <dd>
              {formatDate(item.start_date)} ~{' '}
              {item.end_date ? formatDate(item.end_date) : ''}
            </dd>
            <dd className="text-gray-10">{item.status}</dd>
          </dl>
        </div>
      ))}
    </section>
  );
}
