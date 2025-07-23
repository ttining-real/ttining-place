import { montserrat } from '@/fonts/font';
import SectionLayout from '@/components/section-layout';
import clsx from 'clsx'; // 또는 classnames

interface ResultDataTypes {
  data: string[] | Record<string, string | string[]>[];
}

export default function ResultSection({ data }: ResultDataTypes) {
  const colCount = Math.min(data.length, 6);

  const colClasses: Record<number, string> = {
    1: 'md:grid-cols-1',
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-4',
    5: 'md:grid-cols-5',
    6: 'md:grid-cols-6',
  };

  return (
    <SectionLayout outerClassName="bg-primary" innerClassName="gap-8">
      <h3
        className={`${montserrat.className} text-[32px] font-semibold text-white`}
      >
        Result
      </h3>
      <div className={clsx('grid grid-cols-1', colClasses[colCount])}>
        {data.map((result, index) => {
          const [key, value] = Object.entries(result)[0];

          return (
            <dl
              key={index}
              className="relative border-l border-white py-4 pr-4 pl-4 before:absolute before:top-7 before:-left-[3px] before:h-[5px] before:w-[5px] before:rounded-md before:bg-white before:content-[''] md:border-t md:border-l-0 md:pl-2 md:before:-top-[3px] md:before:left-4"
            >
              <dt>
                <span
                  aria-hidden
                  className={`${montserrat.className} text-lg font-bold text-white/40`}
                >{`0${index + 1}`}</span>
                <h4 className="my-2 text-lg font-semibold text-white">{key}</h4>
              </dt>
              <dd className="text-sm text-white">{value}</dd>
            </dl>
          );
        })}
      </div>
    </SectionLayout>
  );
}
