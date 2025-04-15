import Link from 'next/link';
import Chips from './chips';
import { Project } from '@/types/project';

interface ListItemProps {
  data: Project[];
}

export default function ListItem({ data }: ListItemProps) {
  return (
    <ul className="flex flex-col gap-4">
      {data.map((item) => (
        <li key={item.id}>
          <Link
            href={`/projects/${item.id}`}
            aria-labelledby={`project-${item.id}`}
            className="flex flex-col gap-2 rounded-2xl bg-white p-4 md:m-auto md:w-12/16 md:flex-row md:p-6"
          >
            <header className="flex flex-col md:w-64">
              <h3
                id={`project-${item.id}`}
                className="order-2 text-base font-bold md:text-2xl"
              >
                {item.title}
              </h3>
              {item.period && (
                <span className="text-gray-10 order-1 text-sm font-normal md:pb-1">
                  {item.period}
                </span>
              )}
            </header>
            <div className="text-sm md:flex-1 md:text-base">
              {item.description.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              <Chips data={item.stack} chipsClassName="mt-4" />
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
