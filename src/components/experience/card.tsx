import Chips from '../chips';

type CardProps = {
  title: string;
  period: string;
  affiliation: string;
  position: string[];
  description: string[];
};

export default function Card({
  title,
  affiliation,
  period,
  position,
  description,
}: CardProps) {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-gray-50 bg-white text-black md:flex-row md:items-center">
      <figure className="bg-gray-10 aspect-2/1 w-full md:aspect-4/3 md:h-full md:max-w-sm"></figure>
      <div className="p-6">
        <dl className="flex flex-col">
          <dt className="order-1 text-base font-semibold md:text-lg">
            {title}
          </dt>
          <dd className="order-0 text-sm md:text-base">{period}</dd>
          <dd className="order-2 text-sm md:text-base">{affiliation}</dd>
        </dl>
        <div className="py-3">
          {description.map((desc, index) => (
            <p key={index} className="text-sm md:text-base">
              {desc}
            </p>
          ))}
        </div>
        <Chips data={position} />
      </div>
    </article>
  );
}
