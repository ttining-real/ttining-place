import Head from 'next/head';
import { GetServerSideProps } from 'next';

// components
import Visual from '@/components/home/visual';
import AboutSection from '@/components/home/about';
import CircleSection from '@/components/home/circle';
import ExperienceSection from '@/components/home/experience';
import ProjectsSection from '@/components/home/projects';
import CommentsSection from '@/components/home/comments';
import { supabase } from '@/lib/supabase';

import { ExperienceDataTypes } from '@/types/experience-data-type';
import { ProjectsDataTypes } from '@/types/projects-data-type';

export const getServerSideProps: GetServerSideProps = async () => {
  // experience
  const { data: experienceData, error: experienceError } = await supabase
    .from('experience')
    .select('*');

  // projects
  const { data: projectsData, error: projectsError } = await supabase
    .from('projects')
    .select('*');

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

  return {
    props: {
      experienceData: experienceData ?? [],
      projectsData: projectsData ?? [],
    },
  };
};

export default function Home({
  experienceData,
  projectsData,
}: {
  experienceData: ExperienceDataTypes[];
  projectsData: ProjectsDataTypes[];
}) {
  const circleKeywords = ['Overall', 'Design', 'Development', 'Cooperation'];

  return (
    <>
      <Head>
        <title>Jiin의 포트폴리오</title>
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:title" content="Jiin의 포트폴리오" />
        <meta
          property="og:description"
          content="안녕하세요. UI 개발자 안지인입니다."
        />
      </Head>
      <Visual />
      <AboutSection />
      <CircleSection keywords={circleKeywords} />
      <ExperienceSection data={experienceData} />
      <ProjectsSection data={projectsData} />
      <CommentsSection />
    </>
  );
}
