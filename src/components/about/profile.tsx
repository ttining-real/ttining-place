import { useRef } from 'react';

import { Agbalumo } from '@/fonts/font';
import SectionTitle from '@/components/section-title';
import Carousel from '@/components/carousel';
import { useGsapFadeInOnScroll } from '@/hooks/useGsapFadeInOnScroll';

import { ExperienceDataTypes } from '@/types/experience-data-type';
import { EducationDataTypes } from '@/types/education-data-types';
import { CertificatesDataTypes } from '@/types/certificates-data-types';
import { TrainingDataTypes } from '@/types/training-data-types';

type Props = {
  experienceData: ExperienceDataTypes[];
  educationData: EducationDataTypes[];
  certificatesData: CertificatesDataTypes[];
  trainingData: TrainingDataTypes[];
};

export default function Profile({
  experienceData,
  educationData,
  certificatesData,
  trainingData,
}: Props) {
  const careers = experienceData.filter((item) => item.type === 'career');
  const activities = experienceData.filter((item) => item.type === 'activity');

  const containerRef = useRef<HTMLDivElement>(null!);

  useGsapFadeInOnScroll(containerRef);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const formatted = `${date.getFullYear()}. ${String(date.getMonth() + 1).padStart(2, '0')}`;
    return formatted;
  };

  return (
    <section className="bg-primary/20 py-12">
      <div
        ref={containerRef}
        className="m-auto flex max-w-5xl flex-col gap-8 px-6"
      >
        <header className="gsap-fade-in">
          <SectionTitle title="profile" />
        </header>

        <Carousel className="gsap-fade-in">
          {/* Careers */}
          <article className="flex flex-col gap-2">
            <h3
              className={`${Agbalumo.className} text-primary-darker mb-2 text-[20px]`}
            >
              careers
            </h3>
            {careers.map((item) => (
              <dl key={item.id} className="text-sm">
                <div>
                  <dt className="sr-only">재직 기간</dt>
                  <dd className="text-primary font-medium">
                    {`${formatDate(item.start_date)} - ${item.end_date ? formatDate(item.end_date) : '보류'}`}
                  </dd>
                </div>
                <div>
                  <dt className="sr-only">회사명, 소속</dt>
                  <dd>
                    {item.company_name}
                    {item.department && `, ${item.department}`}
                  </dd>
                </div>
              </dl>
            ))}
          </article>

          {/* Activities */}
          <article className="flex flex-col gap-2">
            <h3
              className={`${Agbalumo.className} text-primary-darker mb-2 text-[20px]`}
            >
              activities
            </h3>
            {activities.map((item) => (
              <dl key={item.id} className="text-sm">
                <div>
                  <dt className="sr-only">활동 기간</dt>
                  <dd className="text-primary font-medium">
                    {`${formatDate(item.start_date)} - ${item.end_date ? formatDate(item.end_date) : '보류'}`}
                  </dd>
                </div>
                <div>
                  <dt className="sr-only">기관명, 소속</dt>
                  <dd>
                    {item.company_name}
                    {item.department && `, ${item.department}`}
                  </dd>
                </div>
              </dl>
            ))}
          </article>

          {/* Education */}
          <article className="flex flex-col gap-2">
            <h3
              className={`${Agbalumo.className} text-primary-darker mb-2 text-[20px]`}
            >
              education
            </h3>
            {educationData.map((item) => (
              <dl key={item.id} className="text-sm">
                <div>
                  <dt className="sr-only">재학 기간</dt>
                  <dd className="text-primary font-medium">
                    {`${formatDate(item.start_date)} - ${formatDate(item.end_date)}`}
                    {item.note && <span className="pl-2">({item.note})</span>}
                  </dd>
                </div>
                <div>
                  <dt className="sr-only">학교명, 전공</dt>
                  <dd>
                    {item.school_name}
                    {item.major && `, ${item.major}`}
                  </dd>
                </div>
              </dl>
            ))}
          </article>

          {/* Certificates */}
          <article className="flex flex-col gap-2">
            <h3
              className={`${Agbalumo.className} text-primary-darker mb-2 text-[20px]`}
            >
              certificates
            </h3>
            {certificatesData.map((item) => (
              <dl key={item.id} className="text-sm">
                <div>
                  <dt className="sr-only">취득 시기</dt>
                  <dd className="text-primary font-medium">
                    {formatDate(item.issued_date)}
                  </dd>
                </div>
                <div>
                  <dt className="sr-only">자격증명, 발급 기관</dt>
                  <dd>
                    {item.title}
                    {item.organization && `, ${item.organization}`}
                  </dd>
                </div>
              </dl>
            ))}
          </article>

          {/* Training */}
          <article className="flex flex-col gap-2">
            <h3
              className={`${Agbalumo.className} text-primary-darker mb-2 text-[20px]`}
            >
              training
            </h3>
            {trainingData.map((item) => (
              <dl key={item.id} className="text-sm">
                <div>
                  <dt className="sr-only">교육 기간</dt>
                  <dd className="text-primary font-medium">
                    {`${formatDate(item.start_date)} - ${item.end_date ? formatDate(item.end_date) : '보류'}`}
                  </dd>
                </div>
                <div>
                  <dt className="sr-only">교육명, 교육 기관</dt>
                  <dd>
                    {item.title}
                    {item.organization && `, ${item.organization}`}
                  </dd>
                </div>
              </dl>
            ))}
          </article>
        </Carousel>
      </div>
    </section>
  );
}
