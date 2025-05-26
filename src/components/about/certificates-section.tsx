import { formatDate } from '@/lib/formatDate';
import { CertificatesDataTypes } from '@/types/certificates-types';
import TableLayout from './table-layout';

interface CertificatesSectionTypes {
  certificatesData: CertificatesDataTypes[];
}

export default function CertificatesSection({
  certificatesData,
}: CertificatesSectionTypes) {
  return (
    <TableLayout title="자격증">
      {certificatesData?.map((data) => (
        <div
          key={data.id}
          className="border-gray-30 gap-12 border-b py-4 sm:flex"
        >
          <h4 className="text-lg text-black sm:flex-2/6 dark:text-white">
            {data.title}
          </h4>
          <dl className="flex flex-col gap-1 font-light text-black sm:flex-4/6 dark:text-white">
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
  );
}
