import { formatIndex } from '@/lib/formatIndex';
import { CareersDataTypes } from '@/types/career-types';
import { StackDataTypes } from '@/types/tech-stack-types';
import { ReactNode } from 'react';

interface CardTypes {
  data: CareersDataTypes | StackDataTypes;
  index: number;
  children: ReactNode;
}

export default function Card({ data, index, children }: CardTypes) {
  return (
    <article
      key={data.id}
      className="flex flex-col gap-2 rounded-2xl bg-white p-6 shadow-lg"
    >
      <span aria-hidden={true} className="text-primary/60 font-bold">
        {formatIndex(index)}
      </span>
      <header className="flex items-center gap-2">
        {'company_name' in data && (
          <h3 className="text-lg font-bold text-black dark:text-white">
            {data.company_name}
          </h3>
        )}
        {'title' in data && (
          <h3 className="text-lg font-bold text-black dark:text-white">
            {data.title}
          </h3>
        )}
        {'department' in data && (
          <span className="text-gray-10 text-sm">{data.department}</span>
        )}
      </header>
      <div>{children}</div>
    </article>
  );
}
