import { useMemo, useRef } from 'react';

import SectionTitle from '@/components/section-title';
import Carousel from '@/components/carousel';
import Card from '@/components/home/card';
import Button from '@/components/button';
import { useGsapFadeInOnScroll } from '@/hooks/useGsapFadeInOnScroll';
import { sortedExperienceData } from '@/lib/sortedData';
import { formatDate } from '@/lib/formatDate';

import { ExperienceDataTypes } from '@/types/experience-data-type';

export default function ExperienceSection({
  data,
}: {
  data: ExperienceDataTypes[];
}) {
  const containerRef = useRef<HTMLDivElement>(null!);

  useGsapFadeInOnScroll(containerRef);

  const sortData = useMemo(() => sortedExperienceData(data), [data]);

  return (
    <section className="px-6 py-20">
      <div ref={containerRef} className="m-auto flex max-w-5xl flex-col gap-12">
        <header className="gsap-fade-in text-primary flex items-end gap-6">
          <SectionTitle title="experience" />
          <Button href="/experience" variant="tertiary" className="px-[8px]">
            자세히 보기
          </Button>
        </header>
        <Carousel
          className="gsap-fade-in"
          buttonClassName="border border-primary/40 hover:text-primary-darker hover:border-primary/60 hover:bg-primary/10"
        >
          {sortData.map((item) => (
            <Card
              key={item.id}
              href={`/experience/#${item.slug}`}
              type="experience"
              title={item.company_name}
              position={item.position}
              department={item.department}
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
