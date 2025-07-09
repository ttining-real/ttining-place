import { useMemo } from 'react';

import { montserrat } from '@/fonts/font';
import SectionLayout from '@/components/section-layout';
import ListCard from '@/components/home/list-card';
import Button from '@/components/button';
import { sortedProjectsData } from '@/lib/sortedData';
import { formatDate } from '@/lib/formatDate';

import { ProjectsDataTypes } from '@/types/projects-data-type';

export default function ProjectsSection({
  data,
}: {
  data: ProjectsDataTypes[];
}) {
  const sortData = useMemo(() => sortedProjectsData(data), [data]);

  return (
    <SectionLayout outerClassName="bg-section">
      <header className={`${montserrat.className}`}>
        <h3 className="mb-4 text-sm uppercase sm:mb-8 sm:text-base">
          Projects
        </h3>
        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:gap-12">
          <p className="text-2xl font-bold sm:text-3xl">Featured & Side</p>
          <Button href="/projects" variants="secondary">
            View All Projects
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
            image_url={item.image_url}
            reverse={index % 2 === 1}
          />
        ))}
      </div>
    </SectionLayout>
  );
}
