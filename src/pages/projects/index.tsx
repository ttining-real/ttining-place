import Link from 'next/link';
import { GetServerSideProps } from 'next';
import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { projectsTabs as tabs } from '@/constants/tabs';
import Chip from '@/components/chip';
import TabSelector from '@/components/tab-selector';
import ImageWithFallback from '@/components/image-with-fallback';
import NoImageFallback from '@/components/no-image-fallback';
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
    <div className="m-auto max-w-5xl px-6 py-12">
      {/* 탭 메뉴 */}
      <TabSelector tabs={tabs} selected={selected} onChange={setSelected} />

      {/* 리스트 영역 */}
      <div className="xs:grid-cols-2 grid grid-cols-1 gap-6 md:grid-cols-3">
        <AnimatePresence>
          {filtered.map((item) => {
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="border-primary/20 flex flex-col gap-4 rounded-2xl border bg-white shadow-sm"
                style={{ boxShadow: '0px 0px 16px 0px rgba(162,132,94,0.25)' }}
              >
                <Link
                  href={`/projects/${item.slug}`}
                  className="focus-ring flex h-full flex-col gap-6 rounded-xl p-4"
                >
                  <div className="order-2">
                    <h3 className="mb-2 font-semibold">{item.title}</h3>
                    <dl className="flex flex-col gap-2 text-sm">
                      <div>
                        <dt className="sr-only">작업 기간</dt>
                        <dd>
                          {`${formatDate(item.start_date)} - ${formatDate(item.end_date)}`}
                        </dd>
                      </div>
                      <div>
                        <dt className="sr-only">요약</dt>
                        <dd>{item.summary}</dd>
                      </div>
                      <div className="mt-1">
                        <dt className="sr-only">역할</dt>
                        <dd className="flex gap-1">
                          {item.role.map((r, i) => (
                            <Chip key={i} id={r} />
                          ))}
                        </dd>
                      </div>
                    </dl>
                  </div>
                  <figure className="bg-primary/10 border-primary/20 order-1 flex aspect-video w-full shrink-0 items-center justify-center overflow-hidden rounded-xl border backdrop-blur-lg">
                    {item.image_url ? (
                      <ImageWithFallback
                        type="projects"
                        imageUrl={item.image_url}
                        title={item.title}
                      />
                    ) : (
                      <NoImageFallback />
                    )}
                  </figure>
                </Link>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
