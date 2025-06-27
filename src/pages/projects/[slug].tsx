import { GetServerSideProps } from 'next';

import SectionTitle from '@/components/section-title';
import { supabase } from '@/lib/supabase';
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
  return (
    <div className="m-auto max-w-5xl px-6 py-12">
      <h3>{project.title}</h3>

      {/* 상세 내용 */}
      <section>
        <SectionTitle title="situation" />
        <div>
          {Array.isArray(project.situation) &&
            project.situation.map((text, i) => <p key={i}>{text}</p>)}
        </div>
      </section>
      <section>
        <SectionTitle title="task" />
        <div>
          {Array.isArray(project.task) &&
            project.task.map((text, i) => <p key={i}>{text}</p>)}
        </div>
      </section>
      <section>
        <SectionTitle title="action" />
        <div>
          {Array.isArray(project.action) &&
            project.action.map((obj, i) =>
              Object.entries(obj).map(([key, val]) => (
                <div key={`${i}-${key}`} className="mb-4">
                  <h4 className="font-semibold">{key}</h4>
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
      <section>
        <SectionTitle title="result" />
        <div>
          {Array.isArray(project.result) &&
            project.result.map((obj, i) =>
              Object.entries(obj).map(([key, val]) => (
                <div key={`${i}-${key}`} className="mb-4">
                  <h4 className="font-semibold">{key}</h4>
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
    </div>
  );
}
