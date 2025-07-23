import Head from 'next/head';
import Image from 'next/image';
import { GetServerSideProps } from 'next';

import SectionLayout from '@/components/section-layout';
import Breadcrumb from '@/components/breadcrumb';
import SituationSection from '@/components/projects/situation';
import TaskSection from '@/components/projects/task';
import ActionSection from '@/components/projects/action';
import ResultSection from '@/components/projects/result';
import { supabase } from '@/lib/supabase';
import { formatDate } from '@/lib/formatDate';

import { ProjectsDataTypes } from '@/types/projects-data-type';
import TechStackSection from '@/components/projects/tech-stack';

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

  const { data: imageData } = supabase.storage
    .from('projects')
    .getPublicUrl(`${data.image_url}.png`);

  return {
    props: {
      project: {
        ...data,
        imagePublicUrl: imageData?.publicUrl ?? null,
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
          content={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${project.type}//${project.image_url}.png`}
        />
        <meta property="og:title" content={project.title} />
        <meta property="og:description" content={project.summary} />
        <meta name="description" content={project.summary} />
      </Head>
      <>
        <SectionLayout outerClassName="relative before:absolute before:top-0 before:left-0 before:right-0 before:-z-10 before:h-[60%] before:bg-primary before:content-[''] pt-[88px] sm:pt-[136px] pb-8">
          <div className="m-auto flex w-full max-w-7xl flex-col gap-8">
            <h2 className="order-2 text-[32px] font-semibold text-white">
              {project.title}
            </h2>
            <Breadcrumb className="order-1" current={project.title} />
          </div>
          <h3 className="sr-only">Summary</h3>
          <div className="grid grid-cols-1 gap-y-8 md:grid-cols-3 md:gap-6">
            <div className="col-span-2 grow space-y-2">
              <div className="xs:flex-row flex flex-col items-baseline gap-2 sm:gap-4">
                <h4 className="min-w-[80px] text-sm font-medium text-white/60">
                  요약
                </h4>
                <p className="text-sm text-white">{project.summary}</p>
              </div>
              <div className="xs:flex-row flex flex-col items-baseline gap-2 sm:gap-4">
                <h4 className="min-w-[80px] text-sm font-medium text-white/60">
                  클라이언트
                </h4>
                <p className="text-sm text-white">다누시스</p>
              </div>
              <div className="xs:flex-row flex flex-col items-baseline gap-2 sm:gap-4">
                <h4 className="min-w-[80px] text-sm font-medium text-white/60">
                  담당
                </h4>
                <p className="text-sm text-white">{project.role.join(', ')}</p>
              </div>
              <div className="xs:flex-row flex flex-col items-baseline gap-2 sm:gap-4">
                <h4 className="min-w-[80px] text-sm font-medium text-white/60">
                  기여도
                </h4>
                <p className="text-sm text-white">70%</p>
              </div>
              <div className="xs:flex-row flex flex-col items-baseline gap-2 sm:gap-4">
                <h4 className="min-w-[80px] text-sm font-medium text-white/60">
                  기간
                </h4>
                <p className="text-sm text-white">
                  {`${formatDate(project.start_date, 'kor')} - ${formatDate(project.end_date, 'kor')}`}
                </p>
              </div>
              <div className="xs:flex-row flex flex-col items-baseline gap-2 sm:gap-4">
                <h4 className="min-w-[80px] text-sm font-medium text-white/60">
                  설명
                </h4>
                <div className="text-text-primary">
                  {project.description.map((desc, index) => (
                    <p className="text-sm text-white" key={index}>
                      {desc}
                    </p>
                  ))}
                </div>
              </div>
              {project.url && (
                <div className="xs:flex-row flex flex-col items-baseline gap-2 sm:gap-4">
                  <h4 className="sr-only">{project.title} 웹사이트 바로가기</h4>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary dark:text-primary-light hover:underline"
                  >
                    {project.title} 사이트 보기
                  </a>
                </div>
              )}
            </div>
            <figure>
              <Image
                src={project.imagePublicUrl!}
                alt=""
                width={200}
                height={300}
                className="aspect-4/3 w-full object-cover"
              />
            </figure>
          </div>
          {/* 아래 둥근 배경 */}
          <Image
            src="/images/background-rounded.svg"
            width={100}
            height={100}
            alt=""
            className="absolute top-1/2 right-0 left-0 -z-10 w-full object-cover"
          />
        </SectionLayout>
        <TechStackSection data={project.stack} />
        <SituationSection data={project.situation} />
        <TaskSection data={project.task} />
        <ActionSection data={project.action} />
        <ResultSection data={project.result} />
      </>
    </>
  );
}
