import Error from '@/components/error';
import Card from '@/components/experience/card';
import PageTitle from '@/components/page-title';
import SectionTitle from '@/components/section-title';
import { supabase } from '@/lib/supabase';
import { WorkProps, FreelancerProps } from '@/types/experience';
import { GetServerSideProps } from 'next';

interface ExperienceProps {
  experiences: WorkProps[];
  freelancerExperiences: FreelancerProps[];
  error?: string;
}

export const getServerSideProps: GetServerSideProps = async () => {
  // work
  const { data: workData, error: workError } = await supabase
    .from('experience_work')
    .select('*');

  // freelancer
  const { data: freelancerData, error: freelancerError } = await supabase
    .from('experience_freelancer')
    .select('*');

  if (workError || freelancerError) {
    return {
      props: {
        experiences: [],
        freelancerExperiences: [],
        error: workError?.message || freelancerError?.message,
      },
    };
  }

  // storage
  const updateData = (data: any[]) =>
    data.map((item) => {
      const { data: urlData } = supabase.storage
        .from('experience-image')
        .getPublicUrl(item.img);

      console.log('imgUrl:', urlData?.publicUrl);

      return {
        ...item,
        imgUrl: urlData?.publicUrl ?? null,
      };
    });

  return {
    props: {
      experiences: updateData(workData),
      freelancerExperiences: updateData(freelancerData),
    },
  };
};

export default function Page({
  experiences,
  freelancerExperiences,
  error,
}: ExperienceProps) {
  if (error) {
    return <Error error={error} />;
  }

  return (
    <>
      <PageTitle title="Experience" imgUrl="/images/experience.png" />
      <section className="flex flex-col gap-6 p-6">
        <SectionTitle title="Work Experience" description="근무 경험" />
        <div className="grid gap-4 md:m-auto md:w-5xl">
          <Card data={experiences} />
        </div>
      </section>
      <section className="flex flex-col gap-6 p-6">
        <SectionTitle title="Other Experience" description="그 밖의 경험" />
        <div className="grid gap-4 md:m-auto md:w-5xl">
          <Card data={freelancerExperiences} />
        </div>
      </section>
    </>
  );
}
