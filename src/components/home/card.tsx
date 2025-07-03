import Link from 'next/link';

import Chip from '@/components/chip';
import ImageCard from '@/components/image-card';

type CardProps = {
  type: 'experience' | 'projects';
  href: string;
  title: string;
  position?: string;
  department?: string;
  period: string;
  role: string[];
  image_url: string;
};

export default function Card({
  type,
  href,
  title,
  position,
  department,
  period,
  role,
  image_url,
}: CardProps) {
  // type별로 타이틀 라벨 설정
  const titleLabel = {
    experience: '회사명',
    projects: '프로젝트명',
  }[type];

  return (
    <article>
      <Link href={href} className="focus-ring flex h-full flex-col rounded-xl">
        <ImageCard
          src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${type}/${image_url}.png`}
          alt={`${type === 'experience' ? `${title} 로고` : `${title} 썸네일`}`}
          className={`aspect-video ${type === 'projects' ? 'text-primary-darkest border-white/20 bg-white/10' : ''}`}
        />

        <dl className="flex flex-col gap-1 px-2 pt-4 text-sm">
          <div>
            <dt className="sr-only">{titleLabel}</dt>
            <dd className="flex items-center gap-1 text-base font-bold">
              {title}
            </dd>
          </div>

          {type === 'experience' && department && title !== department && (
            <div>
              <dt className="sr-only">소속/직급</dt>
              <dd>
                {department}
                {position && <span> {position}</span>}
              </dd>
            </div>
          )}

          <div>
            <dt className="sr-only">기간</dt>
            <dd>{period}</dd>
          </div>

          <div className="pt-2">
            <dt className="sr-only">담당 업무</dt>
            <dd className="flex flex-wrap gap-1">
              {role.map((item, index) => (
                <Chip
                  key={index}
                  id={item}
                  {...(type === 'projects' && {
                    className:
                      'bg-white/15 text-primary-darkest backdrop-blur-lg border border-white/20',
                  })}
                />
              ))}
            </dd>
          </div>
        </dl>
      </Link>
    </article>
  );
}
