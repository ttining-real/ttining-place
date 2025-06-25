import { useRef } from 'react';

import SectionTitle from '@/components/section-title';
import Carousel from '@/components/carousel';
import Card from '@/components/home/card';
import Button from '@/components/button';
import { useGsapFadeInOnScroll } from '@/hooks/useGsapFadeInOnScroll';
import { sortedData } from '@/lib/sortedData';
import { formatDate } from '@/lib/formatDate';

import { ProjectsDataTypes } from '@/types/projects-data-type';

export default function ProjectsSection({
  data,
}: {
  data: ProjectsDataTypes[];
}) {
  const containerRef = useRef<HTMLDivElement>(null!);

  useGsapFadeInOnScroll(containerRef);

  const sortData = sortedData(data);

  return (
    <section className="bg-[url(/images/home/bg_projects.png)] bg-cover bg-fixed bg-center px-6 py-20">
      <div ref={containerRef} className="m-auto flex max-w-5xl flex-col gap-12">
        <header className="gsap-fade-in flex items-end gap-6 text-white">
          <SectionTitle title="projects" className="text-primary-darkest" />
          <Button
            href="/projects"
            variant="tertiary"
            className="text-primary-darkest px-[8px]"
          >
            자세히 보기
          </Button>
        </header>
        <Carousel
          className="gsap-fade-in"
          buttonClassName="text-primary-darker bg-white/10 backdrop-blur-lg border-white/20 border hover:text-primary-darkest hover:bg-white/20"
        >
          {sortData.map((item) => (
            <Card
              key={item.id}
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
