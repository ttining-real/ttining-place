import CareerSection from '@/components/about/career-section';
import EducationSection from '@/components/about/education-section';
import { supabase } from '@/lib/supabase';
import { CareerTypes } from '@/types/careerTypes';
import { EducationTypes } from '@/types/educationTypes';
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async () => {
  const { data: careerData, error: careerError } = await supabase
    .from('careers')
    .select('*');
  const { data: educationData, error: educationError } = await supabase
    .from('education')
    .select('*');

  if (careerError || educationError) {
    return {
      props: {
        careerData: null,
        educationData: null,
        error: careerError?.message || educationError?.message,
      },
    };
  }

  return {
    props: {
      careerData: careerData as CareerTypes[],
      educationData: educationData as EducationTypes[],
    },
  };
};

export default function Page({
  careerData,
  educationData,
}: {
  careerData: CareerTypes[] | null;
  educationData: EducationTypes[] | null;
}) {
  console.log(careerData, educationData);

  return (
    <>
      {careerData && <CareerSection careerData={careerData} />}
      {educationData && <EducationSection educationData={educationData} />}
    </>
  );
}
