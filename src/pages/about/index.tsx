import { GetServerSideProps } from 'next';
import React from 'react';

import Introduce from '@/components/about/introduce';
import Profile from '@/components/about/profile';
import TechStack from '@/components/about/tech-stack';
import { supabase } from '@/lib/supabase';
import { ExperienceDataTypes } from '@/types/experience-data-type';
import { EducationDataTypes } from '@/types/education-data-types';
import { CertificatesDataTypes } from '@/types/certificates-data-types';
import { TrainingDataTypes } from '@/types/training-data-types';
import { StackDataTypes } from '@/types/stacks-data-types';

export const getServerSideProps: GetServerSideProps = async () => {
  const { data: experienceData, error: experienceError } = await supabase
    .from('experience')
    .select('id, type, company_name, department, start_date, end_date')
    .order('start_date', { ascending: false });

  const { data: educationData, error: educationError } = await supabase
    .from('education')
    .select('id, school_name, major, start_date, end_date, note')
    .order('start_date', { ascending: false });

  const { data: certificatesData, error: certificatesError } = await supabase
    .from('certificates')
    .select('id, title, organization, issued_date')
    .order('issued_date', { ascending: false });

  const { data: trainingData, error: trainingError } = await supabase
    .from('training')
    .select('id, title, organization, start_date, end_date')
    .order('start_date', { ascending: false });

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

  if (experienceError) {
    return {
      props: {
        experienceData: [],
        educationData: [],
        certificatesData: [],
        trainingData: [],
        stackData: [],
        error:
          experienceError?.message ||
          educationError?.message ||
          certificatesError?.message ||
          trainingError?.message ||
          stackError?.message ||
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
    },
  };
};

export default function Page({
  experienceData,
  educationData,
  certificatesData,
  trainingData,
  stackData,
}: {
  experienceData: ExperienceDataTypes[];
  educationData: EducationDataTypes[];
  certificatesData: CertificatesDataTypes[];
  trainingData: TrainingDataTypes[];
  stackData: StackDataTypes[];
}) {
  return (
    <div className="flex flex-col">
      <Introduce />
      <Profile
        experienceData={experienceData}
        educationData={educationData}
        certificatesData={certificatesData}
        trainingData={trainingData}
      />
      <TechStack data={stackData} />
    </div>
  );
}
