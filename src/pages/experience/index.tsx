'use client';

import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { experienceTabs as tabs } from '@/constants/tabs';
import Button from '@/components/button';
import Icon from '@/components/icon';
import Chip from '@/components/chip';
import TabSelector from '@/components/tab-selector';
import ImageCard from '@/components/image-card';
import { supabase } from '@/lib/supabase';
import { formatDate } from '@/lib/formatDate';
import { sortedExperienceData } from '@/lib/sortedData';

import { ExperienceDataTypes } from '@/types/experience-data-type';

export const getServerSideProps: GetServerSideProps = async () => {
  const { data, error } = await supabase.from('experience').select('*');

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

export default function Page({ data }: { data: ExperienceDataTypes[] }) {
  const [selected, setSelected] = useState<Tab>('all');
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
          content="안녕하세요. UI 개발자 안지인입니다."
        />
      </Head>
      <section className="m-auto min-h-[calc(100vh-273px)] max-w-5xl px-6 py-12">
        {/* 탭 메뉴 */}
        <TabSelector tabs={tabs} selected={selected} onChange={setSelected} />

        {/* 리스트 영역 */}
        <div className="space-y-6">
          <AnimatePresence>
            {filtered.map((item) => {
              const isOpen = openId === item.id;

              return (
                <motion.div
                  key={item.id}
                  id={item.slug}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="border-primary/20 flex flex-col gap-4 rounded-2xl border bg-white p-6 shadow-sm"
                  style={{
                    boxShadow: '0px 0px 16px 0px rgba(162,132,94,0.25)',
                  }}
                >
                  <div className="xs:flex-row flex flex-col items-start gap-8">
                    <ImageCard
                      src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/experience/${item.image_url}.png`}
                      alt={`${item.company_name} 로고`}
                      className="xs:max-w-[180px] aspect-4/3 w-full shrink-0 backdrop-blur-lg sm:max-w-[300px]"
                    />

                    <div className="order-2 flex flex-1 flex-col gap-2">
                      <h3 className="font-semibold">{item.company_name}</h3>
                      <p className="text-primary-darker text-sm">{`${formatDate(item.start_date)} - ${formatDate(item.end_date)}`}</p>
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
                            key={isOpen ? '접기' : '자세히 보기'}
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            transition={{ duration: 0.2 }}
                          >
                            {isOpen ? '접기' : '자세히 보기'}
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
                            className="mt-4 overflow-hidden text-sm text-gray-700"
                          >
                            <dl className="flex flex-col gap-4">
                              <div>
                                <dt className="text-primary mb-2 font-medium">
                                  주요 역할
                                </dt>
                                {item.major_task.map((task, index) => (
                                  <dd key={index}>{task}</dd>
                                ))}
                              </div>
                              <div>
                                <dt className="text-primary mb-2 font-medium">
                                  성과
                                </dt>
                                {item.achievements.map((achive, index) => (
                                  <dd key={index}>{achive}</dd>
                                ))}
                              </div>
                              <div>
                                <dt className="text-primary mb-2 font-medium">
                                  기술 스택
                                </dt>
                                <dd className="flex flex-wrap gap-1">
                                  {item.tech_stack.map((stack, index) => (
                                    <Chip key={index} id={stack} icon={true} />
                                  ))}
                                </dd>
                              </div>
                              <div>
                                <dt className="text-primary mb-2 font-medium">
                                  지역
                                </dt>
                                <dd>{item.location}</dd>
                              </div>
                            </dl>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}
