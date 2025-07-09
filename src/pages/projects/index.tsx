import Head from 'next/head';
import Link from 'next/link';
import { GetServerSideProps } from 'next';
import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { montserrat, pretendard } from '@/fonts/font';
import { projectsTabs as tabs } from '@/constants/tabs';
import SectionLayout from '@/components/section-layout';
import Chip from '@/components/chip';
import TabSelector from '@/components/tab-selector';
import ImageCard from '@/components/image-card';
import { supabase } from '@/lib/supabase';
import { formatDate } from '@/lib/formatDate';
import { sortedProjectsData } from '@/lib/sortedData';

import { ProjectsDataTypes } from '@/types/projects-data-type';

export const getServerSideProps: GetServerSideProps = async () => {
  const { data, error } = await supabase.from('projects').select('*');

  if (!data || error) {
    return {
      props: {
        error: error?.message || '🚫 알 수 없는 오류가 발생했어요!',
      },
    };
  }

  return {
    props: {
      data,
    },
  };
};

type Tab = (typeof tabs)[number];

export default function Page({ data }: { data: ProjectsDataTypes[] }) {
  const [selected, setSelected] = useState<Tab>('all');

  const sortedData = useMemo(() => sortedProjectsData(data), [data]);

  const main = useMemo(
    () => sortedData.filter((item) => item.type === 'main'),
    [sortedData],
  );
  const side = useMemo(
    () => sortedData.filter((item) => item.type === 'side'),
    [sortedData],
  );

  const filtered = useMemo(() => {
    switch (selected) {
      case 'main':
        return main;
      case 'side':
        return side;
      default:
        return sortedData;
    }
  }, [selected, sortedData, main, side]);

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
      <SectionLayout>
        <header
          className={`${montserrat.className} border-border flex flex-col justify-between border-b pb-2 sm:flex-row sm:items-center`}
        >
          <h3 className="mb-4 font-semibold uppercase sm:mb-0 sm:font-normal">
            Projects
          </h3>
          {/* 탭 메뉴 */}
          <TabSelector tabs={tabs} selected={selected} onChange={setSelected} />
        </header>
        {/* 리스트 영역 */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-4">
          <AnimatePresence>
            {filtered.map((item) => {
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col gap-4"
                >
                  <Link
                    href={`/projects/${item.slug}`}
                    className="focus-ring flex h-full flex-col gap-4 rounded-2xl sm:p-4"
                  >
                    <div className="order-2 p-2">
                      <h3 className="mb-2 text-xl font-semibold sm:text-xl">
                        {item.title}
                      </h3>
                      <dl className="flex flex-col gap-2">
                        <div>
                          <dt className="sr-only">작업 기간</dt>
                          <dd
                            className={`${montserrat.className} text-text-secondary text-sm`}
                          >
                            {`${formatDate(item.start_date)} - ${formatDate(item.end_date)}`}
                          </dd>
                        </div>
                        <div className="mb-4">
                          <dt className="sr-only">요약</dt>
                          <dd className="text-text-secondary">
                            {item.summary}
                          </dd>
                        </div>
                        <div className="mt-1">
                          <dt className="sr-only">역할</dt>
                          <dd className="flex gap-1">
                            {item.role.map((r, i) => (
                              <Chip
                                key={i}
                                id={r}
                                className={`${pretendard.className} bg-section text-sm`}
                              />
                            ))}
                          </dd>
                        </div>
                      </dl>
                    </div>
                    <ImageCard
                      src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/projects/${item.image_url}.png`}
                      alt={`${item.title} 썸네일`}
                      className="aspect-video overflow-hidden"
                      noneClassName="bg-surface"
                    />
                  </Link>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </SectionLayout>
    </>
  );
}
