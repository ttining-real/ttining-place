import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

import { montserrat } from '@/fonts/font';
import { experienceTabs as tabs } from '@/constants/tabs';
import SectionLayout from '@/components/section-layout';
import Button from '@/components/button';
import TabSelector from '@/components/tab-selector';
import Card from '@/components/card';
import { supabase } from '@/lib/supabase';
import { formatDate } from '@/lib/formatDate';
import { sortedExperienceData } from '@/lib/sortedData';

import { ExperienceDataTypes } from '@/types/experience-data-type';

type ExperienceDataWithImageTypes = ExperienceDataTypes & {
  imagePublicUrl: string | null;
};

export const getServerSideProps: GetServerSideProps = async () => {
  const { data, error } = await supabase.from('experience').select('*');

  if (!data || error) {
    return {
      props: {
        error: error?.message || '🚫 알 수 없는 오류가 발생했어요!',
      },
    };
  }

  const dataWithImage: ExperienceDataWithImageTypes[] = data.map((item) => {
    const { data: imageData } = supabase.storage
      .from('experience')
      .getPublicUrl(`${item.image_url}.png`);

    return {
      ...item,
      imagePublicUrl: imageData?.publicUrl ?? null,
    };
  });

  return {
    props: {
      data: dataWithImage,
    },
  };
};

type Tab = (typeof tabs)[number];

export default function Page({
  data,
}: {
  data: ExperienceDataWithImageTypes[];
}) {
  const router = useRouter();

  const [selected, setSelected] = useState<Tab>('all');

  useEffect(() => {
    if (!router.isReady) return; // undefined일 경우 return

    const tab = router.query.tab;
    if (tab === 'careers' || tab === 'activities' || tab === 'all') {
      setSelected(tab);
    }
  }, [router.isReady, router.query.tab]);

  // const [openId, setOpenId] = useState<string | null>(null); // 아코디언 열린 항목 ID

  const sortedData = useMemo(() => sortedExperienceData(data), [data]);

  const careers = useMemo(
    () => sortedData.filter((item) => item.type === 'career'),
    [sortedData],
  );

  const activities = useMemo(
    () => sortedData.filter((item) => item.type === 'activity'),
    [sortedData],
  );

  const filtered = useMemo(() => {
    switch (selected) {
      case 'careers':
        return careers;
      case 'activities':
        return activities;
      default:
        return sortedData;
    }
  }, [selected, sortedData, careers, activities]);

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

  // const toggleOpen = (id: string) => {
  //   setOpenId((prev) => (prev === id ? null : id));
  // };

  return (
    <>
      <Head>
        <title>안지인 | 포트폴리오 - experience</title>
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:title" content="안지인 | 포트폴리오 - experience" />
        <meta
          property="og:description"
          content="UI 개발자 안지인의 포트폴리오입니다. 경력 사항을 확인하실 수 있습니다."
        />
        <meta
          name="description"
          content="UI 개발자 안지인의 포트폴리오입니다. 경력 사항을 확인하실 수 있습니다."
        />
      </Head>
      <SectionLayout outerClassName="sm:pt-[133px]" innerClassName="gap-8">
        <header
          className={`${montserrat.className} flex flex-col justify-between sm:flex-row sm:items-center`}
        >
          <h2
            className={`${montserrat.className} text-[32px] font-bold uppercase`}
          >
            Experience
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
            {filtered.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <Card key={item.id} src={item.imagePublicUrl}>
                  <div className="w-full">
                    <h4 className="text-text-primary text-lg font-semibold">
                      {item.company_name}
                    </h4>
                    <dl className="text-text-primary text-sm">
                      <div>
                        <dt className="sr-only">소속, 직급</dt>
                        <dd
                          className={clsx(
                            item.position ? 'flex items-center gap-2' : '',
                          )}
                        >
                          {item.position ? (
                            <>
                              <span>{item.department}</span>
                              <hr className="border-disabled-text h-3 w-0 border" />
                              <span>{item.position}</span>
                            </>
                          ) : (
                            <span>{item.department}</span>
                          )}
                        </dd>
                      </div>
                      <div>
                        <dt className="sr-only">작업 연도</dt>
                        <dd className={`${montserrat.className}`}>
                          {`${formatDate(item.start_date, 'dot')} ~ ${formatDate(item.end_date, 'dot')}`}
                        </dd>
                      </div>
                    </dl>
                  </div>
                  <Button variants="secondary" size="sm">
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
