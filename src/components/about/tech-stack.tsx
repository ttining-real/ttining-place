import { useRef } from 'react';

import { Agbalumo } from '@/fonts/font';
import SectionTitle from '@/components/section-title';
import StackIcon from '@/components/stack-icon';
import { useGsapFadeInOnScroll } from '@/hooks/useGsapFadeInOnScroll';
import { StackDataTypes } from '@/types/stacks-data-types';

type Props = {
  data: StackDataTypes[];
};

export default function TechStack({ data }: Props) {
  const containerRef = useRef<HTMLDivElement>(null!);

  useGsapFadeInOnScroll(containerRef);

  return (
    <section className="py-12">
      <div ref={containerRef} className="m-auto max-w-5xl px-6">
        <header className="gsap-fade-in mb-8">
          <SectionTitle title="tech stack" />
        </header>
        <div className="flex flex-col gap-6">
          {data.map((section) => (
            <article
              key={section.id}
              id={section.title}
              className="gsap-fade-in border-primary/10 rounded-2xl border bg-white p-6 shadow-sm"
              style={{
                boxShadow: '0 0 16px 0 rgba(162, 132, 94, 0.25)',
              }}
            >
              <h3
                className={`${Agbalumo.className} text-primary-darker mb-4 text-xl`}
              >
                {section.title}
              </h3>
              <div className="space-y-6">
                {section.stack_items.map((item) => (
                  <div key={item.id} className="flex flex-col gap-2">
                    <h4 className="text-primary flex items-center gap-2 text-base font-semibold">
                      {item.title}
                    </h4>
                    <ul className="space-y-1 text-sm text-gray-700">
                      {item.description.map((desc, idx) => (
                        <li key={idx}>{desc}</li>
                      ))}
                    </ul>
                    {item.stack_icons.length > 0 && (
                      <div className="flex flex-wrap gap-2 text-gray-500">
                        {item.stack_icons.map((icon) => (
                          <StackIcon key={icon.id} id={icon.name} size={18} />
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
