import StackIcon from '@/components/icon/stack-icon';
import { supabase } from '@/lib/supabase';
import { StackSectionTypes } from '@/types/tech-stack-types';
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async () => {
  const { data: stack_sections, error } = await supabase.from('stack_sections')
    .select(`
      *,
      stack_items (
        *,
        stack_icons (
          *
        )
      )
    `);

  if (error) {
    return {
      props: {
        stack_sections: [],
        error: error?.message || 'Unkown error',
      },
    };
  }

  return {
    props: { stack_sections },
  };
};

export default function Page({
  stack_sections,
}: {
  stack_sections: StackSectionTypes[];
}) {
  console.log(stack_sections);

  return (
    <div>
      {stack_sections.map((section) => (
        <section
          key={section.id}
          id={section.title}
          className="border-gray-30 flex flex-col gap-6 border-t py-12 md:flex-row"
        >
          <h3 className="text-primary mb-4 text-xl font-bold md:flex-2/6 dark:text-indigo-400">
            {section.title}
          </h3>
          <dl className="flex flex-col gap-8 md:flex-4/6">
            {section.stack_items.map((stack) => (
              <div key={stack.id} className="flex flex-col gap-2">
                <dt className="flex flex-wrap items-center gap-3">
                  <span className="text-primary before:bg-primary/10 relative px-2 before:absolute before:bottom-1 before:left-0 before:h-2 before:w-full dark:text-indigo-400 dark:before:bg-indigo-400/20">
                    {stack.title}
                  </span>
                  {stack.stack_icons && (
                    <ul className="flex gap-1.5">
                      {stack.stack_icons.map((icon) => (
                        <li key={icon.id}>
                          <StackIcon id={icon.name} size={18} />
                        </li>
                      ))}
                    </ul>
                  )}
                </dt>
                {stack.description.map((desc, index) => (
                  <dd
                    key={index}
                    className="text-sm font-light text-black dark:text-white"
                  >
                    {desc}
                  </dd>
                ))}
              </div>
            ))}
          </dl>
        </section>
      ))}
    </div>
  );
}
