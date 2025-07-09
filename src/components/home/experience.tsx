import { useMemo } from 'react';

import { montserrat } from '@/fonts/font';
import SectionLayout from '@/components/section-layout';
import Carousel from '@/components/carousel';
import Card from '@/components/home/card';
import Button from '@/components/button';
import { sortedExperienceData } from '@/lib/sortedData';

import { ExperienceDataTypes } from '@/types/experience-data-type';

export default function ExperienceSection({
  data,
}: {
  data: ExperienceDataTypes[];
}) {
  const sortData = useMemo(() => sortedExperienceData(data), [data]);

  return (
    <SectionLayout>
      <header className={`${montserrat.className}`}>
        <h3 className="mb-4 text-sm uppercase sm:mb-8 sm:text-base">
          Experience
        </h3>
        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:gap-12">
          <p className="text-2xl font-bold sm:text-3xl">Careers & Activities</p>
          <Button variants="secondary" href="/experience">
            Work History
          </Button>
        </div>
      </header>
      <Carousel>
        {sortData.map((item) => (
          <Card
            key={item.id}
            href={`/experience/#${item.slug}`}
            title={item.company_name}
            description={item.major_task}
            startDate={item.start_date}
            endDate={item.end_date}
          />
        ))}
      </Carousel>
    </SectionLayout>
  );
}
