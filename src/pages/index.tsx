import { GetServerSideProps } from 'next';

import { supabase } from '@/lib/supabase';
import { CareersDataTypes } from '@/types/career-types';
import { StackDataTypes } from '@/types/tech-stack-types';

import { useThemeStore } from '@/stores/themeStore';

import IntroduceSection from '@/components/home/introduce-section';
import QuickMenu from '@/components/home/quick-menu';
import SectionLayout from '@/components/home/section-layout';
import ProjectsCard from '@/components/home/projects-card';
import ExperienceList from '@/components/home/experience-list';
import StackCard from '@/components/home/stack-card';

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
  const { theme } = useThemeStore();

  return (
    <>
      <IntroduceSection />
      <QuickMenu />
      <SectionLayout title="Projects" subtitle="프로젝트">
        <div className="flex gap-4">
          <ProjectsCard />
        </div>
      </SectionLayout>
      <SectionLayout
        full={true}
        title="Experience"
        subtitle="근무 경험"
        className="bg-cover bg-fixed bg-no-repeat"
        style={{
          backgroundImage: `url(/images/abstract_${theme === 'light' ? 'light' : 'dark'}.png)`,
        }}
      >
        <div className="flex w-full max-w-5xl gap-2 px-6 sm:gap-4">
          <ExperienceList data={careersData} />
        </div>
      </SectionLayout>
      <SectionLayout title="Tech Stack" subtitle="기술 스택">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <StackCard data={stackData} />
        </div>
      </SectionLayout>
    </>
  );
}
