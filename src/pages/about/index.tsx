import ActivitiesSection from '@/components/about/activities-section';
import CareerSection from '@/components/about/career-section';
import CertificatesSection from '@/components/about/certificates-section';
import EducationSection from '@/components/about/education-section';
import PersonalSection from '@/components/about/personal-section';
import TrainingSection from '@/components/about/training-section';
import { supabase } from '@/lib/supabase';
import { CareersDataTypes } from '@/types/career-types';
import { EducationDataTypes } from '@/types/education-types';
import { CertificatesDataTypes } from '@/types/certificates-types';
import { TrainingDataTypes } from '@/types/training-types';
import { ActivitiesDataTypes } from '@/types/activities-types';
import { GetServerSideProps } from 'next';
import { PersonalDataTypes } from '@/types/personal-types';

export const getServerSideProps: GetServerSideProps = async () => {
  const { data: personalData, error: personalError } = await supabase
    .from('personal')
    .select('*');
  const { data: careerData, error: careerError } = await supabase
    .from('careers')
    .select('*');
  const { data: educationData, error: educationError } = await supabase
    .from('education')
    .select('*');
  const { data: trainingData, error: trainingError } = await supabase
    .from('training')
    .select('*');
  const { data: certificatesData, error: certificatesError } = await supabase
    .from('certificates')
    .select('*');
  const { data: activitiesData, error: activitiesError } = await supabase
    .from('activities')
    .select('*');

  if (
    personalError ||
    careerError ||
    educationError ||
    certificatesError ||
    activitiesError
  ) {
    return {
      props: {
        personalData: null,
        careerData: null,
        educationData: null,
        trainingnData: null,
        certificatesData: null,
        activitiesData: null,
        error:
          personalError?.message ||
          careerError?.message ||
          educationError?.message ||
          trainingError?.message ||
          certificatesError?.message ||
          activitiesError?.message,
      },
    };
  }

  return {
    props: {
      personalData: personalData as PersonalDataTypes[],
      careerData: careerData as CareersDataTypes[],
      educationData: educationData as EducationDataTypes[],
      trainingData: trainingData as TrainingDataTypes[],
      certificatesData: certificatesData as CertificatesDataTypes[],
      activitiesData: activitiesData as ActivitiesDataTypes[],
    },
  };
};

export default function Page({
  personalData,
  careerData,
  educationData,
  trainingData,
  certificatesData,
  activitiesData,
}: {
  personalData: PersonalDataTypes[] | null;
  careerData: CareersDataTypes[] | null;
  educationData: EducationDataTypes[] | null;
  trainingData: TrainingDataTypes[] | null;
  certificatesData: CertificatesDataTypes[] | null;
  activitiesData: ActivitiesDataTypes[] | null;
}) {
  console.log(careerData);

  return (
    <>
      <PersonalSection personalData={personalData} />
      {careerData && <CareerSection careerData={careerData} />}
      {educationData && <EducationSection educationData={educationData} />}
      {certificatesData && (
        <CertificatesSection certificatesData={certificatesData} />
      )}
      {activitiesData && <ActivitiesSection activitiesData={activitiesData} />}
      {trainingData && <TrainingSection trainingData={trainingData} />}
    </>
  );
}
