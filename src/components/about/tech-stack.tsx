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
        <div className="">
          {sortedData.map((section) => (
            <article
              key={section.id}
              id={section.title}
              className="border-border flex flex-col gap-6 border-t py-12 md:grid md:grid-cols-8"
            >
              <h3
                className={`${montserrat.className} col-span-2 text-2xl font-semibold`}
              >
                {section.title}
              </h3>
              <div className="col-span-6 flex flex-col gap-10">
                {section.stack_items.map((item) => (
                  <dl key={item.id} className="flex flex-col gap-2">
                    <dt
                      className={`${montserrat.className} text-lg font-medium`}
                    >
                      {item.title}
                    </dt>
                    <dd className="text-text-secondary">
                      <div className="">
                        {item.description.map((desc, idx) => (
                          <p key={idx}>{desc}</p>
                        ))}
                      </div>
                      {item.stack_icons.length > 0 && (
                        <ul className="mt-4 flex flex-wrap gap-2">
                          {item.stack_icons.map((icon) => (
                            <li key={icon.id} className="">
                              <Chip
                                id={icon.name}
                                icon={true}
                                className={`${montserrat.className} text-sm`}
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
