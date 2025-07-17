import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { montserrat } from '@/fonts/font';
import { experienceTabs as tabs } from '@/constants/tabs';
import SectionLayout from '@/components/section-layout';
import Button from '@/components/button';
import Icon from '@/components/icon';
import Chip from '@/components/chip';
import TabSelector from '@/components/tab-selector';
import ImageCard from '@/components/image-card';
import { supabase } from '@/lib/supabase';
import { formatDate } from '@/lib/formatDate';
import { sortedExperienceData } from '@/lib/sortedData';

import { ExperienceDataTypes } from '@/types/experience-data-type';
import { useRouter } from 'next/router';

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

  const [openId, setOpenId] = useState<string | null>(null); // 아코디언 열린 항목 ID

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

  const toggleOpen = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

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
      <SectionLayout>
        <header
          className={`${montserrat.className} border-border flex flex-col justify-between border-b pb-2 sm:flex-row sm:items-center`}
        >
          <h2 className="mb-4 font-semibold uppercase sm:mb-0 sm:font-normal">
            Experience
          </h2>
          {/* 탭 메뉴 */}
          <TabSelector
            tabs={tabs}
            selected={selected}
            onChange={handleTabChange}
          />
        </header>

        {/* 리스트 영역 */}
        <div className="flex flex-col gap-8">
          <AnimatePresence>
            {filtered.map((item) => {
              const isOpen = openId === item.id;

              return (
                <motion.article
                  key={item.id}
                  id={item.slug}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="flex scroll-mt-32 flex-col md:flex-row md:gap-6"
                >
                  <ImageCard
                    src={item.imagePublicUrl}
                    priority
                    alt={`${item.company_name} 로고`}
                    className="flex h-full min-h-[264px] w-full items-center md:max-w-[420px]"
                  />

                  <div className="order-2 flex flex-1 flex-col gap-4 px-1 py-4">
                    <h3 className="text-text-primary text-xl font-semibold md:text-2xl">
                      {item.company_name}
                    </h3>
                    <p className="text-text-secondary text-sm">{`${formatDate(item.start_date)} - ${formatDate(item.end_date)}`}</p>
                    <div className="text-sm">
                      {item.description.map((desc, index) => (
                        <p key={index}>{desc}</p>
                      ))}
                    </div>

                    {/* 자세히 보기 버튼 */}
                    <Button
                      size="sm"
                      variants="secondary"
                      onClick={() => toggleOpen(item.id)}
                      className="border-primary/40 mt-2 w-fit"
                    >
                      <motion.span
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="inline-block"
                      >
                        <Icon id="arrow-bottom" size={16} />
                      </motion.span>
                      <AnimatePresence mode="wait" initial={false}>
                        <motion.span
                          key={isOpen ? 'Folding' : 'More View'}
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={{ duration: 0.2 }}
                          className={`${montserrat.className}`}
                        >
                          {isOpen ? 'Folding' : 'More View'}
                        </motion.span>
                      </AnimatePresence>
                    </Button>

                    {/* 아코디언 상세 영역 */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={`details-${item.id}`}
                          initial="collapsed"
                          animate="open"
                          exit="collapsed"
                          variants={{
                            open: { height: 'auto', opacity: 1 },
                            collapsed: { height: 0, opacity: 0 },
                          }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          className="overflow-hidden text-sm"
                        >
                          <dl className="flex flex-col gap-8">
                            <div>
                              <dt
                                className={`${montserrat.className} text-text-secondary mb-2 font-medium uppercase`}
                              >
                                Role
                              </dt>
                              <dd>
                                <ul className="text-text-primary list-disc pl-4">
                                  {item.major_task.map((task, index) => (
                                    <li key={index}>{task}</li>
                                  ))}
                                </ul>
                              </dd>
                            </div>
                            <div>
                              <dt
                                className={`${montserrat.className} text-text-secondary mb-2 font-medium uppercase`}
                              >
                                Achivements
                              </dt>
                              <dd>
                                <ul className="text-text-primary list-disc pl-4">
                                  {item.achievements.map((achive, index) => (
                                    <li key={index}>{achive}</li>
                                  ))}
                                </ul>
                              </dd>
                            </div>
                            <div>
                              <dt
                                className={`${montserrat.className} text-text-secondary mb-3 font-medium uppercase`}
                              >
                                Tech Stack
                              </dt>
                              <dd className="flex flex-wrap gap-1">
                                {item.tech_stack.map((stack, index) => (
                                  <Chip
                                    key={index}
                                    id={stack}
                                    icon={true}
                                    className={`${montserrat.className}`}
                                  />
                                ))}
                              </dd>
                            </div>
                            <div>
                              <dt
                                className={`${montserrat.className} text-text-secondary mb-2 font-medium uppercase`}
                              >
                                Location
                              </dt>
                              <dd className="text-text-primary">
                                {item.location}
                              </dd>
                            </div>
                          </dl>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>
      </SectionLayout>
    </>
  );
}
