import StackIcon from '@/components/stack-icon';
import { FeatureCardTypes } from '@/types/feature-types';

const colorClasses = {
  primary: 'bg-primary text-white',
  white: 'bg-white text-primary',
};

export default function FeatureCard({
  title,
  items,
  color,
  colSpan,
}: FeatureCardTypes) {
  return (
    <article
      className={`${colorClasses[color]} col-span-6 sm:col-span-${colSpan} flex h-auto flex-col justify-between rounded-3xl p-8`}
    >
      <h3 className="mb-8 text-xl font-bold">{title}</h3>
      <dl className="flex flex-col gap-4">
        {items.map((item, idx) => (
          <div key={idx}>
            <dt className="mb-1 flex items-center gap-2 font-bold">
              {item.title}
              {item.icons && (
                <ul className="mt-[-4px] flex gap-1">
                  {item.icons.map((icon) => (
                    <li key={icon}>
                      <StackIcon id={icon} size={16} />
                    </li>
                  ))}
                </ul>
              )}
            </dt>
            {Array.isArray(item.description) ? (
              item.description.map((desc, i) => (
                <dd key={i} className="text-sm font-light">
                  {desc}
                </dd>
              ))
            ) : (
              <dd className="text-sm font-light">{item.description}</dd>
            )}
          </div>
        ))}
      </dl>
    </article>
  );
}
