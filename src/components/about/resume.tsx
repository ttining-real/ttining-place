import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { montserrat } from '@/fonts/font';
import Button from '@/components/button';
import SectionLayout from '@/components/section-layout';

import { EducationDataTypes } from '@/types/education-data-types';
import { CertificatesDataTypes } from '@/types/certificates-data-types';
import { TrainingDataTypes } from '@/types/training-data-types';

type ResumeSectionProps = {
  educationData: EducationDataTypes[];
  certificatesData: CertificatesDataTypes[];
  trainingData: TrainingDataTypes[];
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

export default function ResumeSection({
  educationData,
  certificatesData,
  trainingData,
}: ResumeSectionProps) {
  const [page, setPage] = useState(0); // 0: 교육, 1: 자격증, 2: 연수
  const [direction, setDirection] = useState(1); // 전환 방향

  const handleNext = () => {
    setDirection(1);
    setPage((prev) => Math.min(prev + 1, 2));
  };

  const handlePrev = () => {
    setDirection(-1);
    setPage((prev) => Math.max(prev - 1, 0));
  };

  const titles = ['Education', 'Certificates', 'Training'];

  const contents = [
    <ul key="education">
      {educationData.map((item) => (
        <li
          key={item.id}
          className="border-border flex flex-col gap-2 border-t p-6 sm:flex-row sm:items-center sm:gap-12"
        >
          <p
            className={`${montserrat.className} text-text-secondary`}
          >{`${formatDate(item.start_date)} - ${formatDate(item.end_date)}`}</p>
          <div>
            <p>
              {item.school_name}
              {item.major && `, ${item.major}`}
              {item.note && ` (${item.note})`}
            </p>
          </div>
        </li>
      ))}
    </ul>,
    <ul key="certificates">
      {certificatesData.map((item) => (
        <li
          key={item.id}
          className="border-border flex flex-col gap-2 border-t p-6 sm:flex-row sm:items-center sm:gap-12"
        >
          <p className={`${montserrat.className} text-text-secondary`}>
            {formatDate(item.issued_date)}
          </p>
          <div>
            <p>
              {item.title}
              {item.organization && `, ${item.organization}`}
            </p>
          </div>
        </li>
      ))}
    </ul>,
    <ul key="training">
      {trainingData.map((item) => (
        <li
          key={item.id}
          className="border-border flex flex-col border-t p-6 sm:flex-row sm:items-center sm:gap-12"
        >
          <p className={`${montserrat.className} text-text-secondary`}>
            {`${formatDate(item.start_date)} - ${formatDate(item.end_date)}`}
          </p>
          <div>
            <p>
              {item.title}
              {item.organization && `, ${item.organization}`}
            </p>
          </div>
        </li>
      ))}
    </ul>,
  ];

  return (
    <SectionLayout outerClassName="bg-section">
      <header className={`${montserrat.className}`}>
        <h3 className="mb-4 text-sm uppercase sm:mb-8 sm:text-base">Resume</h3>
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
              {titles[page]}
            </motion.p>
          </AnimatePresence>

          {/* 전환 버튼 */}
          <div className="my-6 flex justify-end gap-4">
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
              disabled={page === contents.length - 1}
            >
              Next
            </Button>
          </div>
        </div>
      </header>

      {/* 애니메이션 전환 영역 */}
      <motion.div layout className="relative w-full">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={page}
            custom={direction}
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full"
          >
            {contents[page]}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </SectionLayout>
  );
}
