import Head from 'next/head';
import { GetServerSideProps } from 'next';

// components
import HeroSection from '@/components/home/hero';
import GridMenuSection from '@/components/home/grid-menu';
// import AboutSection from '@/components/home/about';
// import ExperienceSection from '@/components/home/experience';
import ProjectsSection from '@/components/home/projects';
import CommentsSection from '@/components/home/comments';
import { supabase } from '@/lib/supabase';

import { ExperienceDataTypes } from '@/types/experience-data-type';
import { ProjectsDataTypes } from '@/types/projects-data-type';

type ProjectsDataWithImageTypes = ProjectsDataTypes & {
  imagePublicUrl: string | null;
};

export const getServerSideProps: GetServerSideProps = async () => {
  // experience
  const { data: experienceData, error: experienceError } = await supabase
    .from('experience')
    .select('*');

  // projects
  const { data: projectsData, error: projectsError } = await supabase
    .from('projects')
    .select('*')
    .in('type', ['main', 'side'])
    .in('display_order', [1, 2]);

  if (experienceError || projectsError || !experienceData || !projectsData) {
    return {
      props: {
        personalData: [],
        experienceData: [],
        projectsData: [],
        error:
          experienceError?.message ||
          projectsError?.message ||
          '🚫 알 수 없는 오류가 발생했어요.',
      },
    };
  }

  const projectsDataWithImage: ProjectsDataWithImageTypes[] = projectsData.map(
    (item) => {
      const { data: imageData } = supabase.storage
        .from('projects')
        .getPublicUrl(`${item.image_url}.png`);

      return {
        ...item,
        imagePublicUrl: imageData?.publicUrl ?? null,
      };
    },
  );

  return {
    props: {
      experienceData: experienceData ?? [],
      projectsData: projectsDataWithImage,
    },
  };
};

export default function Home({
  // experienceData,
  projectsData,
}: {
  experienceData: ExperienceDataTypes[];
  projectsData: ProjectsDataWithImageTypes[];
}) {
  return (
    <>
      <Head>
        <title>안지인 | 포트폴리오</title>
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:title" content="안지인 | 포트폴리오" />
        <meta
          property="og:description"
          content="UI 개발자 안지인의 포트폴리오입니다. 주요 프로젝트 및 경력을 확인하실 수 있습니다."
        />
        <meta
          name="description"
          content="UI 개발자 안지인의 포트폴리오입니다. 주요 프로젝트 및 경력을 확인하실 수 있습니다."
        />
      </Head>
      <HeroSection />
      <GridMenuSection />
      {/* <AboutSection /> */}
      {/* <ExperienceSection data={experienceData} /> */}
      <ProjectsSection data={projectsData} />
      <CommentsSection />
    </>
  );
}
