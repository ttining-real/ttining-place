import Card from '@/components/experience/card';
import PageTitle from '@/components/page-title';
import SectionTitle from '@/components/section-title';
import { supabase } from '@/lib/supabase';
import { GetServerSideProps } from 'next';

interface Experience {
  id: number;
  company: string;
  affiliation: string;
  period: string;
  position: string;
  description: string;
}

interface Props {
  experiences: Experience[];
  error?: string;
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { data, error } = await supabase.from('experience').select('*');

  console.log('📦 Supabase data:', data);
  console.log('❌ Supabase error:', error);

  if (error) {
    return {
      props: {
        experiences: [],
        error: error.message,
      },
    };
  }

  return {
    props: {
      experiences: data,
    },
  };
};

export default function Page({ experiences, error }: Props) {
  if (error) {
    return <p>🚫 데이터를 불러오는데 실패했습니다. : {error}</p>;
  }

  return (
    <>
      <PageTitle title="Experience" />
      <section>
        <header>
          <SectionTitle title="Work Experience" description="근무 경험" />
          {experiences?.map((exp) => (
            <Card
              key={exp.id}
              title={exp.company}
              affiliation={exp.affiliation}
              period={exp.period}
              position={
                Array.isArray(exp.position) ? exp.position : [exp.position]
              }
              description={
                Array.isArray(exp.description)
                  ? exp.description
                  : [exp.description]
              }
            />
          ))}
        </header>
      </section>
    </>
  );
}
