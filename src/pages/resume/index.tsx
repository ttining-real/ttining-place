import TableLayout from '@/components/resume/table-layout';
import { formatDate } from '@/lib/formatDate';
import { supabase } from '@/lib/supabase';
import { CertificatesDataTypes } from '@/types/certificates-data-types';
import { EducationDataTypes } from '@/types/education-data-types';
import { ExperienceDataTypes } from '@/types/experience-data-type';
import { TrainingDataTypes } from '@/types/training-data-types';
import { GetServerSideProps } from 'next';

type Props = {
  experienceData: ExperienceDataTypes[];
  educationData: EducationDataTypes[];
  trainingData: TrainingDataTypes[];
  certificatesData: CertificatesDataTypes[];
};

export const getServerSideProps: GetServerSideProps = async () => {
  const { data: experienceData, error: experienceError } = await supabase
    .from('experience')
    .select('*')
    .order('start_date', { ascending: false });
  const { data: educationData, error: educationError } = await supabase
    .from('education')
    .select('*')
    .order('start_date', { ascending: false });
  const { data: trainingData, error: trainingError } = await supabase
    .from('training')
    .select('*')
    .order('start_date', { ascending: false });
  const { data: certificatesData, error: certificatesError } = await supabase
    .from('certificates')
    .select('*')
    .order('issued_date', { ascending: false });

  if (experienceError || educationError || trainingError || certificatesError) {
    return {
      props: {
        experienceData: [],
        educationData: [],
        trainingData: [],
        certificatesData: [],
        error:
          experienceError?.message ||
          educationError?.message ||
          trainingError?.message ||
          certificatesError?.message,
      },
    };
  }

  return {
    props: {
      experienceData: experienceData ?? [],
      educationData: educationData ?? [],
      trainingData: trainingData ?? [],
      certificatesData: certificatesData ?? [],
    },
  };
};

export default function Page({
  experienceData,
  educationData,
  trainingData,
  certificatesData,
}: Props) {
  const careersData = experienceData.filter((item) => item.type === 'career');
  const activitiesData = experienceData.filter(
    (item) => item.type === 'activity',
  );

  return (
    <div className="m-auto flex max-w-5xl flex-col gap-6 px-6 py-12">
      <TableLayout title="경력" subtitle="6년 11개월" className="gsap-fade-in">
        {careersData?.map((data) => (
          <div
            key={data.id}
            className="border-primary-lighter gap-12 border-b py-4 sm:flex"
          >
            <h4 className="text-base font-medium text-black sm:flex-2/6">
              {data.company_name}
            </h4>
            <dl className="flex flex-col gap-1 text-sm font-light text-black sm:flex-4/6">
              <div>
                <dt className="sr-only">소속</dt>
                <dd className="flex items-center gap-2">
                  {data.department}
                  <hr className="bg-primary-lighter h-[12px] w-[1px]" />
                  {data.position}
                </dd>
              </div>
              <div>
                <dt className="sr-only">기간</dt>
                <dd>
                  {formatDate(data.start_date)} ~ {formatDate(data.end_date)}
                </dd>
              </div>
              <div>
                <dt className="sr-only">업무</dt>
                <dd>
                  <ul>
                    {data.major_task.map((task, index) => (
                      <li
                        key={index}
                        className="before:bg-primary-darker relative pl-2 before:absolute before:top-[50%] before:left-0 before:h-0.5 before:w-0.5 before:translate-y-[-50%]"
                      >
                        {task}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            </dl>
          </div>
        ))}
      </TableLayout>
      <TableLayout title="학력" className="gsap-fade-in">
        {educationData?.map((data) => (
          <div
            key={data.id}
            className="border-primary-lighter gap-12 border-b py-4 sm:flex"
          >
            <h4 className="text-base font-medium text-black sm:flex-2/6">
              {data.school_name}
            </h4>
            <dl className="flex flex-col gap-1 text-sm font-light text-black sm:flex-4/6">
              <div>
                <dt className="sr-only">전공</dt>
                <dd className="flex items-center gap-2">
                  {data.major}
                  {data.note && (
                    <>
                      <hr className="bg-primary-lighter h-[12px] w-[1px]" />
                      {data.note}
                    </>
                  )}
                </dd>
              </div>
              <div>
                <dt className="sr-only">기간</dt>
                <dd>
                  {formatDate(data.start_date)} ~ {formatDate(data.end_date)}
                </dd>
              </div>
            </dl>
          </div>
        ))}
      </TableLayout>
      <TableLayout title="자격증" className="gsap-fade-in">
        {certificatesData?.map((data) => (
          <div
            key={data.id}
            className="border-primary-lighter gap-12 border-b py-4 sm:flex"
          >
            <h4 className="text-base font-medium text-black sm:flex-2/6">
              {data.title}
            </h4>
            <dl className="flex flex-col gap-1 text-sm font-light text-black sm:flex-4/6">
              <div>
                <dt className="sr-only">기관</dt>
                <dd className="flex items-center gap-2">{data.organization}</dd>
              </div>
              <div>
                <dt className="sr-only">취득시기</dt>
                <dd>{formatDate(data.issued_date)}</dd>
              </div>
            </dl>
          </div>
        ))}
      </TableLayout>
      <TableLayout
        title="활동"
        subtitle="인턴 및 프리랜서"
        className="gsap-fade-in"
      >
        {activitiesData?.map((data) => (
          <div
            key={data.id}
            className="border-primary-lighter gap-12 border-b py-4 sm:flex"
          >
            <h4 className="text-base font-medium text-black sm:flex-2/6">
              {data.company_name}
            </h4>
            <dl className="flex flex-col gap-1 text-sm font-light text-black sm:flex-4/6">
              <div>
                <dt className="sr-only">소속</dt>
                <dd className="flex items-center gap-2">{data.department}</dd>
              </div>
              <div>
                <dt className="sr-only">기간</dt>
                <dd>
                  {formatDate(data.start_date)} ~ {formatDate(data.end_date)}
                </dd>
              </div>
              <div>
                <dt className="sr-only">업무</dt>
                <dd>
                  <ul>
                    {data.major_task.map((task, index) => (
                      <li
                        key={index}
                        className="before:bg-primary-darker relative pl-2 before:absolute before:top-[50%] before:left-0 before:h-0.5 before:w-0.5 before:translate-y-[-50%]"
                      >
                        {task}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            </dl>
          </div>
        ))}
      </TableLayout>
      <TableLayout title="교육이수" className="gsap-fade-in">
        {trainingData?.map((data) => (
          <div
            key={data.id}
            className="border-primary-lighter gap-12 border-b py-4 sm:flex"
          >
            <h4 className="text-base font-medium text-black sm:flex-2/6">
              {data.title}
            </h4>
            <dl className="flex flex-col gap-1 text-sm font-light text-black sm:flex-4/6">
              <div>
                <dt className="sr-only">기관</dt>
                <dd className="flex items-center gap-2">
                  {data.organization}
                  {data.status && (
                    <>
                      <hr className="bg-primary-lighter h-[12px] w-[1px]" />
                      {data.status}
                    </>
                  )}
                </dd>
              </div>
              <div>
                <dt className="sr-only">기간</dt>
                <dd>
                  {formatDate(data.start_date)} ~ {formatDate(data.end_date)}
                </dd>
              </div>
            </dl>
          </div>
        ))}
      </TableLayout>
    </div>
  );
}
