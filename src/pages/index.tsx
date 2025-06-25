import { GetServerSideProps } from 'next';

// components
import Visual from '@/components/home/visual';
import AboutSection from '@/components/home/about';
import CircleSection from '@/components/home/circle';
import ExperienceSection from '@/components/home/experience';
import ProjectsSection from '@/components/home/projects';
import CommentsSection from '@/components/home/comments';
import { supabase } from '@/lib/supabase';

import { PersonalDataTypes } from '@/types/personal-data-types';
import { ExperienceDataTypes } from '@/types/experience-data-type';
import { ProjectsDataTypes } from '@/types/projects-data-type';

export const getServerSideProps: GetServerSideProps = async () => {
  // personal
  const { data: personalData, error: personalError } = await supabase
    .from('personal')
    .select('*');

  // experience
  const { data: experienceData, error: experienceError } = await supabase
    .from('experience')
    .select('*');

  // projects
  const { data: projectsData, error: projectsError } = await supabase
    .from('projects')
    .select('*');

  if (
    personalError ||
    experienceError ||
    projectsError ||
    !personalData ||
    !experienceData ||
    !projectsData
  ) {
    return {
      props: {
        personalData: [],
        experienceData: [],
        projectsData: [],
        error:
          personalError?.message ||
          experienceError?.message ||
          projectsError?.message ||
          '🚫 알 수 없는 오류가 발생했어요.',
      },
    };
  }

  return {
    props: {
      personalData: personalData ?? [],
      experienceData: experienceData ?? [],
      projectsData: projectsData ?? [],
    },
  };
};

export default function Home({
  personalData,
  experienceData,
  projectsData,
}: {
  personalData: PersonalDataTypes[];
  experienceData: ExperienceDataTypes[];
  projectsData: ProjectsDataTypes[];
}) {
  const circleKeywords = ['Overall', 'Design', 'Develop', 'Cooperation'];

  return (
    <>
      <Visual />
      <AboutSection introduction={personalData[0].greeting} />
      <CircleSection keywords={circleKeywords} />
      <ExperienceSection data={experienceData} />
      <ProjectsSection data={projectsData} />
      <CommentsSection />
    </>
  );
}
