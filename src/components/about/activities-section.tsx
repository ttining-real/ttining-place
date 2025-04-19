import { calculateDuration } from '@/lib/calculator';
import { formatDate } from '@/lib/formatDate';
import { ActivitiesTypes } from '@/types/activities-types';

interface ActivitiesSectionTypes {
  activitiesData: ActivitiesTypes[];
}

export default function ActivitiesSection({
  activitiesData,
}: ActivitiesSectionTypes) {
  return (
    <section className="flex flex-col gap-4 px-6">
      <h3 className="border-gray-10 flex items-center gap-2 border-b-[1px] py-2 text-lg font-bold sm:text-2xl">
        활동
      </h3>
      {activitiesData.map((item) => (
        <div
          key={item.id}
          className="border-gray-30 flex flex-col gap-1 border-b-[1px] pb-4 sm:grid sm:grid-cols-6"
        >
          <h4 className="order-2 text-base font-bold sm:col-span-4">
            {item.title}
          </h4>
          <dl className="order-1 text-[13px] sm:col-span-2 sm:row-span-2">
            <dt className="sr-only">근무 기간</dt>
            <div className="flex gap-2 sm:flex-col sm:gap-0">
              <dd>
                {formatDate(item.start_date)} ~ {formatDate(item.end_date)}
              </dd>
              <dd>{calculateDuration(item.start_date, item.end_date)}</dd>
            </div>
          </dl>
          <dl className="order-3 text-[13px] sm:col-span-4 sm:col-start-3">
            <div className="flex flex-wrap items-center gap-2">
              <div className="">
                <div>
                  <dt className="sr-only">소속</dt>
                  <dd className="">{item.position}</dd>
                </div>
              </div>
              <hr className="bg-gray-30 h-[9px] w-[1px]" />
              <div>
                <dt className="sr-only">요약</dt>
                <dd>{item.summary}</dd>
              </div>
            </div>
            <div>
              <dt className="sr-only">주요 업무</dt>
              <dd>{item.description}</dd>
            </div>
          </dl>
        </div>
      ))}
    </section>
  );
}
