import Link from 'next/link';
import Image from 'next/image';

import { montserrat } from '@/fonts/font';
import SectionLayout from '@/components/section-layout';

const GridCard = ({
  href,
  subtitle,
  title,
  description,
}: {
  href: string;
  subtitle: string;
  title: string;
  description: string;
}) => {
  return (
    <article className={articleClassName}>
      <Link href={href} className="block p-8">
        <p
          aria-hidden
          className={`${montserrat.className} text-text-secondary mb-2 uppercase`}
        >
          {subtitle}
        </p>
        <h3 className={`${montserrat.className} mb-6 text-2xl font-bold`}>
          {title}
        </h3>
        <p>{description}</p>
      </Link>
    </article>
  );
};

const articleClassName =
  'relative rounded-3xl border border-border/20 bg-white/10 backdrop-blur-md shadow-lg transition-all hover:border-border/60 hover:bg-white/20 hover:shadow-xl dark:bg-white/5 dark:hover:bg-white/10';

export default function GridMenuSection() {
  return (
    <SectionLayout outerClassName="bg-bg" innerClassName="sm:flex-row">
      <article className={articleClassName}>
        <Link
          href="/about"
          className="flex h-full flex-col justify-between p-8"
        >
          <div>
            <h2
              className={`${montserrat.className} text-text-secondary mb-2 uppercase`}
            >
              About
            </h2>
            <h3 className={`${montserrat.className} mb-6 text-2xl font-bold`}>
              Designer & Publisher & Developer
            </h3>
          </div>
          <div className="flex items-center gap-4">
            <p>
              UI/UX 디자인과 퍼블리싱 경험을 바탕으로 프론트엔드 개발까지 영역을
              확장시키고 있습니다.
            </p>
            <Image
              src="/images/ttining-clay.webp"
              width={200}
              height={200}
              alt="클레이 이미지"
              className="aspect-square w-1/3"
            />
          </div>
        </Link>
      </article>
      <div className="flex w-full flex-col justify-between gap-6">
        <h2 className="sr-only">Experience</h2>
        <GridCard
          href="/experience?tab=careers"
          subtitle="Experience"
          title="Careers"
          description="담당한 직무와 역할 중심의 근무 경험을 정리했습니다."
        />
        <GridCard
          href="/experience?tab=activities"
          subtitle="Experience"
          title="Activities"
          description="인턴 및 프리랜서 등 외부 활동을 정리했습니다."
        />
      </div>
    </SectionLayout>
  );
}
