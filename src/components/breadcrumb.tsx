import Link from 'next/link';
import { useRouter } from 'next/router';

import Icon from '@/components/icon';

type BreadcrumbProps = {
  className?: string;
  current?: string;
};

// 기본 라벨 맵핑
const DEFAULT_LABEL_MAP: Record<string, string> = {
  about: '소개',
  resume: '이력',
  experience: '경험',
  projects: '프로젝트',
};

export default function Breadcrumb({ className, current }: BreadcrumbProps) {
  const router = useRouter();

  // 현재 경로
  const pathSegments = router.pathname.split('/').filter(Boolean);

  // 실제 URL 경로
  const asSegments = router.asPath.split('?')[0].split('/').filter(Boolean);

  // Home
  const fullSegments = [''].concat(pathSegments);
  const fullAsSegments = [''].concat(asSegments);

  const buildHref = (index: number) =>
    '/' + fullAsSegments.slice(1, index + 1).join('/');

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ul className="flex items-center gap-2 text-sm">
        {fullSegments.map((segment, index) => {
          const isLast = index === fullSegments.length - 1;
          const href = buildHref(index);

          let label = '홈';
          if (segment !== '') {
            const cleaned = segment.replace(/\[|\]/g, '');
            label =
              DEFAULT_LABEL_MAP[cleaned] ||
              decodeURIComponent(fullAsSegments[index]);
          }

          return (
            <li
              key={href}
              className="text-text-primary flex items-center gap-2"
            >
              {!isLast ? (
                <Link
                  href={href}
                  className="text-text-secondary hover:text-text-primary hover:underline"
                >
                  {label}
                </Link>
              ) : (
                <span className="text-primary font-medium">{current}</span>
              )}
              {!isLast && (
                <span className="text-disabled-text">
                  <Icon id="arrow-right" size={16} />
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
