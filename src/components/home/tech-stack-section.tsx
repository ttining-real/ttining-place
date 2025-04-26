import StackIcon from '../icon/stack-icon';
import Link from 'next/link';
import { gmarket } from '@/fonts/font';
import { StackDataTypes } from '@/types/tech-stack-types';

export default function TechStackSection({ data }: { data: StackDataTypes[] }) {
  const formatNumber = (i: number) => {
    if (i < 10) {
      return `0${i}`;
    }
  };

  return (
    <section
      className={`bg-[url(/images/tech-stack.png)] bg-cover bg-fixed bg-bottom bg-no-repeat px-6 py-16`}
    >
      <div className="m-auto flex max-w-5xl flex-col gap-6">
        <h2
          className={`${gmarket.className} text-xl font-bold text-white sm:text-2xl`}
        >
          Tech Stack
        </h2>
        <div className="flex flex-wrap gap-6">
          {data.map((data, index) => (
            <article
              key={data.id}
              aria-labelledby={`tech-stack-title-${index}`}
              className="flex flex-1 flex-col gap-2 rounded-3xl bg-white/15 backdrop-blur-md transition-all duration-300 hover:bg-white/25"
            >
              <Link
                href={`/tech-stack/#${String(data.title).toLowerCase()}`}
                className="h-full p-6"
              >
                <p className="text-base font-semibold text-white/50 sm:text-lg">
                  {formatNumber(index + 1)}
                </p>
                <h3
                  id={`tech-stack-title-${index}`}
                  className="text-xl font-bold text-white sm:text-xl"
                >
                  {data.title}
                </h3>
                {Array.isArray(data.stack_items) &&
                  data.stack_items.some(
                    (item) =>
                      Array.isArray(item.stack_icons) &&
                      item.stack_icons.length > 0,
                  ) && (
                    <ul
                      aria-label={`${data.title} 관련 기술 스택 아이콘`}
                      className="mt-1 flex flex-wrap gap-2"
                    >
                      {data.stack_items.map((item) =>
                        item.stack_icons.map((icon) => (
                          <li key={icon.id} aria-label={`${icon.name} 아이콘`}>
                            <StackIcon id={icon.name} size={16} />
                          </li>
                        )),
                      )}
                    </ul>
                  )}
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
