import Image from 'next/image';
import Chips from '@/components/chips';
import { ProjectsDataTypes } from '@/types/projects-types';
import { formatDate } from '@/lib/formatDate';
import Link from 'next/link';

export default function Card({ data }: { data: ProjectsDataTypes[] }) {
  return (
    <>
      {data.map((item) => (
        <article
          key={item.id}
          className="dark:border-gray-30 border-gray-40 flex flex-col overflow-hidden rounded-2xl border bg-white text-black dark:bg-gray-50 dark:text-white"
        >
          <Link href="#">
            <figure>
              <Image
                src={'/images/example.png'}
                width={420}
                height={260}
                alt={`${item.title} 썸네일`}
                className="w-full"
                priority
              />
            </figure>
            <dl className="flex flex-col gap-1 p-6">
              <div className="text-base font-bold">
                <dt className="sr-only">프로젝트 명</dt>
                <dd>{item.title}</dd>
              </div>
              <div className="text-sm">
                <dt className="sr-only">요약</dt>
                <dd>{item.summary}</dd>
              </div>
              <div className="text-gray-10 text-sm">
                <dt className="sr-only">기간</dt>
                <dd>{`${formatDate(item.start_date)} ~ ${formatDate(item.start_date)}`}</dd>
              </div>
              <div className="text-gray-10 mt-1 text-sm">
                <dt className="sr-only">담당 업무</dt>
                <dd>
                  <Chips data={item.role} />
                </dd>
              </div>
            </dl>
          </Link>
        </article>
      ))}
    </>
  );
}
