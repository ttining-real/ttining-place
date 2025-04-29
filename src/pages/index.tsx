import IntroduceSection from '@/components/home/introduce-section';
import GridMenuSection from '@/components/home/grid-menu-section';
import TechStackSection from '@/components/home/tech-stack-section';
import ExperienceSection from '@/components/home/experience-section';

import { GetServerSideProps } from 'next';
import { CareersDataTypes } from '@/types/career-types';
import { supabase } from '@/lib/supabase';
import { StackDataTypes } from '@/types/tech-stack-types';

export const getServerSideProps: GetServerSideProps = async () => {
  const { data: careersData, error: careersError } = await supabase
    .from('careers')
    .select('*');

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

  if (careersError || stackError || !careersData || !stackData) {
    return {
      props: {
        careersData: [],
        stackData: [],
        error: careersError?.message || stackError?.message || 'Unknown error',
      },
    };
  }

  const updatedCareersData: CareersDataTypes[] = careersData.map((item) => {
    const { data: urlData } = supabase.storage
      .from('careers')
      .getPublicUrl(item.image_url);

    return {
      ...item,
      image_url: urlData?.publicUrl ?? '',
    };
  });

  return {
    props: { careersData: updatedCareersData, stackData: stackData ?? [] },
  };
};

export default function Home({
  careersData,
  stackData,
}: {
  careersData: CareersDataTypes[];
  stackData: StackDataTypes[];
}) {
  return (
    <>
      <IntroduceSection />
      <GridMenuSection />
      <ExperienceSection data={careersData} />
      <TechStackSection data={stackData} />
    </>
  );
}
