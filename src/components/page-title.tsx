'use client';

import { titleFormatter } from '@/lib/formetTitle';
import { useRouter } from 'next/router';

export default function PageTitle() {
  const router = useRouter();
  const title = titleFormatter(router.pathname);

  return (
    <h2 className="mb-6 text-2xl font-bold text-black dark:text-white">
      {title}
    </h2>
  );
}
