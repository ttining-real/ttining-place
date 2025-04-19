import ActivitiesSection from '@/components/about/activities-section';
import CareerSection from '@/components/about/career-section';
import CertificatesSection from '@/components/about/certificates-section';
import EducationSection from '@/components/about/education-section';
import TrainingSection from '@/components/about/training-section';
import { supabase } from '@/lib/supabase';
import { ActivitiesTypes } from '@/types/activities-types';
import { CareerTypes } from '@/types/career-types';
import { CertificatesTypes } from '@/types/certificates-types';
import { EducationTypes } from '@/types/education-types';
import { TrainingTypes } from '@/types/training-types';
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async () => {
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

  if (careerError || educationError || certificatesError || activitiesError) {
    return {
      props: {
        careerData: null,
        educationData: null,
        trainingnData: null,
        certificatesData: null,
        activitiesData: null,
        error:
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
      careerData: careerData as CareerTypes[],
      educationData: educationData as EducationTypes[],
      trainingData: trainingData as TrainingTypes[],
      certificatesData: certificatesData as CertificatesTypes[],
      activitiesData: activitiesData as ActivitiesTypes[],
    },
  };
};

export default function Page({
  careerData,
  educationData,
  trainingData,
  certificatesData,
  activitiesData,
}: {
  careerData: CareerTypes[] | null;
  educationData: EducationTypes[] | null;
  trainingData: TrainingTypes[] | null;
  certificatesData: CertificatesTypes[] | null;
  activitiesData: ActivitiesTypes[] | null;
}) {
  console.log(
    careerData,
    educationData,
    trainingData,
    certificatesData,
    activitiesData,
  );

  return (
    <>
      <div className="flex max-w-5xl flex-col gap-12 py-12 sm:m-auto">
        {careerData && <CareerSection careerData={careerData} />}
        {educationData && <EducationSection educationData={educationData} />}
        {trainingData && <TrainingSection trainingData={trainingData} />}
        {certificatesData && (
          <CertificatesSection certificatesData={certificatesData} />
        )}
        {activitiesData && (
          <ActivitiesSection activitiesData={activitiesData} />
        )}
      </div>
    </>
  );
}
