import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useRef } from 'react';

import SectionTitle from '@/components/section-title';
import Chip from '@/components/chip';
import Button from '@/components/button';
import Breadcrumb from '@/components/breadcrumb';
import Icon from '@/components/icon';
import ImageCard from '@/components/image-card';
import { useGsapFadeInOnScroll } from '@/hooks/useGsapFadeInOnScroll';
import { supabase } from '@/lib/supabase';
import { formatDate } from '@/lib/formatDate';

import { ProjectsDataTypes } from '@/types/projects-data-type';

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

  return {
    props: {
      project: data,
    },
  };
};

export default function ProjectDetail({
  project,
}: {
  project: ProjectsDataTypes;
}) {
  const router = useRouter();

  const sectionClassName = 'gsap-fade-in flex flex-col gap-6 text-[15px]';

  const containerRef = useRef<HTMLDivElement>(null!);
  useGsapFadeInOnScroll(containerRef);

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
      </Head>
      <div
        ref={containerRef}
        className="m-auto flex max-w-5xl flex-col gap-8 px-6 py-12"
      >
        <Breadcrumb className="gsap-fade-in" current={project.title} />
        <div className="gsap-fade-in border-primary/40 text-primary-darkest flex flex-col items-start gap-2 border-b pb-6">
          <h3 className="text-2xl font-bold">{project.title}</h3>
          <p>{project.summary}</p>
        </div>

        <section className={sectionClassName}>
          <SectionTitle title="summary" />
          <div className="flex flex-col gap-12 sm:flex-row">
            <dl className="space-y-4 sm:space-y-1">
              <div className="xs:flex-row flex flex-col items-baseline gap-2 sm:gap-4">
                <dt className="bg-primary/20 text-primary-darkest min-w-[100px] rounded-full px-3 py-1 text-center font-medium">
                  기간
                </dt>
                <dd>
                  {`${formatDate(project.start_date)} - ${formatDate(project.end_date)}`}
                </dd>
              </div>
              <div className="xs:flex-row flex flex-col items-baseline gap-2 sm:gap-4">
                <dt className="bg-primary/20 text-primary-darkest min-w-[100px] rounded-full px-3 py-1 text-center font-medium">
                  주요 업무
                </dt>
                <dd>{project.role.join(', ')}</dd>
              </div>
              <div className="xs:flex-row flex flex-col items-baseline gap-2 sm:gap-4">
                <dt className="bg-primary/20 text-primary-darkest min-w-[100px] rounded-full px-3 py-1 text-center font-medium">
                  내용
                </dt>
                <dd>
                  {project.description.map((desc, index) => (
                    <p key={index}>{desc}</p>
                  ))}
                </dd>
              </div>
            </dl>
            <ImageCard
              src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/projects/${project.image_url}.png`}
              className="aspect-video sm:w-1/3"
            />
          </div>
        </section>

        <section className={sectionClassName}>
          <SectionTitle title="tech stack" />
          <ul className="flex flex-wrap gap-1">
            {project.stack.map((s, i) => (
              <li key={i}>
                <Chip id={s} icon={true} />
              </li>
            ))}
          </ul>
        </section>

        {/* 상세 내용 */}
        <section className={sectionClassName}>
          <SectionTitle title="situation" />
          <div>
            {Array.isArray(project.situation) &&
              project.situation.map((text, i) => <p key={i}>{text}</p>)}
          </div>
        </section>
        <section className={sectionClassName}>
          <SectionTitle title="task" />
          <div>
            {Array.isArray(project.task) &&
              project.task.map((text, i) => <p key={i}>{text}</p>)}
          </div>
        </section>
        <section className={sectionClassName}>
          <SectionTitle title="action" />
          <div>
            {Array.isArray(project.action) &&
              project.action.map((obj, i) =>
                Object.entries(obj).map(([key, val]) => (
                  <div key={`${i}-${key}`} className="mb-4">
                    <h4 className="text-primary font-semibold">{key}</h4>
                    {Array.isArray(val) ? (
                      <ul className="list-disc pl-5">
                        {val.map((item, j) => (
                          <li key={j}>{item}</li>
                        ))}
                      </ul>
                    ) : (
                      <p>{val}</p>
                    )}
                  </div>
                )),
              )}
          </div>
        </section>
        <section className={sectionClassName}>
          <SectionTitle title="result" />
          <div>
            {Array.isArray(project.result) &&
              project.result.map((obj, i) =>
                Object.entries(obj).map(([key, val]) => (
                  <div key={`${i}-${key}`} className="mb-4">
                    <h4 className="text-primary font-semibold">{key}</h4>
                    {Array.isArray(val) ? (
                      <ul className="list-disc pl-5">
                        {val.map((item, j) => (
                          <li key={j}>{item}</li>
                        ))}
                      </ul>
                    ) : (
                      <p>{val}</p>
                    )}
                  </div>
                )),
              )}
          </div>
        </section>
        <Button
          variants="secondary"
          onClick={() => {
            router.back();
          }}
          className="w-fit"
        >
          <Icon id="direction-left" size={16} />
          이전 페이지로 이동
        </Button>
      </div>
    </>
  );
}
