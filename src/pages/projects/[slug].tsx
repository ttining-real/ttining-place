import Head from 'next/head';
import { GetServerSideProps } from 'next';

import SummarySection from '@/components/projects/summary';
import TechStackSection from '@/components/projects/tech-stack';
import SituationSection from '@/components/projects/situation';
import TaskSection from '@/components/projects/task';
import ActionSection from '@/components/projects/action';
import ResultSection from '@/components/projects/result';
import { supabase } from '@/lib/supabase';

import { ProjectsDataTypes } from '@/types/projects-data-type';

type ProjectsDataWithImageTypes = ProjectsDataTypes & {
  imagePublicUrl: string | null;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const slug = context.params?.slug as string;

  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .single();

  if (!data || error) {
    return { notFound: true };
  }

  const imagePath = `${data.slug}.png`;
  const { data: imageData } = supabase.storage
    .from('projects')
    .getPublicUrl(imagePath);

  // 파일의 존재 여부 확인
  const { data: existsCheck, error: downloadError } = await supabase.storage
    .from('projects')
    .download(imagePath);

  const imageExists = !!existsCheck && !downloadError;

  return {
    props: {
      project: {
        ...data,
        imagePublicUrl: imageExists ? imageData.publicUrl : null,
      },
    },
  };
};

export default function ProjectDetail({
  project,
}: {
  project: ProjectsDataWithImageTypes;
}) {
  return (
    <>
      <Head>
        <title>{project.title}</title>
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${project.type}//${project.slug}.png`}
        />
        <meta property="og:title" content={project.title} />
        <meta property="og:description" content={project.summary} />
        <meta name="description" content={project.summary} />
      </Head>
      <>
        <SummarySection
          title={project.title}
          summary={project.summary}
          role={project.role}
          start_date={project.start_date}
          end_date={project.end_date}
          description={project.description}
          url={project.url}
          imagePublicUrl={project.imagePublicUrl}
        />
        <TechStackSection data={project.stack} />
        <SituationSection data={project.situation} />
        <TaskSection data={project.task} />
        <ActionSection data={project.action} />
        <ResultSection data={project.result} />
      </>
    </>
  );
}
