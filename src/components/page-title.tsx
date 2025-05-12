'use client';

import { gmarket } from '@/fonts/font';
import { titleFormatter } from '@/lib/formetTitle';
import { useRouter } from 'next/router';

export default function PageTitle() {
  const router = useRouter();
  const title = titleFormatter(router.pathname);

  return (
    <h2
      className={`${gmarket.className} text-primary mb-6 text-xl font-bold sm:text-3xl dark:text-white`}
    >
      {title}
    </h2>
  );
}
