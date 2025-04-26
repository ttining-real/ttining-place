import { formatDate } from '@/lib/formatDate';
import { EducationDataTypes } from '@/types/education-types';

interface EducationSectionTypes {
  educationData: EducationDataTypes[];
}

export default function EducationSection({
  educationData,
}: EducationSectionTypes) {
  return (
    <section className="flex max-w-5xl flex-col gap-4 px-6 py-4 sm:m-auto">
      <h3 className="border-gray-10 flex items-center gap-2 border-b-[1px] py-2 text-lg font-bold sm:text-2xl">
        학력
      </h3>
      {educationData.map((item) => (
        <div
          key={item.id}
          className="border-gray-30 flex flex-col gap-1 border-b-[1px] pb-4 sm:grid sm:grid-cols-6"
        >
          <h4 className="order-2 text-base font-bold sm:col-span-4">
            {item.school_name}
          </h4>
          <dl className="order-1 text-[13px] sm:col-span-2 sm:row-span-2">
            <dt className="sr-only">재학 기간</dt>
            <div className="flex gap-2 sm:flex-col sm:gap-0">
              <dd>
                {formatDate(item.start_date)} ~ {formatDate(item.end_date)}
              </dd>
            </div>
          </dl>
          <dl className="order-3 flex items-center gap-1 text-[13px] sm:col-span-4 sm:col-start-3">
            <div>
              <dt className="sr-only">전공</dt>
              <dd className="flex items-center gap-2">{item.major}</dd>
            </div>
            {item.note && (
              <>
                <hr className="bg-gray-30 h-[9px] w-[1px]" />
                <div>
                  <dt className="sr-only">비고</dt>
                  <dd className="flex items-center gap-2">{item.note}</dd>
                </div>
              </>
            )}
          </dl>
        </div>
      ))}
    </section>
  );
}
