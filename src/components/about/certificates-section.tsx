import { formatDate } from '@/lib/formatDate';
import { CertificatesDataTypes } from '@/types/certificates-types';

interface CertificatesSectionTypes {
  certificatesData: CertificatesDataTypes[];
}

export default function CertificatesSection({
  certificatesData,
}: CertificatesSectionTypes) {
  return (
    <section className="flex max-w-5xl flex-col gap-4 px-6 py-4 sm:m-auto">
      <h3 className="border-gray-10 flex items-center gap-2 border-b-[1px] py-2 text-lg font-bold sm:text-2xl">
        자격증
      </h3>
      {certificatesData.map((item) => (
        <div
          key={item.id}
          className="border-gray-30 flex flex-col gap-1 border-b-[1px] pb-4 sm:grid sm:grid-cols-6"
        >
          <h4 className="order-2 text-base font-bold sm:col-span-4">
            {item.title}
          </h4>
          <dl className="order-1 text-[13px] sm:col-span-2 sm:row-span-2">
            <dt className="sr-only">취득 시기</dt>
            <div className="flex gap-2 sm:flex-col sm:gap-0">
              <dd>{formatDate(item.issued_date)}</dd>
            </div>
          </dl>
          <dl className="order-3 flex items-center gap-1 text-[13px] sm:col-span-4 sm:col-start-3">
            <dt className="sr-only">기관</dt>
            <dd className="flex items-center gap-2">{item.organization}</dd>
          </dl>
        </div>
      ))}
    </section>
  );
}
