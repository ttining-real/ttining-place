import Head from 'next/head';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { montserrat } from '@/fonts/font';
import { projectsTabs as tabs } from '@/constants/tabs';
import SectionLayout from '@/components/section-layout';
import TabSelector from '@/components/tab-selector';
import Card from '@/components/card';
import Button from '@/components/button';
import { supabase } from '@/lib/supabase';
import { formatYears } from '@/lib/formatDate';
import { sortedProjectsData } from '@/lib/sortedData';

import { ProjectsDataTypes } from '@/types/projects-data-type';

type ProjectsDataWithImageTypes = ProjectsDataTypes & {
  imagePublicUrl: string | null;
};

export const getStaticProps: GetStaticProps = async () => {
  const { data, error } = await supabase.from('projects').select('*');

  if (!data || error) {
    return {
      props: {
        error: error?.message || '🚫 알 수 없는 오류가 발생했어요!',
      },
    };
  }

  const dataWithImage: ProjectsDataWithImageTypes[] = await Promise.all(
    data.map(async (item) => {
      let imagePublicUrl: string | null = null;

      if (item.slug && item.slug.trim() !== '') {
        const imagePath = `${item.slug}.png`;

        // 이미지 파일 존재 여부 확인
        const { data: existsCheck, error: downloadError } =
          await supabase.storage.from('projects').download(imagePath);

        const imageExists = !!existsCheck && !downloadError;

        if (imageExists) {
          const { data: imageData } = supabase.storage
            .from('projects')
            .getPublicUrl(imagePath);

          imagePublicUrl = imageData?.publicUrl ?? null;
        }
      }

      return {
        ...item,
        imagePublicUrl,
      };
    }),
  );

  return {
    props: {
      data: dataWithImage,
    },
    revalidate: 60,
  };
};

type Tab = (typeof tabs)[number];

export default function Page({ data }: { data: ProjectsDataWithImageTypes[] }) {
  const router = useRouter();

  const [selected, setSelected] = useState<Tab>('all');

  useEffect(() => {
    if (!router.isReady) return; // undefined일 경우 return

    const tab = router.query.tab;
    if (tab === 'work' || tab === 'side' || tab === 'all') {
      setSelected(tab);
    }
  }, [router.isReady, router.query.tab]);

  const sortedData = useMemo(() => sortedProjectsData(data), [data]);

  const work = useMemo(
    () => sortedData.filter((item) => item.type === 'work'),
    [sortedData],
  );
  const side = useMemo(
    () => sortedData.filter((item) => item.type === 'side'),
    [sortedData],
  );

  const filtered = useMemo(() => {
    switch (selected) {
      case 'work':
        return work;
      case 'side':
        return side;
      default:
        return sortedData;
    }
  }, [selected, sortedData, work, side]);

  const handleTabChange = (newTab: Tab) => {
    setSelected(newTab);
    router.replace(
      {
        pathname: router.pathname,
        query: { ...router.query, tab: newTab },
      },
      undefined,
      { shallow: true },
    );
  };

  return (
    <>
      <Head>
        <title>안지인 | 포트폴리오 - projects</title>
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:title" content="안지인 | 포트폴리오 - projects" />
        <meta
          property="og:description"
          content="UI 개발자 안지인의 포트폴리오입니다. 주요 프로젝트 및 사이드 프로젝트를 확인하실 수 있습니다."
        />
        <meta
          name="description"
          content="UI 개발자 안지인의 포트폴리오입니다. 주요 프로젝트 및 사이드 프로젝트를 확인하실 수 있습니다."
        />
      </Head>
      <SectionLayout outerClassName="sm:pt-[133px]" innerClassName="gap-8">
        <header
          className={`${montserrat.className} flex flex-col justify-between gap-4 sm:flex-row sm:items-center`}
        >
          <h2
            className={`${montserrat.className} text-[32px] font-bold uppercase`}
          >
            Projects
          </h2>
          <TabSelector
            tabs={tabs}
            selected={selected}
            onChange={handleTabChange}
          />
        </header>
        {/* 리스트 영역 */}
        <h3 className="sr-only">{router.query.tab}</h3>
        <section className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          <AnimatePresence>
            {filtered.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <Card
                  key={item.id}
                  href={{
                    pathname: `/projects/${item.slug}`,
                    query: { tab: selected },
                  }}
                  src={item.imagePublicUrl}
                  priority={index === 0}
                >
                  <div className="w-full">
                    <h4 className="text-text-primary text-lg font-semibold">
                      {item.title}
                    </h4>
                    <dl className="text-text-primary text-sm">
                      <div>
                        <dt className="sr-only">주요 업무</dt>
                        <dd>{item.role.join(', ')}</dd>
                      </div>
                      <div>
                        <dt className="sr-only">작업 연도</dt>
                        <dd className={`${montserrat.className}`}>
                          {formatYears(item.start_date, item.end_date)}
                        </dd>
                      </div>
                    </dl>
                  </div>
                  <Button
                    variants="secondary"
                    size="sm"
                    href={{
                      pathname: `/projects/${item.slug}`,
                      query: { tab: selected },
                    }}
                  >
                    자세히 보기
                  </Button>
                  <span
                    className={`${montserrat.className} bg-primary/10 text-primary border-primary absolute top-4 left-4 rounded-2xl border px-2 py-0.5 text-sm font-medium`}
                  >
                    {item.type}
                  </span>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </section>
      </SectionLayout>
    </>
  );
}
