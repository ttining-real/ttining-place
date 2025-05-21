import ListSection from '@/components/list-section';
import { supabase } from '@/lib/supabase';
import { CareersDataTypes } from '@/types/career-types';
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async () => {
  const { data, error } = await supabase.from('careers').select('*');

  if (error) {
    return {
      props: {
        data: [],
        error: error?.message || 'Unkown error',
      },
    };
  }

  return {
    props: { data },
  };
};

export default function Page({ data }: { data: CareersDataTypes[] }) {
  return (
    <>
      <ListSection data={data} />
    </>
  );
}
