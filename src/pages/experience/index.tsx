'use client';

import Image from 'next/image';
import { GetServerSideProps } from 'next';
import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import Icon from '@/components/icon';
import StackIcon from '@/components/stack-icon';
import { experienceTabs as tabs } from '@/constants/tabs';
import { supabase } from '@/lib/supabase';
import { formatDate } from '@/lib/formatDate';
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

  const sortedData = useMemo(() => {
    return [...data].sort(
      (a, b) =>
        new Date(b.start_date).getTime() - new Date(a.start_date).getTime(),
    );
  }, [data]);

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
    <section className="m-auto flex min-h-[calc(100vh-273px)] w-full max-w-4xl flex-col items-start gap-6 px-6 py-12">
      {/* 탭 메뉴 */}
      <div className="bg-primary/20 relative flex w-full items-center gap-2 rounded-full p-1.5 sm:w-fit">
        {tabs.map((tab) => {
          const isActive = selected === tab;
          return (
            <button
              key={tab}
              onClick={() => setSelected(tab)}
              className={`focus-ring relative z-10 flex flex-1 items-center justify-center rounded-full py-2 font-medium capitalize transition-colors sm:px-6 ${isActive ? 'text-white' : 'text-primary'}`}
            >
              {isActive && (
                <motion.div
                  layoutId="pill"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  className="bg-primary absolute inset-0 z-0 rounded-full shadow-sm"
                />
              )}
              <span className="relative z-10">{tab}</span>
            </button>
          );
        })}
      </div>

      {/* 리스트 영역 */}
      <div className="space-y-4">
        <AnimatePresence>
          {filtered.map((item) => {
            const isOpen = openId === item.id;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="border-primary/20 flex flex-col gap-4 rounded-xl border bg-white p-4 shadow-sm"
                style={{ boxShadow: '0px 0px 16px 0px rgba(162,132,94,0.25)' }}
              >
                <div className="flex flex-col items-start gap-6 sm:flex-row">
                  <figure className="bg-primary/10 flex aspect-4/3 w-full shrink-0 items-center justify-center overflow-hidden rounded-xl backdrop-blur-lg sm:max-w-[240px]">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/careers/${item.image_url}`}
                      alt={`${item.company_name} 로고`}
                      width={340}
                      height={200}
                      className="aspect-video w-full"
                    />
                  </figure>

                  <div className="order-2 flex flex-1 flex-col gap-2">
                    <h3 className="font-semibold">{item.company_name}</h3>
                    <p className="text-primary-darker text-sm">{`${formatDate(item.start_date)} - ${formatDate(item.end_date)}`}</p>
                    <div className="text-sm">
                      {item.description.map((desc, index) => (
                        <p key={index}>{desc}</p>
                      ))}
                    </div>

                    {/* 자세히 보기 버튼 */}
                    <button
                      onClick={() => toggleOpen(item.id)}
                      aria-expanded={isOpen}
                      aria-controls={`details-${item.id}`}
                      className="focus-ring text-primary mt-2 inline-flex items-center gap-1 rounded-sm text-sm font-medium"
                    >
                      <span>{isOpen ? '접기' : '자세히 보기'}</span>
                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="inline-block"
                      >
                        <Icon id="arrow-bottom" size={16} />
                      </motion.div>
                    </button>

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
                              <dd>
                                <ul className="text-primary-darker flex flex-wrap gap-1">
                                  {item.tech_stack.map((stack, index) => (
                                    <li
                                      key={index}
                                      className="border-primary-lighter flex items-center gap-1 rounded-2xl border px-3 py-1"
                                    >
                                      <StackIcon id={stack} size={20} />
                                      {stack}
                                    </li>
                                  ))}
                                </ul>
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
  );
}
