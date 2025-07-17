import { useMemo } from 'react';

import { montserrat } from '@/fonts/font';
import SectionLayout from '@/components/section-layout';
import ListCard from '@/components/home/list-card';
import Button from '@/components/button';
import { sortedProjectsData } from '@/lib/sortedData';
import { formatDate } from '@/lib/formatDate';

import { ProjectsDataTypes } from '@/types/projects-data-type';

type ProjectsDataWithImageTypes = ProjectsDataTypes & {
  imagePublicUrl: string | null;
};

export default function ProjectsSection({
  data,
}: {
  data: ProjectsDataWithImageTypes[];
}) {
  const sortData = useMemo(() => sortedProjectsData(data), [data]);

  return (
    <SectionLayout outerClassName="bg-section">
      <header>
        <h2
          className={`${montserrat.className} mb-4 text-sm uppercase sm:mb-8 sm:text-base`}
        >
          Projects
        </h2>
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className={`${montserrat.className} text-2xl font-bold`}>
            Selected Projects
          </p>
          <Button href="/projects" variants="secondary">
            모든 프로젝트 보기
          </Button>
        </div>
      </header>
      <div className="flex flex-col gap-6 md:gap-0">
        {sortData.map((item, index) => (
          <ListCard
            key={item.id}
            href={item.slug ? `/projects/${item.slug}` : '/projects'}
            title={item.title}
            summary={item.summary}
            period={`${formatDate(item.start_date)} ~ ${formatDate(item.end_date)}`}
            role={item.role}
            src={item.imagePublicUrl ?? undefined}
            reverse={index % 2 === 1}
          />
        ))}
      </div>
    </SectionLayout>
  );
}
