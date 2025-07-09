import { montserrat } from '@/fonts/font';

import SectionLayout from '@/components/section-layout';
import Chip from '@/components/chip';

import { StackDataTypes } from '@/types/stacks-data-types';

type Props = {
  data: StackDataTypes[];
};

export default function TechStack({ data }: Props) {
  const sortedData = [...data].sort(
    (a, b) => a.display_order - b.display_order,
  );

  return (
    <>
      <SectionLayout>
        <header className={`${montserrat.className}`}>
          <h3 className="mb-4 text-sm uppercase sm:mb-8 sm:text-base">
            Tech Stack
          </h3>
        </header>
        <div className="flex flex-col gap-12">
          {sortedData.map((section) => (
            <article key={section.id} id={section.title}>
              <h3
                className={`${montserrat.className} text-text-primary mb-4 text-2xl font-bold sm:text-3xl`}
              >
                {section.title}
              </h3>
              <div className="grid gap-6 sm:grid-cols-2">
                {section.stack_items.map((item) => (
                  <dl
                    key={item.id}
                    className="bg-surface flex flex-col gap-2 rounded-2xl p-6"
                  >
                    <dt
                      className={`${montserrat.className} text-text-primary mb-4 text-lg font-semibold`}
                    >
                      {item.title}
                    </dt>
                    <dd className="text-text-secondary">
                      <div className="mb-4">
                        {item.description.map((desc, idx) => (
                          <p key={idx}>{desc}</p>
                        ))}
                      </div>
                      {item.stack_icons.length > 0 && (
                        <ul className="flex flex-wrap gap-2">
                          {item.stack_icons.map((icon) => (
                            <li key={icon.id}>
                              <Chip
                                id={icon.name}
                                icon={true}
                                className={`${montserrat.className} !bg-bg text-sm`}
                              />
                            </li>
                          ))}
                        </ul>
                      )}
                    </dd>
                  </dl>
                ))}
              </div>
            </article>
          ))}
        </div>
      </SectionLayout>
    </>
  );
}
