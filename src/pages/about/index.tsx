import Head from 'next/head';
import React from 'react';
import { GetServerSideProps } from 'next';

import ResumeSection from '@/components/about/resume';
import TechStackSection from '@/components/about/tech-stack';
import TimelineSection from '@/components/about/timeline';
import { supabase } from '@/lib/supabase';

import { ExperienceDataTypes } from '@/types/experience-data-type';
import { EducationDataTypes } from '@/types/education-data-types';
import { CertificatesDataTypes } from '@/types/certificates-data-types';
import { TrainingDataTypes } from '@/types/training-data-types';
import { StackDataTypes } from '@/types/stacks-data-types';
import { TimelineDataTypes } from '@/types/timeline-data-types';

export const getServerSideProps: GetServerSideProps = async () => {
  // experience
  const { data: experienceData, error: experienceError } = await supabase
    .from('experience')
    .select(
      'id, type, company_name, department, position, start_date, end_date, major_task',
    )
    .order('start_date', { ascending: false });

  // education
  const { data: educationData, error: educationError } = await supabase
    .from('education')
    .select('id, school_name, major, start_date, end_date, note')
    .order('start_date', { ascending: false });

  // certificates
  const { data: certificatesData, error: certificatesError } = await supabase
    .from('certificates')
    .select('id, title, organization, issued_date')
    .order('issued_date', { ascending: false });

  // training
  const { data: trainingData, error: trainingError } = await supabase
    .from('training')
    .select('id, title, organization, start_date, end_date')
    .order('start_date', { ascending: false });

  // stack
  const { data: stackData, error: stackError } = await supabase.from(
    'stack_sections',
  ).select(`
    *,
    stack_items (
      *,
      stack_icons (
        *
      )
    )
  `);

  const { data: timelineData, error: timelineError } = await supabase
    .from('project_timeline')
    .select('*');

  if (experienceError) {
    return {
      props: {
        experienceData: [],
        educationData: [],
        certificatesData: [],
        trainingData: [],
        stackData: [],
        timelineData: [],
        error:
          experienceError?.message ||
          educationError?.message ||
          certificatesError?.message ||
          trainingError?.message ||
          stackError?.message ||
          timelineError?.message ||
          '🚫 알 수 없는 오류가 발생했어요!',
      },
    };
  }

  return {
    props: {
      experienceData: experienceData ?? [],
      educationData: educationData ?? [],
      certificatesData: certificatesData ?? [],
      trainingData: trainingData ?? [],
      stackData: stackData ?? [],
      timelineData: timelineData ?? [],
    },
  };
};

export default function Page({
  experienceData,
  educationData,
  certificatesData,
  trainingData,
  stackData,
  timelineData,
}: {
  experienceData: ExperienceDataTypes[];
  educationData: EducationDataTypes[];
  certificatesData: CertificatesDataTypes[];
  trainingData: TrainingDataTypes[];
  stackData: StackDataTypes[];
  timelineData: TimelineDataTypes[];
}) {
  return (
    <>
      <Head>
        <title>안지인 | 포트폴리오 - about</title>
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:title" content="안지인 | 포트폴리오 - about" />
        <meta
          property="og:description"
          content="UI 개발자 안지인의 포트폴리오입니다. 개인 이력 사항을 확인하실 수 있습니다."
        />
        <meta
          name="description"
          content="UI 개발자 안지인의 포트폴리오입니다. 개인 이력 사항을 확인하실 수 있습니다."
        />
      </Head>
      <div className="flex flex-col">
        <h2 className="sr-only">About</h2>
        <ResumeSection
          careersData={experienceData}
          educationData={educationData}
          certificatesData={certificatesData}
          trainingData={trainingData}
        />
        <TechStackSection data={stackData} />
        <TimelineSection data={timelineData} />
      </div>
    </>
  );
}
