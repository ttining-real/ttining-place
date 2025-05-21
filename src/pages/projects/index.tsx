import Card from '@/components/projects/card';
import { supabase } from '@/lib/supabase';
import { ProjectsDataTypes } from '@/types/projects-types';
import { GetServerSideProps } from 'next';

interface Props {
  mainProjects: ProjectsDataTypes[];
  sideProjects: ProjectsDataTypes[];
  error?: string;
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { data: mainProjects, error: mainError } = await supabase
    .from('projects')
    .select('*')
    .eq('type', 'main');

  const { data: sideProjects, error: sideError } = await supabase
    .from('projects')
    .select('*')
    .eq('type', 'side');

  if (mainError || sideError) {
    return {
      props: {
        mainProjects: [],
        sideProjects: [],
        error: mainError?.message || sideError?.message || 'Unknown error',
      },
    };
  }

  return {
    props: {
      mainProjects,
      sideProjects,
    },
  };
};

export default function Page({ mainProjects, sideProjects }: Props) {
  return (
    <>
      <div className="flex flex-col gap-12">
        <section id="main" className="flex flex-col gap-4">
          <h2 className="text-xl font-bold text-black dark:text-white">
            Main Projects
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 md:gap-6">
            <Card data={mainProjects} />
          </div>
        </section>
        <section id="main" className="flex flex-col gap-4">
          <h2 className="text-xl font-bold text-black dark:text-white">
            Side Projects
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 md:gap-6">
            <Card data={sideProjects} />
          </div>
        </section>
      </div>
    </>
  );
}
