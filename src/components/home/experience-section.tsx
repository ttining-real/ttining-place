import { gmarket } from '@/fonts/font';
import { CareersDataTypes } from '@/types/career-types';
import Card from './card';

export default function ExperienceSection({
  data,
}: {
  data: CareersDataTypes[];
}) {
  return (
    <section className="py-8">
      <div className="m-auto flex max-w-5xl flex-col gap-6 p-6 sm:gap-8">
        <h2
          className={`${gmarket.className} text-xl font-bold text-black sm:text-2xl dark:text-white`}
        >
          Experience
        </h2>
        <div className="flex gap-2 sm:gap-4">
          <Card data={data} />
        </div>
      </div>
    </section>
  );
}
