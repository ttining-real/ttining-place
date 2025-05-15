import Link from 'next/link';

import { StackDataTypes } from '@/types/tech-stack-types';
import StackIcon from '@/components/icon/stack-icon';
import { pretendard } from '@/fonts/font';

export default function StackCard({ data }: { data: StackDataTypes[] }) {
  const formatNumber = (i: number) => {
    if (i < 10) {
      return `0${i}`;
    }
  };

  return (
    <>
      {data.map((stack, index) => (
        <article
          key={stack.id}
          aria-labelledby={`tech-stack-title-${index}`}
          className="rounded-2xl bg-white p-4 shadow-lg dark:bg-gray-50"
        >
          <Link
            href={`/tech-stack/#${stack.title}`}
            className={`${pretendard.className}`}
          >
            <span className="text-primary font-bold">
              {formatNumber(index + 1)}
            </span>
            <h3
              id={`tech-stack-title-${index}`}
              className="mb-4 text-lg font-bold dark:text-white"
            >
              {stack.title}
            </h3>
            {Array.isArray(stack.stack_items) &&
              stack.stack_items.some(
                (item) =>
                  Array.isArray(item.stack_icons) &&
                  item.stack_icons.length > 0,
              ) && (
                <ul
                  aria-label={`${stack.title} 관련 기술 스택 아이콘`}
                  className="flex flex-wrap gap-1"
                >
                  {stack.stack_items.map((item) =>
                    item.stack_icons.map((icon) => (
                      <StackIcon key={icon.id} id={icon.name} size={16} />
                    )),
                  )}
                </ul>
              )}
          </Link>
        </article>
      ))}
    </>
  );
}
