import { CareersDataTypes } from '@/types/career-types';
import TagListSection from './experience/tag-list-section';

export default function ListSection({ data }: { data: CareersDataTypes[] }) {
  return (
    <>
      {data
        .sort((a, b) => {
          const dateA = a.end_date ? new Date(a.end_date) : new Date(0);
          const dateB = b.end_date ? new Date(b.end_date) : new Date(0);
          return dateB.getTime() - dateA.getTime();
        })
        .map((item, index) => (
          <section
            key={item.id}
            className="border-gray-40 flex flex-col gap-4 border-t py-6 text-sm text-black sm:gap-6 dark:text-white"
          >
            <h3 className="flex flex-col gap-2 text-lg font-bold text-black sm:gap-4 dark:text-white">
              <span className="text-primary/50 dark:text-primary/80">
                0{index + 1}
              </span>
              {item.company_name}
            </h3>
            <dl className="flex flex-col gap-4">
              <TagListSection
                label="소속"
                contents={`${item.department} ${item.position}`}
              />
              <TagListSection
                label="근무 기간"
                contents={`${item.start_date} ~ ${item.end_date}`}
              />
              <TagListSection label="요약" contents={item.summary} />
              <TagListSection label="설명" contents={item.description} />
              <TagListSection
                label="주요 업무"
                contents={item.major_task}
                list={true}
              />
              <TagListSection
                label="성과"
                contents={item.achievements}
                list={true}
              />
              <TagListSection
                label="기술 스택"
                contents={item.tech_stack}
                stack={true}
              />
              <TagListSection label="근무 지역" contents={item.location} />
            </dl>
          </section>
        ))}
    </>
  );
}
