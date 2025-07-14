import Button from '@/components/button';
import ImageCard from '@/components/image-card';

type ListCardProps = {
  href: string;
  title: string;
  summary: string;
  position?: string;
  department?: string;
  period: string;
  role: string[];
  src?: string;
  reverse?: boolean;
  className?: string;
};

export default function ListCard({
  href,
  title,
  summary,
  src,
  reverse = false,
  className = '',
}: ListCardProps) {
  return (
    <article
      className={`focus-ring border-border flex h-full flex-col justify-between gap-4 border-t sm:flex-row ${className}`}
    >
      <ImageCard
        src={src}
        priority
        alt={`${title} 썸네일`}
        className={`min-h-[236px] w-full sm:max-w-[420px] ${reverse ? 'sm:order-2' : 'sm:order-1'}`}
      />

      <div
        className={`flex w-full flex-col items-start justify-between gap-8 p-2 md:p-8 ${reverse ? 'sm:order-1' : 'sm:order-2'}`}
      >
        <dl>
          <div className="mb-4">
            <dt className="sr-only">프로젝트 명</dt>
            <dd className="flex items-center gap-1 text-lg font-bold sm:text-2xl">
              {title}
            </dd>
          </div>

          <div>
            <dt className="sr-only">요약</dt>
            <dd className="text-sm sm:text-base">{summary}</dd>
          </div>
        </dl>
        <Button
          href={href}
          variants="secondary"
          ariaLabel={`${title} 상세 페이지로 이동`}
        >
          자세히 보기
        </Button>
      </div>
    </article>
  );
}
