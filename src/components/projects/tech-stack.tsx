import { montserrat } from '@/fonts/font';
import SectionLayout from '@/components/section-layout';
import Chip from '@/components/chip';

export default function TechStackSection({ data }: { data: string[] }) {
  const sectionClassName = 'flex flex-col gap-6 text-[15px]';

  return (
    <SectionLayout innerClassName="bg-bg border-border border p-6 rounded-xl shadow-md">
      <section className={`${sectionClassName} items-center gap-12`}>
        <h3 className={`${montserrat.className} text-2xl font-semibold`}>
          Tech Stack
        </h3>
        <ul className="flex max-w-3xl flex-wrap justify-center gap-2">
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
      </section>
    </SectionLayout>
  );
}
