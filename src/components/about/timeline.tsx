import React, { useMemo } from 'react';

import { montserrat } from '@/fonts/font';
import SectionLayout from '@/components/section-layout';

import { TimelineDataTypes } from '@/types/timeline-data-types';

type TimelineSectionProps = {
  data: TimelineDataTypes[];
};

const TITLE_MAP: Record<string, string> = {
  si: 'SI Projects',
  sm: 'SM Projects',
  etc: 'ETC (Proposal, Editorial, ...)',
};

const renderTitle = (type: string) => {
  return TITLE_MAP[type] ?? 'Unknown Type';
};

export default function TimelineSection({ data }: TimelineSectionProps) {
  // 1. year 기준 오름차순 정렬 (null은 가장 마지막으로)
  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => {
      if (a.year == null) return 1;
      if (b.year == null) return -1;
      return b.year - a.year;
    });
  }, [data]);

  // 2. type별로 그룹화
  const groupedByType = useMemo(() => {
    return sortedData.reduce(
      (acc, item) => {
        acc[item.type] = acc[item.type] || [];
        acc[item.type].push(item);
        return acc;
      },
      {} as Record<string, TimelineDataTypes[]>,
    );
  }, [sortedData]);

  return (
    <SectionLayout outerClassName="bg-surface">
      <h3 className={`${montserrat.className} text-[32px] font-bold uppercase`}>
        Projects
      </h3>
      <div className="flex flex-col gap-14">
        {Object.keys(TITLE_MAP)
          .filter((type) => groupedByType[type])
          .map((type) => {
            const items = groupedByType[type];
            const half = Math.ceil(items.length / 2);
            const leftItems = items.slice(0, half);
            const rightItems = items.slice(half);

            return (
              <section key={type} className="mb-10">
                <h4
                  className={`${montserrat.className} mb-4 text-base font-semibold`}
                >
                  {renderTitle(type)}
                </h4>

                <div className="grid grid-cols-1 gap-x-12 sm:grid-cols-2">
                  {[leftItems, rightItems].map((columnItems, colIdx) => (
                    <div key={colIdx} className="flex flex-col">
                      {columnItems.map((item) => (
                        <div
                          key={item.id}
                          className="border-border flex flex-col gap-4 border-l py-4"
                        >
                          <h5
                            className={`before:bg-primary relative pl-8 text-sm font-semibold before:absolute before:top-[6px] before:-left-[4px] before:h-[7px] before:w-[7px] before:rounded-lg ${
                              item.year ? montserrat.className : ''
                            }`}
                          >
                            {item.year ?? '정기 / 비정기'}
                          </h5>
                          <ul className="text-text-primary pl-8 text-sm leading-5.5">
                            {item.title.map((t, i) => (
                              <li key={i}>{t}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
      </div>
    </SectionLayout>
  );
}
