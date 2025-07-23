import { montserrat } from '@/fonts/font';
import SectionLayout from '@/components/section-layout';

interface ActionDataTypes {
  data: string[] | Record<string, string | string[]>[];
}

export default function ActionSection({ data }: ActionDataTypes) {
  return (
    <SectionLayout innerClassName="gap-8">
      <h3
        className={`${montserrat.className} text-text-primary text-[32px] font-semibold`}
      >
        Action
      </h3>
      <div className="grid gap-6 md:grid-cols-2">
        {data.map((result, index) => {
          const [key, value] = Object.entries(result)[0];

          return (
            <dl
              key={index}
              className="bg-bg box-shadow flex flex-col gap-6 rounded-2xl p-6 shadow-md"
            >
              <dt className="flex items-center justify-between gap-6">
                <h4 className="text-primary my-2 text-lg font-semibold">
                  {key}
                </h4>
                <span
                  aria-hidden
                  className={`${montserrat.className} text-primary bg-primary/10 flex h-8 w-8 items-center justify-center rounded-full text-lg font-bold`}
                >{`0${index + 1}`}</span>
              </dt>
              <dd className="text-text-primary text-sm">{value}</dd>
            </dl>
          );
        })}
      </div>
    </SectionLayout>
  );
}
