import { montserrat } from '@/fonts/font';
import SectionLayout from '@/components/section-layout';
import Chip from '@/components/chip';

export default function TechStackSection({ data }: { data: string[] }) {
  return (
    <SectionLayout innerClassName="items-center gap-12">
      <h3 className={`${montserrat.className} text-[32px] font-semibold`}>
        Tech Stack
      </h3>
      <ul className="flex max-w-4xl flex-wrap justify-center gap-2">
        {data.map((s, i) => (
          <li key={i}>
            <Chip
              id={s}
              icon={true}
              className={`${montserrat.className} bg-section`}
            />
          </li>
        ))}
      </ul>
    </SectionLayout>
  );
}
