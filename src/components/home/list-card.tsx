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
      className={`focus-ring bg-surface sm:border-border flex h-full flex-col justify-between overflow-hidden rounded-3xl shadow-md sm:flex-row sm:rounded-none sm:border-t sm:bg-transparent sm:shadow-none ${className}`}
    >
      <ImageCard
        src={src}
        priority
        alt={`${title} 썸네일`}
        className={`min-h-[236px] w-full sm:max-w-[420px] ${reverse ? 'sm:order-2' : 'sm:order-1'}`}
      />

      <div
        className={`flex w-full flex-col items-start p-6 ${reverse ? 'sm:order-1' : 'sm:order-2'}`}
      >
        <h3 className="mb-1 text-lg font-semibold sm:text-xl">{title}</h3>
        <dl>
          <dt className="sr-only">요약</dt>
          <dd className="text-text-secondary mb-6 text-sm">{summary}</dd>
        </dl>
        <Button
          href={href}
          variants="secondary"
          size="sm"
          ariaLabel={`${title} 상세 페이지로 이동`}
        >
          자세히 보기
        </Button>
      </div>
    </article>
  );
}
