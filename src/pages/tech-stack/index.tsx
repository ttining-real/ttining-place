import StackIcon from '@/components/icon/stack-icon';
import PageTitle from '@/components/page-title';
import { supabase } from '@/lib/supabase';
import { GetServerSideProps } from 'next';

type StackIconTypes = {
  id: string;
  item_id: string;
  name: string;
};

type StackItemTypes = {
  id: string;
  title: string;
  description: string[];
  created_at: string;
  section_id: string;
  stack_icons: StackIconTypes[];
};

type StackSectionTypes = {
  id: string;
  title: string;
  created_at: string;
  stack_items: StackItemTypes[];
};

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
    <>
      <PageTitle />
      {stack_sections.map((section) => (
        <section
          key={section.id}
          className="border-gray-30 flex flex-col gap-6 border-t py-12 md:flex-row"
        >
          <h3 className="mb-4 text-xl font-bold text-black md:flex-2/6 dark:text-white">
            {section.title}
          </h3>
          <dl className="flex flex-col gap-6 text-sm text-black sm:text-[14px] md:flex-4/6 dark:text-white">
            {section.stack_items.map((stack) => (
              <div key={stack.id} className="flex flex-col gap-1">
                <dt className="font-bold">{stack.title}</dt>
                {stack.description.map((desc, index) => (
                  <dd key={index}>{desc}</dd>
                ))}
              </div>
            ))}
          </dl>
        </section>
      ))}
    </>
  );
}
