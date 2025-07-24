import Image from 'next/image';
import { useState } from 'react';

import SectionLayout from '@/components/section-layout';
import Breadcrumb from '@/components/breadcrumb';
import ImageFallback from '@/components/image-fallback';
import { formatDate } from '@/lib/formatDate';

type SummarySectionProps = {
  title: string;
  summary: string;
  role: string[];
  start_date: string;
  end_date: string;
  description: string[];
  url: string;
  imagePublicUrl: string | null;
};

type DefinitionListRowProps = {
  label: string;
  children: React.ReactNode;
};

function DefinitionListRow({ label, children }: DefinitionListRowProps) {
  return (
    <div className="flex items-baseline gap-4">
      <h4 className="text-primary bg-primary/10 min-w-[80px] rounded-2xl py-1 text-center text-sm font-medium">
        {label}
      </h4>
      <div className="text-text-primary text-sm">{children}</div>
    </div>
  );
}

export default function SummarySection({
  title,
  summary,
  role,
  start_date,
  end_date,
  description,
  url,
  imagePublicUrl,
}: SummarySectionProps) {
  const [isValidSrc, setIsValidSrc] = useState(true);

  return (
    <SectionLayout outerClassName="relative bg-section pt-[88px] sm:pt-[136px] pb-8">
      <div className="m-auto flex w-full max-w-7xl flex-col gap-8">
        <h2 className="text-primary order-2 text-[32px] font-bold">{title}</h2>
        <Breadcrumb className="order-1" current={title} />
      </div>
      <h3 className="sr-only">Summary</h3>
      <div className="grid grid-cols-1 gap-y-8 md:grid-cols-3 md:gap-6">
        <div className="col-span-2 space-y-2">
          <DefinitionListRow label="요약">{summary}</DefinitionListRow>
          <DefinitionListRow label="클라이언트">다누시스</DefinitionListRow>
          <DefinitionListRow label="담당">{role.join(', ')}</DefinitionListRow>
          <DefinitionListRow label="기여도">70%</DefinitionListRow>
          <DefinitionListRow label="기간">
            {`${formatDate(start_date, 'kor')} - ${formatDate(end_date, 'kor')}`}
          </DefinitionListRow>
          <DefinitionListRow label="설명">
            <div className="space-y-1">
              {description.map((desc, i) => (
                <p key={i}>{desc}</p>
              ))}
            </div>
          </DefinitionListRow>
          {url && (
            <DefinitionListRow label="웹사이트">
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary dark:text-primary-light hover:underline"
              >
                {title} 웹사이트 열기
              </a>
            </DefinitionListRow>
          )}
        </div>
        <figure>
          {imagePublicUrl && isValidSrc ? (
            <Image
              src={imagePublicUrl}
              alt=""
              width={200}
              height={200}
              className="aspect-video w-full overflow-hidden object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
              onError={() => setIsValidSrc(false)}
            />
          ) : (
            <ImageFallback />
          )}
        </figure>
      </div>
    </SectionLayout>
  );
}
