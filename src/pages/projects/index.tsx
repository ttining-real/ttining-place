import ListItem from '@/components/list-item';
import PageTitle from '@/components/page-title';
import SectionTitle from '@/components/section-title';
import { supabase } from '@/lib/supabase';
import { Project } from '@/types/project';
import { GetServerSideProps } from 'next';

interface ProjectsProps {
  projectsWork: Project[];
  projectsOther: Project[];
  error?: string;
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { data: workData, error: workError } = await supabase
    .from('projects_work')
    .select('*');

  const { data: otherData, error: otherError } = await supabase
    .from('projects_other')
    .select('*');

  console.log('📦 work data:', workData);
  console.log('❌ work error:', workError);
  console.log('📦 other data:', otherData);
  console.log('❌ other error:', otherError);

  if (workError) {
    return {
      props: {
        projectsWork: workData || [],
        projectsOther: otherData || [],
        error: (workError?.message || '') + (otherError?.message || ''),
      },
    };
  }

  return {
    props: {
      projectsWork: workData,
      projectsOther: otherData,
    },
  };
};

export default function Page({
  projectsWork,
  projectsOther,
  error,
}: ProjectsProps) {
  if (error) {
    return <p>데이터를 불러오는 데 실패했습니다 {error}</p>;
  }

  console.log(projectsOther);

  return (
    <>
      <PageTitle title="Projects" imgUrl="/images/projects.png" />
      <section className="flex flex-col gap-6 p-6">
        <SectionTitle
          title="Work Projects"
          description="UI/UX 디자인, 퍼블리싱, 프론트엔드 개발"
        />
        <ListItem data={projectsWork} />
      </section>
      <section className="flex flex-col gap-6 p-6">
        <SectionTitle
          title="Other Projects"
          description="토이 프로젝트 및 프리랜서 프로젝트"
        />
        <ListItem data={projectsOther} />
      </section>
    </>
  );
}
