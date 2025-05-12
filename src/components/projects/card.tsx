import Image from 'next/image';
import Chips from '../chips';

type ProjectsDataTypes = {
  id: number;
  title: string;
  task: string;
  period: string;
  achive: string;
  stack: string[];
  img_src: string;
};

export default function Card({ data }: { data: ProjectsDataTypes[] }) {
  return (
    <>
      {data.map((item) => (
        <article
          key={item.id}
          className="dark:border-gray-30 border-gray-40 flex flex-col overflow-hidden rounded-2xl border bg-white text-black dark:bg-gray-50 dark:text-white"
        >
          <figure>
            <Image
              src={item.img_src}
              width={420}
              height={260}
              alt={`${item.title} 썸네일`}
              className="w-full"
            />
          </figure>
          <dl className="flex flex-col gap-1 p-6 text-sm">
            <div className="font-bold">
              <dt className="sr-only">프로젝트 명</dt>
              <dd>{item.title}</dd>
            </div>
            <div>
              <dt className="sr-only">담당 업무</dt>
              <dd>{item.task}</dd>
            </div>
            <div>
              <dt className="sr-only">기간</dt>
              <dd>{item.period}</dd>
            </div>
            <div>
              <dt className="sr-only">성과</dt>
              <dd>{item.achive}</dd>
            </div>
            <div className="mt-4">
              <dt className="sr-only">기술 스택</dt>
              <dd>
                <Chips data={item.stack} />
              </dd>
            </div>
          </dl>
        </article>
      ))}
    </>
  );
}
