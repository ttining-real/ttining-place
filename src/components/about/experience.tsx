import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { montserrat } from '@/fonts/font';
import Button from '@/components/button';
import SectionLayout from '@/components/section-layout';

import { ExperienceDataTypes } from '@/types/experience-data-type';

type ExperienceSectionProps = {
  data: ExperienceDataTypes[];
};

const variants = {
  initial: (direction: number) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
  }),
  animate: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.4 },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -80 : 80,
    opacity: 0,
    transition: { duration: 0.4 },
  }),
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const formatted = `${date.getFullYear()}. ${String(date.getMonth() + 1).padStart(2, '0')}`;
  return formatted;
};

export default function ExperienceSection({ data }: ExperienceSectionProps) {
  const [page, setPage] = useState(0); // 0: careers, 1: activities
  const [direction, setDirection] = useState(1); // 전환 방향

  const handleNext = () => {
    setDirection(1);
    setPage((prev) => Math.min(prev + 1, 1));
  };

  const handlePrev = () => {
    setDirection(-1);
    setPage((prev) => Math.max(prev - 1, 0));
  };

  const careers = data.filter((item) => item.type === 'career');
  const activities = data.filter((item) => item.type === 'activity');

  const currentList = page === 0 ? careers : activities;

  return (
    <SectionLayout outerClassName="bg-section">
      <header className={`${montserrat.className}`}>
        <h3 className="mb-4 text-sm uppercase sm:mb-8 sm:text-base">
          Experience
        </h3>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center sm:gap-12">
          <AnimatePresence mode="wait">
            <motion.p
              key={page}
              className="text-2xl font-bold sm:text-3xl"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {page === 0 ? 'Careers' : 'Activities'}
            </motion.p>
          </AnimatePresence>

          {/* 버튼 */}
          <div className="flex justify-end gap-4">
            <Button
              variants="secondary"
              onClick={handlePrev}
              disabled={page === 0}
            >
              Prev
            </Button>
            <Button
              variants="secondary"
              onClick={handleNext}
              disabled={page === 1}
            >
              Next
            </Button>
          </div>
        </div>
      </header>

      {/* 전환 영역 */}
      <motion.div layout className="relative w-full">
        <AnimatePresence custom={direction} mode="wait">
          <motion.ul
            key={page}
            custom={direction}
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full"
          >
            {currentList.map((career, index) => (
              <li
                key={index}
                className="border-border flex flex-col gap-6 border-t p-2 py-4 sm:flex-row sm:gap-12 sm:p-6"
              >
                <div className="flex flex-col gap-2">
                  <h4 className="order-2 text-xl font-semibold sm:text-2xl">
                    {career.company_name}
                  </h4>
                  <p
                    className={`${montserrat.className} text-text-secondary order-1 text-sm sm:text-base`}
                  >{`${formatDate(career.start_date)} - ${formatDate(career.end_date)}`}</p>
                </div>
                <dl className="flex flex-col gap-4 sm:gap-8">
                  <div>
                    <dt
                      className={`${montserrat.className} text-text-secondary mb-2 text-sm uppercase sm:text-base`}
                    >
                      Department / Position
                    </dt>
                    <dd className="flex items-center gap-2">
                      <span>{`${career.department} 소속`}</span>
                      {career.position && (
                        <>
                          <span aria-hidden>/</span>
                          <span>{`${career.position}`}</span>
                        </>
                      )}
                    </dd>
                  </div>
                  <div>
                    <dt
                      className={`${montserrat.className} text-text-secondary mb-2 text-sm uppercase sm:text-base`}
                    >
                      Role
                    </dt>
                    <dd>
                      {career.major_task?.map((role, idx) => (
                        <p key={idx}>{role}</p>
                      ))}
                    </dd>
                  </div>
                </dl>
              </li>
            ))}
          </motion.ul>
        </AnimatePresence>
      </motion.div>
    </SectionLayout>
  );
}
