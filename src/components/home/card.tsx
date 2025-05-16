import { formatIndex } from '@/lib/formatIndex';
import { CareersDataTypes } from '@/types/career-types';
import { StackDataTypes } from '@/types/tech-stack-types';
import Link from 'next/link';
import { ReactNode } from 'react';

interface CardTypes {
  href: string;
  data: CareersDataTypes | StackDataTypes;
  index: number;
  children: ReactNode;
}

export default function Card({ href, data, index, children }: CardTypes) {
  const anchor =
    'title' in data
      ? data.title
      : 'company_name' in data
        ? data.company_name
        : '';

  return (
    <article
      key={data.id}
      className="hover:border-primary/60 overflow-hidden rounded-2xl border-2 border-white bg-white shadow-lg transition-all duration-300"
    >
      <Link
        href={`/${href}#${encodeURIComponent(anchor)}`}
        className="flex h-full flex-col gap-2 p-6"
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
            <h3 className="w-full text-lg font-bold break-words text-black dark:text-white">
              {data.title}
            </h3>
          )}
          {'department' in data && (
            <span className="text-gray-10 text-sm">{data.department}</span>
          )}
        </header>
        <div>{children}</div>
      </Link>
    </article>
  );
}
