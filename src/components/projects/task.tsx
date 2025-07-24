import { montserrat } from '@/fonts/font';
import SectionLayout from '@/components/section-layout';

export default function TaskSection({ data }: { data: string[] }) {
  return (
    <SectionLayout
      outerClassName="bg-primary-light/10"
      innerClassName="flex-col md:flex-row items-center gap-12"
    >
      <h3
        className={`${montserrat.className} text-text-primary w-[200px] shrink-0 text-center text-[32px] font-semibold md:text-left`}
      >
        Task
      </h3>
      <hr className="border-primary-light/20 w-16 border md:h-16 md:w-0" />
      <ul className="text-center md:text-left">
        {data.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </SectionLayout>
  );
}
