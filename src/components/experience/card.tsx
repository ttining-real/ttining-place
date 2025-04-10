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
    <article className="flex flex-col overflow-hidden rounded-3xl bg-white md:flex-row md:items-center">
      <figure className="bg-gray-40 aspect-4/3 h-[300px] min-w-[400px]"></figure>
      <div className="flex flex-col gap-4 p-8">
        <dl className="flex flex-col text-base text-black">
          <dt className="order-1 text-lg font-bold md:text-2xl">{title}</dt>
          <dd className="order-0 text-sm md:text-base">{period}</dd>
          <dd className="order-2 text-sm md:text-base">{affiliation}</dd>
        </dl>
        <div className="flex flex-col text-sm font-normal text-black md:text-base">
          {description.map((desc, index) => (
            <p key={index}>{desc}</p>
          ))}
          <Chips data={position} />
        </div>
      </div>
    </article>
  );
}
