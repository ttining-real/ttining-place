import { montserrat } from '@/fonts/font';

import SectionLayout from '@/components/section-layout';
import Chip from '@/components/chip';

import { StackDataTypes } from '@/types/stacks-data-types';

type Props = {
  data: StackDataTypes[];
};

export default function TechStackSection({ data }: Props) {
  const sortedData = [...data].sort(
    (a, b) => a.display_order - b.display_order,
  );

  return (
    <>
      <SectionLayout>
        <h3
          className={`${montserrat.className} text-[32px] font-bold uppercase`}
        >
          Tech Stack
        </h3>
        <div className="">
          {sortedData.map((section) => (
            <article
              key={section.id}
              id={section.title}
              className="border-border flex flex-col gap-6 border-t py-12 md:grid md:grid-cols-8"
            >
              <h4 className={`${montserrat.className} text-base font-semibold`}>
                {section.title}
              </h4>
              <div className="col-span-6 flex flex-col gap-6">
                {section.stack_items.map((item) => (
                  <div key={item.title}>
                    <h5
                      className={`${montserrat.className} mb-2 text-sm font-medium`}
                    >
                      {item.title}
                    </h5>
                    <div className="text-text-secondary text-sm">
                      {item.description.map((desc, idx) => (
                        <p key={idx}>{desc}</p>
                      ))}
                      {item.stack_icons.length > 0 && (
                        <ul className="mt-4 flex flex-wrap gap-2">
                          {item.stack_icons.map((icon) => (
                            <li key={icon.id}>
                              <Chip
                                id={icon.name}
                                icon={true}
                                className={`${montserrat.className} bg-section text-sm`}
                              />
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </SectionLayout>
    </>
  );
}
