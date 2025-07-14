import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import { montserrat } from '@/fonts/font';
import SectionLayout from '@/components/section-layout';
import Breadcrumb from '@/components/breadcrumb';
import Button from '@/components/button';
import Chip from '@/components/chip';
import Icon from '@/components/icon';
import ImageCard from '@/components/image-card';
import StarDetail from '@/components/projects/star-detail';
import { supabase } from '@/lib/supabase';
import { formatDate } from '@/lib/formatDate';

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
  const router = useRouter();

  const sectionClassName = 'flex flex-col gap-6 text-[15px]';

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
        <header className="px-6">
          <div className="border-border m-auto flex max-w-5xl flex-col gap-4 border-b pt-2 pb-6 sm:pt-12 md:pt-20">
            <div className="order-2">
              <h2 className="mb-2 text-2xl font-bold">{project.title}</h2>
              <p>{project.summary}</p>
            </div>
            <Breadcrumb className="order-1" current={project.title} />
          </div>
        </header>
        <SectionLayout>
          <h3 className={`${montserrat.className} text-2xl font-semibold`}>
            Summary
          </h3>
          <div className="flex flex-col gap-12 md:flex-row">
            <dl className="grow space-y-4">
              <div className="xs:flex-row flex flex-col items-baseline gap-2 sm:gap-4">
                <dt className="sr-only">기간</dt>
                <dd className="text-text-primary">
                  {`${formatDate(project.start_date)} - ${formatDate(project.end_date)}`}
                </dd>
              </div>
              <div className="xs:flex-row flex flex-col items-baseline gap-2 sm:gap-4">
                <dt className="sr-only">주요 업무</dt>
                <dd className="text-text-primary">{project.role.join(', ')}</dd>
              </div>
              <div className="xs:flex-row flex flex-col items-baseline gap-2 sm:gap-4">
                <dt className="sr-only">내용</dt>
                <dd className="text-text-primary">
                  {project.description.map((desc, index) => (
                    <p key={index}>{desc}</p>
                  ))}
                </dd>
              </div>
              {project.url && (
                <div className="xs:flex-row flex flex-col items-baseline gap-2 sm:gap-4">
                  <dt className="sr-only">{project.title} 웹사이트 바로가기</dt>
                  <dd>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary dark:text-primary-light hover:underline"
                    >
                      {project.title} 사이트 보기
                    </a>
                  </dd>
                </div>
              )}
            </dl>
            <ImageCard
              src={project.imagePublicUrl}
              className="aspect-video md:w-2/5"
              noneClassName="bg-transparent"
            />
          </div>
        </SectionLayout>
        <SectionLayout outerClassName="bg-section">
          <section className={sectionClassName}>
            <h3 className={`${montserrat.className} text-2xl font-semibold`}>
              Tech Stack
            </h3>
            <ul className="flex flex-wrap gap-2">
              {project.stack.map((s, i) => (
                <li key={i}>
                  <Chip
                    id={s}
                    icon={true}
                    className={`${montserrat.className}`}
                  />
                </li>
              ))}
            </ul>
          </section>
        </SectionLayout>
        <SectionLayout innerClassName="gap-18">
          <StarDetail
            situation={project.situation}
            task={project.task}
            action={project.action}
            result={project.action}
          />
        </SectionLayout>
        <div className="m-auto max-w-5xl px-6 pb-12 md:px-0">
          <Button
            variants="secondary"
            onClick={() => {
              if (document.referrer) {
                router.back();
              } else {
                router.push('/projects');
              }
            }}
            className="w-fit"
          >
            <Icon id="direction-left" size={16} />
            Prev Page
          </Button>
        </div>
      </>
    </>
  );
}
