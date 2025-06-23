import Image from 'next/image';
import Link from 'next/link';
import LoadingSpinner from '@/components/loading-spinner';

type CardProps = {
  type: 'experience' | 'projects';
  title: string;
  position?: string;
  department?: string;
  period: string;
  role: string[];
  image_url: string;
};

export default function Card({
  type,
  title,
  position,
  department,
  period,
  role,
  image_url,
}: CardProps) {
  // type별로 이미지 경로 prefix를 다르게 설정
  const imagePrefix =
    type === 'experience'
      ? 'experience'
      : type === 'projects'
        ? 'projects'
        : '';

  // type별로 타이틀 라벨 설정
  const titleLabel = type === 'experience' ? '회사명' : '프로젝트명';

  const experienceClassName = 'border-primary-lighter bg-white/30';
  const projectsClassName = 'bg-white/10 border-white/30';

  const classNamePrefix =
    type === 'experience'
      ? experienceClassName
      : type === 'projects'
        ? projectsClassName
        : '';

  return (
    <article className="">
      <Link href="/" className="flex h-full flex-col">
        <figure
          className={`flex aspect-video items-center justify-center overflow-hidden rounded-xl border backdrop-blur-lg ${classNamePrefix}`}
        >
          {image_url ? (
            <Image
              src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${imagePrefix}/${image_url}`}
              alt={title}
              width={240}
              height={135}
              className="w-full"
            />
          ) : (
            <div>
              <LoadingSpinner />
            </div>
          )}
        </figure>

        <dl className="flex flex-col gap-1 px-2 pt-4 text-sm">
          <div>
            <dt className="sr-only">{titleLabel}</dt>
            <dd className="flex items-center gap-1 text-base font-bold">
              {title}
            </dd>
          </div>

          {type === 'experience' && (
            <div>
              <dt className="sr-only">소속/직급</dt>
              <dd>
                {title === department ? null : department}{' '}
                {position ? <span>{position}</span> : null}
              </dd>
            </div>
          )}

          <div>
            <dt className="sr-only">기간</dt>
            <dd>{period}</dd>
          </div>

          <div className="pt-2">
            <dt className="sr-only">담당 업무</dt>
            <dd>
              <ul className="text-primary-darker flex flex-wrap gap-1">
                {role.map((item, index) => (
                  <li
                    key={index}
                    className="border-primary rounded-2xl border px-3 py-0.5"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        </dl>
      </Link>
    </article>
  );
}
