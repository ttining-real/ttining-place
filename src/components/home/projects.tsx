import { useMemo, useRef } from 'react';

import SectionTitle from '@/components/section-title';
import Carousel from '@/components/carousel';
import Card from '@/components/home/card';
import Button from '@/components/button';
import Icon from '@/components/icon';
import { useGsapFadeInOnScroll } from '@/hooks/useGsapFadeInOnScroll';
import { sortedProjectsData } from '@/lib/sortedData';
import { formatDate } from '@/lib/formatDate';

import { ProjectsDataTypes } from '@/types/projects-data-type';

export default function ProjectsSection({
  data,
}: {
  data: ProjectsDataTypes[];
}) {
  const containerRef = useRef<HTMLDivElement>(null!);

  useGsapFadeInOnScroll(containerRef);

  const sortData = useMemo(() => sortedProjectsData(data), [data]);

  return (
    <section className="bg-[url(/images/home/bg_projects.png)] bg-cover bg-fixed bg-center px-6 py-20">
      <div ref={containerRef} className="m-auto flex max-w-5xl flex-col gap-12">
        <header className="gsap-fade-in flex items-end gap-6 text-white">
          <SectionTitle title="projects" className="text-primary-darkest" />
          <Button
            href="/projects"
            variants="tertiary"
            size="sm"
            className="text-primary-darkest"
          >
            자세히 보기
            <Icon id="direction-right" size={14} />
          </Button>
        </header>
        <Carousel
          className="gsap-fade-in"
          buttonClassName="text-primary-darkest hover:text-primary-darkest hover:bg-white/20"
        >
          {sortData.map((item) => (
            <Card
              key={item.id}
              href={item.slug ? `/projects/${item.slug}` : '/projects'}
              type="projects"
              title={item.title}
              period={`${formatDate(item.start_date)} ~ ${formatDate(item.end_date)}`}
              role={item.role}
              image_url={item.image_url}
            />
          ))}
        </Carousel>
      </div>
    </section>
  );
}
