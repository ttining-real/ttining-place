import Chips from '@/components/chips';
import ListItem from '@/components/list-item';
import PageTitle from '@/components/page-title';
import SectionTitle from '@/components/section-title';
import { supabase } from '@/lib/supabase';
import { GetServerSideProps } from 'next';

interface Projects {
  id: number;
  title: string;
  period: string;
  stack: string[];
  description: string[];
  url?: string;
}

interface ProjectsProps {
  projects: Projects[];
  error?: string;
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { data, error } = await supabase.from('projects_work').select('*');

  console.log('📦 Supabase data:', data);
  console.log('❌ Supabase error:', error);

  if (error) {
    return {
      props: {
        projects: [],
        error: error.message,
      },
    };
  }

  return {
    props: {
      projects: data,
    },
  };
};

export default function Page({ projects, error }: ProjectsProps) {
  if (error) {
    return <p>데이터를 불러오는 데 실패했습니다 {error}</p>;
  }

  return (
    <>
      <PageTitle title="Projects" imgUrl="/images/projects.png" />
      <section className="m-auto flex max-w-5xl flex-col gap-6 px-6 py-12">
        <SectionTitle
          title="Work Projects"
          description="UI/UX 디자인, 퍼블리싱, 프론트엔드 개발"
        />
        {projects.map((project, index) => (
          <ListItem
            key={index}
            id={project.title}
            title={project.title}
            period={project.period}
          >
            {project.description.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            <Chips key={index} data={project.stack} />
          </ListItem>
        ))}
      </section>
    </>
  );
}
