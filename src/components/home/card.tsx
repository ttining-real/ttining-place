import Link from 'next/link';

type CardProps = {
  href: string;
  title: string;
  description?: string[];
  startDate: string;
  endDate: string;
};

function formatYears(startDate: string, endDate: string): string {
  const startYear = new Date(startDate).getFullYear();
  const endYear = new Date(endDate).getFullYear();

  return startYear === endYear ? `${startYear}` : `${startYear} - ${endYear}`;
}

export default function Card({
  href,
  title,
  description,
  startDate,
  endDate,
}: CardProps) {
  return (
    <article>
      <Link
        href={href}
        className="focus-ring bg-surface border-border hover:border-primary-light active:border-primary-darker active:bg-section flex h-full flex-col items-start gap-6 rounded-2xl border p-8"
      >
        <h1 className="flex w-full items-center justify-between text-lg font-semibold sm:text-xl">
          {title}
          <span className="bg-primary/10 rounded-4xl px-4 py-1.5 text-sm font-normal">
            {formatYears(startDate, endDate)}
          </span>
        </h1>
        <ul className="text-text-secondary text-sm sm:text-base">
          {description?.map((desc, index) => <li key={index}>{desc}</li>)}
        </ul>
      </Link>
    </article>
  );
}
