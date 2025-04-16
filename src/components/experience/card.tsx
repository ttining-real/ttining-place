import { WorkProps, FreelancerProps } from '@/types/experience';
import Image from 'next/image';
import Link from 'next/link';
import Chips from '../chips';

interface CardProps {
  data: WorkProps[] | FreelancerProps[];
}

export default function Card({ data }: CardProps) {
  return (
    <ul className="flex flex-col gap-4">
      {data.map((item) => (
        <li key={item.id} className="rounded-3xl bg-white">
          <Link
            href="/"
            className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:gap-8"
          >
            <figure className="rounded-2xl border border-gray-50 md:w-xs">
              <Image
                src={item.imgUrl ?? '/images/example.gif'}
                width={400}
                height={300}
                alt={`${item.company} 로고`}
              />
            </figure>
            <div className="flex flex-1 flex-col text-sm">
              <div className="order-2 mb-2 flex items-center gap-2">
                <h3 className="text-lg font-semibold">{item.company}</h3>
                <span className="text-gray-10 text-sm">{item.affiliation}</span>
              </div>
              <span className="text-gray-10 order-1">{item.period}</span>
              {item.position && (
                <Chips data={item.position} chipsClassName="order-3 mt-2" />
              )}
              <div className="order-2 flex flex-col gap-1">
                {item.description.map((desc, index) => (
                  <p key={index}>{desc}</p>
                ))}
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
