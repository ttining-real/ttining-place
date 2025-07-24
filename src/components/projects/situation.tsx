import { montserrat } from '@/fonts/font';
import SectionLayout from '@/components/section-layout';

export default function SituationSection({ data }: { data: string[] }) {
  return (
    <SectionLayout
      outerClassName="bg-[#f3f3f3] dark:bg-[#292B2E]"
      innerClassName="flex-col md:flex-row items-center gap-12"
    >
      <h3
        className={`${montserrat.className} text-text-primary w-[200px] shrink-0 text-center text-[32px] font-semibold md:text-left`}
      >
        Situation
      </h3>
      <hr className="border-border w-16 border md:h-16 md:w-0" />
      <ul className="text-center md:text-left">
        {data.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </SectionLayout>
  );
}
