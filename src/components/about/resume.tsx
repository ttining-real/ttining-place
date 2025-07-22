import { montserrat } from '@/fonts/font';
import { contact } from '@/constants/personal';

import SectionLayout from '@/components/section-layout';
import IconImg from '@/components/icon-image';
import StackIcon from '@/components/stack-icon';

import { ExperienceDataTypes } from '@/types/experience-data-type';
import { EducationDataTypes } from '@/types/education-data-types';
import { CertificatesDataTypes } from '@/types/certificates-data-types';
import { TrainingDataTypes } from '@/types/training-data-types';

type ResumeSectionProps = {
  careersData: ExperienceDataTypes[];
  educationData: EducationDataTypes[];
  certificatesData: CertificatesDataTypes[];
  trainingData: TrainingDataTypes[];
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const formatted = `${date.getFullYear()}. ${String(date.getMonth() + 1).padStart(2, '0')}`;
  return formatted;
};

export default function ResumeSection({
  careersData,
  educationData,
  certificatesData,
  trainingData,
}: ResumeSectionProps) {
  const careers = careersData.filter((item) => item.type === 'career');
  const activities = careersData.filter((item) => item.type === 'activity');

  return (
    <SectionLayout>
      <h3 className={`${montserrat.className} text-[32px] font-bold uppercase`}>
        Resume
      </h3>
      <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-3">
        <div className="flex flex-col items-start gap-12 sm:col-span-3 sm:flex-row sm:items-center sm:justify-between md:col-span-1 md:flex-col md:items-start">
          <article className={`${montserrat.className}`}>
            <h4 className="sr-only">담당 업무</h4>
            <ul>
              <li>UI, UX Design</li>
              <li>Web, App Publishing</li>
              <li>Front-end Development</li>
            </ul>
          </article>
          <article className="bg-section flex w-full shrink-0 flex-col gap-2 rounded-3xl p-6 sm:w-fit">
            <h4 className={`${montserrat.className} text-base font-semibold`}>
              Contact
            </h4>
            {contact.map((item, index) => (
              <dl key={index} className="flex items-center gap-4">
                <dt className="text-text-secondary w-6">
                  <IconImg id={item.src} alt={item.alt} size={20} aria-hidden />
                  <span className="sr-only">{item.label}</span>
                </dt>
                <dd className="flex items-center gap-2">
                  {item.site ? (
                    <>
                      {item.site.map((siteItem, siteIndex) => (
                        <>
                          <a
                            href={siteItem.href}
                            className="hover:text-primary flex items-center gap-2 hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={siteItem.ariaLabel}
                          >
                            <StackIcon id={siteItem.icon} size={16} />
                            {siteItem.label}
                          </a>
                          {siteIndex < item.site.length - 1 && (
                            <hr className="border-border h-3 border" />
                          )}
                        </>
                      ))}
                    </>
                  ) : (
                    <p>{item.href}</p>
                  )}
                </dd>
              </dl>
            ))}
          </article>
        </div>
        <div className="flex grow flex-col gap-12">
          <article className="space-y-4">
            <h4 className={`${montserrat.className} text-base font-semibold`}>
              Careers
            </h4>
            {careers.map((career, index) => (
              <div key={index} className="flex flex-col text-sm">
                <div className="order-2 flex items-center gap-1">
                  <h5 className="font-semibold">{career.company_name}</h5>
                  <dl>
                    <dt className="sr-only">소속, 직급</dt>
                    <dd>
                      {career.department} {career.position}
                    </dd>
                  </dl>
                </div>
                <dl className="order-3">
                  <dt className="sr-only">담당 업무</dt>
                  <dd>
                    <ul>
                      {career.major_task.map((task, index) => (
                        <li
                          key={index}
                          className="before:bg-text-secondary relative pl-1.5 before:absolute before:top-2 before:left-0 before:h-0.5 before:w-0.5 before:rounded-md before:content-['']"
                        >
                          {task}
                        </li>
                      ))}
                    </ul>
                  </dd>
                </dl>
                <dl
                  className={`${montserrat.className} text-text-secondary order-1`}
                >
                  <dt className="sr-only">재직 기간</dt>
                  <dd>{`${formatDate(career.start_date)} ~ ${formatDate(career.end_date)}`}</dd>
                </dl>
              </div>
            ))}
          </article>
          <article className="space-y-4">
            <h4 className={`${montserrat.className} text-base font-semibold`}>
              Intern & Freelancer
            </h4>
            {activities.map((career, index) => (
              <div key={index} className="flex flex-col text-sm">
                <div className="order-2 flex items-center gap-1">
                  <h5 className="font-semibold">{career.company_name}</h5>
                  <dl>
                    <dt className="sr-only">소속, 직급</dt>
                    <dd>
                      {career.position ? career.position : career.department}
                    </dd>
                  </dl>
                </div>
                <dl className="order-3">
                  <dt className="sr-only">담당 업무</dt>
                  <dd>
                    <ul>
                      {career.major_task.map((task, index) => (
                        <li
                          key={index}
                          className="before:bg-text-secondary relative pl-1.5 before:absolute before:top-2 before:left-0 before:h-0.5 before:w-0.5 before:rounded-md before:content-['']"
                        >
                          {task}
                        </li>
                      ))}
                    </ul>
                  </dd>
                </dl>
                <dl
                  className={`${montserrat.className} text-text-secondary order-1`}
                >
                  <dt className="sr-only">재직 기간</dt>
                  <dd>{`${formatDate(career.start_date)} ~ ${formatDate(career.end_date)}`}</dd>
                </dl>
              </div>
            ))}
          </article>
        </div>
        <div className="flex grow flex-col gap-12">
          <article className="space-y-4">
            <h4 className={`${montserrat.className} text-base font-semibold`}>
              Education
            </h4>
            {educationData.map((edu, index) => (
              <div key={index} className="flex flex-col text-sm">
                <div className="order-2 flex flex-wrap items-center">
                  <h5>{`${edu.school_name}${edu.major && ', '}`}</h5>
                  <dl>
                    <dt className="sr-only">전공, 비고</dt>
                    <dd>
                      {edu.major}
                      {edu.note && ` (${edu.note})`}
                    </dd>
                  </dl>
                </div>
                <dl
                  className={`${montserrat.className} text-text-secondary order-1`}
                >
                  <dt className="sr-only">재학 기간</dt>
                  <dd>{`${formatDate(edu.start_date)} ~ ${formatDate(edu.end_date)}`}</dd>
                </dl>
              </div>
            ))}
          </article>
          <article className="space-y-4">
            <h4 className={`${montserrat.className} text-base font-semibold`}>
              Certificates
            </h4>
            {certificatesData.map((cert, index) => (
              <div key={index} className="flex flex-col text-sm">
                <div className="order-2 flex flex-wrap items-center">
                  <h5>{`${cert.title}${cert.organization && ', '}`}</h5>
                  <dl>
                    <dt className="sr-only">발급 기관</dt>
                    <dd>{cert.organization}</dd>
                  </dl>
                </div>
                <dl
                  className={`${montserrat.className} text-text-secondary order-1`}
                >
                  <dt className="sr-only">취득 시기</dt>
                  <dd>{formatDate(cert.issued_date)}</dd>
                </dl>
              </div>
            ))}
          </article>
          <article className="space-y-4">
            <h4 className={`${montserrat.className} text-base font-semibold`}>
              Training
            </h4>
            {trainingData.map((training, index) => (
              <div key={index} className="flex flex-col text-sm">
                <div className="order-2 flex items-center">
                  <h5>{training.title}</h5>
                </div>
                <dl className="text-text-secondary order-1 flex flex-wrap items-center gap-x-2">
                  <div className={`${montserrat.className}`}>
                    <dt className="sr-only">취득 시기</dt>
                    <dd>{`${formatDate(training.start_date)} - ${formatDate(training.end_date)}`}</dd>
                  </div>
                  <hr className="border-border h-3 border" />
                  <div>
                    <dt className="sr-only">발급 기관</dt>
                    <dd>{training.organization}</dd>
                  </div>
                </dl>
              </div>
            ))}
          </article>
        </div>
      </div>
    </SectionLayout>
  );
}
