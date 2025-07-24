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
import Dialog from '@/components/dialog';
import Chip from '@/components/chip';

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

  const dataWithImage: ExperienceDataWithImageTypes[] = await Promise.all(
    data.map(async (item) => {
      let imagePublicUrl: string | null = null;

      if (item.slug && item.slug.trim() !== '') {
        const imagePath = `${item.slug}.png`;

        // 이미지 파일 존재 여부 확인
        const { data: existsCheck, error: downloadError } =
          await supabase.storage.from('experience').download(imagePath);

        const imageExists = !!existsCheck && !downloadError;

        if (imageExists) {
          const { data: imageData } = supabase.storage
            .from('experience')
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
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] =
    useState<ExperienceDataWithImageTypes | null>(null);

  useEffect(() => {
    if (!router.isReady) return; // undefined일 경우 return

    const tab = router.query.tab;
    if (tab === 'careers' || tab === 'activities' || tab === 'all') {
      setSelected(tab);
    }
  }, [router.isReady, router.query.tab]);

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

  const onClickCardButton = (item: ExperienceDataWithImageTypes) => {
    setSelectedItem(item);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false); // 다이얼로그 닫기
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
      <SectionLayout outerClassName="sm:pt-[133px]" innerClassName="gap-8">
        <header
          className={`${montserrat.className} flex flex-col justify-between gap-4 sm:flex-row sm:items-center`}
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
                  src={item.imagePublicUrl}
                  priority={index === 0}
                >
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
                        <dt className="sr-only">재직 기간</dt>
                        <dd className={`${montserrat.className}`}>
                          {`${formatDate(item.start_date, 'dot')} ~ ${formatDate(item.end_date, 'dot')}`}
                        </dd>
                      </div>
                    </dl>
                  </div>
                  <Button
                    variants="secondary"
                    size="sm"
                    onClick={() => onClickCardButton(item)}
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
            {selectedItem && (
              <Dialog isOpen={isDialogOpen} onClose={handleCloseDialog}>
                <header className="bg-primary p-8">
                  <h3
                    id="dialog-title"
                    className="pb-1 text-lg font-semibold text-white"
                  >
                    {selectedItem.company_name}
                  </h3>
                  <dl className="space-y-1 text-sm text-white">
                    <div>
                      <dt className="sr-only">소속, 직급</dt>
                      <dd
                        className={clsx(
                          selectedItem.position
                            ? 'flex items-center gap-2'
                            : '',
                        )}
                      >
                        {selectedItem.position ? (
                          <>
                            <span>{selectedItem.department}</span>
                            <hr className="border-disabled-text h-3 w-0 border" />
                            <span>{selectedItem.position}</span>
                          </>
                        ) : (
                          <span>{selectedItem.department}</span>
                        )}
                      </dd>
                    </div>
                    <div>
                      <dt className="sr-only">재직 기간</dt>
                      <dd className={`${montserrat.className}`}>
                        {`${formatDate(selectedItem.start_date, 'dot')} ~ ${formatDate(selectedItem.end_date, 'dot')}`}
                      </dd>
                    </div>
                  </dl>
                </header>
                <div
                  id="dialog-description"
                  className="grid h-full gap-12 overflow-auto p-8 text-sm sm:grid-cols-2"
                >
                  <dl className="space-y-4">
                    <div>
                      <dt>
                        <h4
                          className={`${montserrat.className} text-text-secondary mb-2 font-medium`}
                        >
                          Description
                        </h4>
                      </dt>
                      <dd>{selectedItem.description}</dd>
                    </div>
                    <div>
                      <dt>
                        <h4
                          className={`${montserrat.className} text-text-secondary font-medium`}
                        >
                          Role
                        </h4>
                      </dt>
                      <dd>
                        <ul>
                          {selectedItem.major_task.map((item, index) => (
                            <li
                              key={index}
                              className="before:bg-text-secondary relative pl-2 before:absolute before:top-1/2 before:left-0 before:h-[3px] before:w-[3px] before:-translate-y-1/2 before:rounded-md before:content-['']"
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                      </dd>
                    </div>
                    <div>
                      <dt>
                        <h4
                          className={`${montserrat.className} text-text-secondary mb-2 font-medium`}
                        >
                          Achievements
                        </h4>
                      </dt>
                      <dd>
                        <ul>
                          {selectedItem.achievements.map((item, index) => (
                            <li
                              key={index}
                              className="before:bg-text-secondary relative pl-2 before:absolute before:top-1/2 before:left-0 before:h-[3px] before:w-[3px] before:-translate-y-1/2 before:rounded-md before:content-['']"
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                      </dd>
                    </div>
                    <div>
                      <dt>
                        <h4
                          className={`${montserrat.className} text-text-secondary mb-2 font-medium`}
                        >
                          Location
                        </h4>
                      </dt>
                      <dd>{selectedItem.location}</dd>
                    </div>
                  </dl>
                  <dl>
                    <dt>
                      <h4
                        className={`${montserrat.className} text-text-secondary mb-2 font-medium`}
                      >
                        Tech Stack
                      </h4>
                    </dt>
                    <dd className="flex flex-wrap gap-2">
                      {selectedItem.tech_stack.map((item, index) => (
                        <Chip
                          key={index}
                          id={item}
                          icon={true}
                          className={`${montserrat.className} bg-section text-sm`}
                        />
                      ))}
                    </dd>
                  </dl>
                </div>
                <div className="flex items-center justify-end gap-4 p-8">
                  <Button variants="secondary" onClick={handleCloseDialog}>
                    닫기
                  </Button>
                </div>
              </Dialog>
            )}
          </AnimatePresence>
        </section>
      </SectionLayout>
    </>
  );
}
